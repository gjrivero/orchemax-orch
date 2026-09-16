#!/usr/bin/env node
/**
 * check-spa.mjs — hace ejecutable la doctrina de SPA_DEV_PATTERNS.md §0.
 *
 * Verifica, sobre una app viva, que la navegacion sea realmente SPA:
 *   1. Una sola navegacion real del documento, recorra las pantallas que recorra.
 *   2. CLS = 0.00 durante cada swap (no "bajo": cero).
 *   3. Cero errores de consola tras recorrer todo el nav 3 veces.
 *   4. Ningun timer sobreviviente al salir de una pantalla.
 *   5. La 3a visita a una pantalla se ve igual que la 1a (caza listeners y nodos duplicados).
 *   6. Sin overflow horizontal (scrollWidth > clientWidth), que overflow-x:hidden esconde.
 *
 * Tres pasadas y no dos: el bug de let/const redeclarado y el de listeners
 * duplicados aparecen en la TERCERA navegacion.
 *
 * Uso:
 *   node core/tools/check-spa.mjs http://localhost:8080/app/
 *   node core/tools/check-spa.mjs http://localhost:8080/app/ --token <jwt>
 *   node core/tools/check-spa.mjs http://localhost:8080/app/ --nav "#app-sidebar a[hx-get]"
 *   node core/tools/check-spa.mjs http://localhost:8080/app/ --mobile
 *
 * Requiere Playwright. Sale con 1 si algo falla, 2 si no pudo medir.
 * Un check que no puede medir NO reporta verde.
 */

import { chromium, devices } from 'playwright';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
const flag = (name, def = null) => {
  const i = args.indexOf('--' + name);
  return i === -1 ? def : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true);
};

/* LAS CREDENCIALES TAMBIEN POR ENTORNO, Y NO ES COMODIDAD.
   ─────────────────────────────────────────────────────────────────────────
   `--token` y `--cookie` ponen un JWT o una cookie de sesion en la LINEA DE
   COMANDOS, y ahi la ve cualquier `ps` de la maquina y la guarda el historial
   del shell. Es la misma razon por la que el script de niveles vendibles de
   este taller toma su DSN por variable y no por argumento.

   Y desbloquea una medicion que no se podia hacer: la unica aplicacion
   entregable del taller tiene 2FA en el login, asi que su sesion se obtiene
   fuera y se pasa hecha. Con el token solo en argv, pasarla significaba
   escribirla en un sitio que la deja anotada.

   El argumento gana si se dan los dos: quien lo escribe a mano esta diciendo
   que quiere ese, y una variable heredada del entorno que lo pisara en
   silencio seria peor que no tenerla. */
const desdeEntorno = (name, valor) =>
  valor !== null && valor !== undefined ? valor
    : (process.env['CHECK_SPA_' + name.toUpperCase()] || null);

if (!url) {
  console.error('uso: node check-spa.mjs <url> [--token <jwt>] [--cookie <n=v[;n=v]>] [--storage <k=v[;k=v]>] [--nav <selector>] [--mobile] [--passes N]');
  console.error('     las tres credenciales tambien por entorno, que no las ve `ps`:');
  console.error('     CHECK_SPA_TOKEN, CHECK_SPA_COOKIE, CHECK_SPA_STORAGE');
  process.exit(2);
}

const NAV_SELECTOR = flag('nav', '#app-sidebar a[hx-get], nav a[hx-get], [data-spa-nav] a');
const TOKEN = desdeEntorno('token', flag('token'));
// SESION POR COOKIE, no solo por bearer.
//
// `--token` escribe `localStorage.auth_token`, que es el modelo bearer. Un
// producto que migro a cookie `HttpOnly` no puede usarlo: el navegador nunca
// mandara nada y el shell rebota al login. El sintoma es el peor posible ---
// "No se encontro ningun link de nav"--- que se lee como un selector mal
// puesto y manda a buscar donde no es.
//
// Medido el 2026-08-27: tres productos del taller ya estan en cookie, o sea que
// el verificador de la doctrina SPA no servia justo para los que siguieron la
// doctrina de auth mas nueva.
const COOKIE = desdeEntorno('cookie', flag('cookie'));
// Y la MARCA de sesion del lado cliente, que es la otra mitad y sorprende.
//
// Una cookie `HttpOnly` no la puede leer JavaScript, asi que un shell no tiene
// forma de saber si hay sesion sin preguntarle al servidor. La solucion normal
// --- y la correcta--- es guardar una marca que no es credencial (`auth_state`,
// `logged_in`, un booleano) y decidir con ella si pinta o si manda al login.
//
// Consecuencia para este verificador: `--cookie` SOLO no basta. El shell
// redirige al login antes de pintar el nav, y el sintoma vuelve a ser "no se
// encontro ningun link de nav", que no dice nada de lo que pasa.
//
// `--token` no cubre esto: escribe la clave `auth_token`, que es del modelo
// bearer. Aqui el nombre de la clave lo pone el producto.
const STORAGE = desdeEntorno('storage', flag('storage'));
const PASSES = Number(flag('passes', 3));
const MOBILE = args.includes('--mobile');
const BUDGET_MS = Number(flag('budget', 400));

const problems = [];
const fail = (m) => { problems.push(m); console.log('  ✗ ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

// Se inyecta antes de cualquier script de la pagina: cuenta layout shifts y
// timers vivos sin que la app se entere.
const INSTRUMENT = `
(() => {
  /* TRES FASES, NO DOS, y la que faltaba se cobraba en la cuenta equivocada.
     El indicador de swap solo cubre de beforeSwap a afterSettle, asi que TODO
     desplazamiento posterior --- que es exactamente cuando aterrizan los datos
     que la pantalla pidio --- caia en el saco de la carga inicial.

     Medido en buildsigned el 2026-08-28: 0.3873 de carga inicial sobre una app
     cuya portada no desplaza NADA. Eran 18 pantallas hidratando despues de su
     settle, sumadas. El numero era correcto y el nombre mandaba a optimizar el
     primer pintado del shell, que no tenia ningun problema.

     huboSwap separa lo que de verdad es la carga del documento de lo que es
     hidratacion. Las dos siguen fallando --- SPA_DEV_PATTERNS §11 pide reservar el
     hueco con min-height ---, pero cada una con su nombre, que es lo unico que
     hace un fallo accionable.

     Y este comentario vive DENTRO de un template literal: nada de acentos
     graves aqui, que cierran la cadena y rompen el archivo entero. */
  window.__spa = { shifts: [], swapping: false, huboSwap: false, errors: [], settles: 0 };
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__spa.shifts.push({
          v: e.value,
          swap: window.__spa.swapping,
          fase: window.__spa.swapping ? 'swap'
              : (window.__spa.huboSwap ? 'hidratacion' : 'carga'),
        });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}

  const _si = window.setInterval, _ci = window.clearInterval;
  window.__spa.timers = new Set();
  window.setInterval = function (...a) { const id = _si.apply(this, a); window.__spa.timers.add(id); return id; };
  window.clearInterval = function (id) { window.__spa.timers.delete(id); return _ci.call(this, id); };

  document.addEventListener('htmx:beforeSwap', () => {
    window.__spa.swapping = true; window.__spa.huboSwap = true;
  }, true);
  /* EL CRONOMETRO VIVE DENTRO DE LA PAGINA, y esa es la unica forma de que mida
     el swap y no al que lo observa. Fuera, entre t0 y dt, caben cuatro ida y
     vueltas de CDP mas un waitForTimeout(160) deliberado: contra un presupuesto
     de 400ms el instrumento se gasta medio antes de que la app haga nada.

     Medido en buildsigned el 2026-08-28: el gate reportaba 445ms sobre un swap
     que por dentro son 13ms de red y 182 de pintado. 52 de 54 swaps salian
     "sobre el presupuesto" y ninguno lo estaba. */
  document.addEventListener('htmx:beforeRequest', () => { window.__spa.t0 = performance.now(); }, true);
  document.addEventListener('htmx:afterSettle', () => {
    window.__spa.swapping = false;
    /* CONTADOR DE ATERRIZAJES, y no es lo mismo que la bandera. Ver la espera
       de mas abajo: una bandera que YA vale falso no sirve para esperar a que
       LLEGUE a falso. Un contador que sube si.
       (Sin acentos graves: esto vive dentro de un template literal.) */
    window.__spa.settles++;
    if (window.__spa.t0) {
      window.__spa.ultimoSwapMs = Math.round(performance.now() - window.__spa.t0);
      window.__spa.t0 = 0;
    }
  }, true);
})();
`;

const browser = await chromium.launch();
const context = await browser.newContext(MOBILE ? devices['Pixel 7'] : {});
const page = await context.newPage();

await page.addInitScript(INSTRUMENT);

const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
/* CON SU STACK, que es lo unico que dice DE DONDE sale.

   Esto guardaba solo `e.message`, y para la familia de errores mas comun de un
   shell SPA --- `Identifier 'X' has already been declared`, que §3 documenta y
   aparece en la TERCERA navegacion --- el mensaje no nombra ni el archivo ni la
   linea. Medido el 2026-08-29: con solo el mensaje, tres intentos de reproducir
   a mano no dieron con el script culpable, porque el error solo sale por el
   camino de clic real.

   La primera linea del stack que NO es la propia excepcion es la que sirve. */
page.on('pageerror', (e) => {
  const linea = String(e.stack || '').split('\n').slice(1)
    .map((l) => l.trim()).filter(Boolean)[0];
  consoleErrors.push('pageerror: ' + e.message + (linea ? `  ← ${linea}` : ''));
});

if (COOKIE && COOKIE !== true) {
  const { hostname } = new URL(url);
  await context.addCookies(COOKIE.split(';').map((pair) => {
    const i = pair.indexOf('=');
    return {
      name: pair.slice(0, i).trim(),
      value: pair.slice(i + 1).trim(),
      domain: hostname,
      path: '/'
    };
  }));
}

if (STORAGE && STORAGE !== true) {
  await context.addInitScript((pairs) => {
    try {
      pairs.split(';').forEach((pair) => {
        const i = pair.indexOf('=');
        localStorage.setItem(pair.slice(0, i).trim(), pair.slice(i + 1).trim());
      });
    } catch (e) { /* modo privado */ }
  }, STORAGE);
}

if (TOKEN && TOKEN !== true) {
  await context.addInitScript((t) => {
    try { localStorage.setItem('auth_token', t); } catch (e) {}
  }, TOKEN);
}

console.log(`\ncheck-spa — ${url}${MOBILE ? ' (mobile)' : ''}\n`);

try {
  await page.goto(url, { waitUntil: 'networkidle' });
} catch (e) {
  console.error('No se pudo cargar la URL: ' + e.message);
  console.error('No se pudo medir. Esto NO es verde.');
  await browser.close();
  process.exit(2);
}

// ── 0. El shell revelo el body ────────────────────────────────────────────────
const bodyVisible = await page.evaluate(() =>
  getComputedStyle(document.body).visibility === 'visible');
bodyVisible
  ? ok('el body es visible: el guard anti-FOUC se levanto')
  : fail('el body sigue oculto: el guard anti-FOUC no se levanto (SPA_DEV_PATTERNS §2.1)');

/* ── 1. Descubrir el nav ───────────────────────────────────────────────────────
   UN DESTINO NO SIEMPRE TIENE UN ATRIBUTO QUE LO NOMBRE.

   Esto identificaba cada destino por su `hx-get` o su `href`, y por eso no
   podia medir una nav movida por JAVASCRIPT --- un boton con `onclick` que
   llama al router del producto no tiene ninguno de los dos, asi que el
   `filter(Boolean)` los tiraba TODOS y el verificador salia por
   "No se encontro ningun link de nav", que se lee como un selector mal escrito.

   Medido el 2026-08-29 sobre un producto del taller: el selector encontraba 19
   elementos y la lista de destinos quedaba en cero. Un verificador que no
   puede medir una familia entera de navegaciones deja los umbrales de §0 sin
   comprobar justo donde mas falta hacen, porque una nav por JS es la que puede
   recargar el documento sin que se vea en el markup.

   El arreglo es no exigir un atributo: cuando no lo hay, el destino ES el
   elemento, y se vuelve a resolver por POSICION en cada clic --- fresco, que
   es lo correcto cuando el DOM se repinta entre swaps. El atributo se sigue
   prefiriendo donde exista, porque deduplica destinos repetidos y da un nombre
   legible en los mensajes. */
/* LOGIN Y LOGOUT ESTAN EXENTOS DE LA REGLA, Y ESTE VERIFICADOR NO LO SABIA.

   `SPA_DEV_PATTERNS` §0 lo dice al definir el defecto: es un defecto un
   `window.location.href` "FUERA del flujo de login/logout". O sea que salir de
   la sesion SI es una navegacion real del documento, a proposito --- hay que
   tirar el shell entero, y un swap no lo hace.

   El recorrido tomaba el enlace de salir como un destino mas, y de ahi salian
   DOS rojos encadenados que no son del producto: "afterSettle nunca disparo"
   en `/login` --- correcto, no hubo swap --- y despues una cascada de 401
   porque el resto del recorrido sigue clicando ya sin sesion. Medido en un
   producto del taller: 29 errores de consola, todos posteriores a ese clic.

   Un verificador que marca en rojo la unica excepcion que su propia doctrina
   declara es peor que no tenerlo: enseña a leer su rojo como ruido, y entonces
   el rojo de verdad tampoco se ve. */
const SALIDA = /(^|\/)(login|logout|signin|signout|sign-in|sign-out)(\b|\/|\.|\?|$)/i;

const destinos = await page.$$eval(NAV_SELECTOR, (els, salidaSrc) => {
  const salida = new RegExp(salidaSrc, 'i');
  const vistos = new Set();
  const out = [];
  els.forEach((e, i) => {
    const attr = e.getAttribute('hx-get') || e.getAttribute('href') || null;
    if (attr && salida.test(attr)) return;   // ver el comentario de arriba
    if (attr) {
      if (vistos.has(attr)) return;
      vistos.add(attr);
      out.push({ attr, indice: i, nombre: attr });
    } else {
      out.push({ attr: null, indice: i, nombre: (e.textContent || '').trim().slice(0, 40) || `#${i}` });
    }
  });
  return out;
}, SALIDA.source);

if (!destinos.length) {
  console.error(`\nNo se encontro ningun link de nav con: ${NAV_SELECTOR}`);
  console.error('Pasa el selector correcto con --nav. No se pudo medir: esto NO es verde.');
  await browser.close();
  process.exit(2);
}
const links = destinos;   // el resto del recorrido habla de `links`

/* LINEA BASE DE TIMERS, tomada ANTES del primer clic.

   §5 no pide cero timers: pide cero timers "de los que ELLA creo" al salir de
   una pantalla. Un shell SPA legitimamente deja vivos los suyos --- un reloj,
   el refresco de un badge --- creados una sola vez con su guard y que deben
   sobrevivir a cada swap, porque el shell no se desmonta.

   Contarlos todos convertia eso en un rojo, y el arreglo que sugiere es el
   equivocado: cancelar el reloj del shell en cada navegacion lo rompe. Medido
   el 2026-08-29 sobre un producto del taller: sus dos "fugas" eran un reloj y
   un badge, los dos singletons con guard.

   Lo que si es una fuga es un timer que nace DESPUES de esta foto y sigue vivo
   al final del recorrido: ese lo creo una pantalla y nadie lo cancelo. */
const timersBase = await page.evaluate(() => [...window.__spa.timers]);
await page.evaluate((base) => { window.__spa.timersBase = new Set(base); }, timersBase);
ok(`${destinos.length} destinos de nav descubiertos` +
   (destinos.some((d) => !d.attr) ? ' (algunos por JS, sin hx-get ni href)' : ''));

// ── 2. Recorrer N pasadas ─────────────────────────────────────────────────────
const snapshots = new Map();
const slow = [];
let overflow = [];

for (let pass = 1; pass <= PASSES; pass++) {
  for (const destino of links) {
    const href = destino.nombre;   // lo que se nombra en los mensajes
    // Con atributo se busca por atributo; sin el, por posicion y RECIEN
    // consultado, porque el DOM se repinta entre swaps.
    const el = destino.attr
      ? await page.$(`${NAV_SELECTOR.split(',')[0].trim()}[hx-get="${destino.attr}"], a[href="${destino.attr}"]`)
      : (await page.$$(NAV_SELECTOR))[destino.indice] || null;
    if (!el) continue;
    /* La seccion ACTIVA no se puede clicar, y eso es correcto: un patron muy
       extendido le pone `pointer-events: none` a `[aria-current="page"]` para
       que nadie navegue a la pagina en la que ya esta.

       Sin este salto, playwright reintenta el clic hasta agotar el timeout y
       tira una excepcion cuyo texto --- "<div class=topbar-ctl> intercepts
       pointer events"--- se lee como un defecto de z-index del producto. Lo
       midio matchitfy el 2026-08-27: el primer destino de la lista era el
       activo, asi que el verificador no llegaba a medir NADA y el error
       apuntaba al sitio equivocado.

       Se salta en vez de forzar `{force: true}`: forzarlo mediria un clic que
       un usuario no puede dar. */
    /* Y un elemento OCULTO tampoco es un destino, por la misma razon que el
       inerte: nadie lo puede pulsar. Un selector amplio --- y el de una nav por
       JS lo es, porque casa por `onclick` --- recoge de paso los duplicados del
       menu movil o de un panel plegado. Sin este salto playwright reintenta
       hasta agotar el timeout y el proceso MUERE con un TimeoutError crudo, que
       es peor que un rojo: no dice que fallo, dice que el verificador se cayo. */
    const inerte = await el.evaluate((node) => {
      const s = getComputedStyle(node);
      const r = node.getBoundingClientRect();
      return node.getAttribute('aria-current') === 'page' ||
             s.pointerEvents === 'none' ||
             s.visibility === 'hidden' || s.display === 'none' ||
             r.width === 0 || r.height === 0;
    });
    if (inerte) continue;
    /* SE ESPERA UN ATERRIZAJE NUEVO, NO UNA BANDERA EN `false`.
       ─────────────────────────────────────────────────────────────────────
       Aqui habia una carrera de comprobar-y-actuar, y de las caras: la version
       anterior esperaba a `window.__spa.swapping === false`, pero `swapping`
       solo se pone a `true` en `htmx:beforeSwap`, que ocurre cuando la
       RESPUESTA ya volvio. Entre el clic y ese momento hay una ida y vuelta de
       red entera, y durante toda ella la bandera vale `false` --- la dejo asi
       el `afterSettle` del swap ANTERIOR.

       O sea que la espera se cumplia al instante, sin haber esperado nada, y
       los 160 ms de despues no alcanzan para una peticion. La foto salia de la
       pantalla VIEJA.

       Y el modo de falla es el peor que puede tener un verificador: no da
       error, da un veredicto. Comparando la pasada 1 con la 3 lo que se
       comparaba era "que habia en pantalla en dos instantes cualquiera", asi
       que segun el orden del recorrido salia verde o rojo sin que el producto
       cambiara. Medido el 2026-08-29 sobre scalebatch: en la pasada 3 de
       `/board` el DOM fotografiado era todavia el de `/app`, con
       `class="spa-loading"` puesta.

       Un contador que SUBE no tiene este problema: se lee antes del clic y se
       espera a que sea mayor. No depende de en que estado estuviera nada. */
    const settlesAntes = await page.evaluate(() => window.__spa.settles);
    // Un clic que no se puede dar se REPORTA, no tumba la corrida: un
    // TimeoutError crudo deja al lector sin saber si fallo el producto o la
    // herramienta.
    try {
      await el.click({ timeout: 4000 });
    } catch (e) {
      fail(`no se pudo pulsar ${href} (pasada ${pass}): ${String(e.message).split('\n')[0]}`);
      continue;
    }
    try {
      await page.waitForFunction(
        (n) => window.__spa && window.__spa.settles > n && window.__spa.swapping === false,
        settlesAntes, { timeout: 5000 });
      await page.waitForTimeout(160);   // dejar cerrar el fade-in
    } catch (e) {
      fail(`swap sin terminar en ${href} (pasada ${pass}): afterSettle nunca disparo`);
      continue;
    }
    /* Se pregunta a la pagina, no al reloj de aqui. `t0` sigue declarado por
       si alguna vez hace falta el tiempo de extremo a extremo, pero el
       presupuesto de §0 es sobre el swap. */
    const dt = await page.evaluate(() => window.__spa.ultimoSwapMs || 0);
    if (dt > BUDGET_MS) slow.push(`${href} ${dt}ms (pasada ${pass})`);

    const ov = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (ov > 1) overflow.push(`${href} +${ov}px`);

    /* SE ESPERA A QUE LA PANTALLA SE ASIENTE ANTES DE FOTOGRAFIARLA. Sin esto
       la pasada 1 se captura a media carga --- la lista todavia pidiendo sus
       datos --- y la 3 con la respuesta ya en cache: dos imagenes distintas y
       CERO defectos detras. */
    await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});

    const shot = await page.locator('#main-content, #page-content').first()
      .screenshot({ timeout: 5000 }).catch(() => null);
    if (shot) {
      const key = href;
      if (pass === 1) snapshots.set(key, shot);
      else if (pass === PASSES && snapshots.has(key)) {
        if (!snapshots.get(key).equals(shot)) {
          /* EL MENSAJE DECIA UNA CAUSA QUE ESTA COMPARACION NO MIDE. Comparar
             dos PNG byte a byte detecta que los pixeles cambiaron; de ahi a
             «nodos o listeners duplicados» hay un salto que el instrumento no
             da --- una hora relativa, un foco, un spinner o una carga asincrona
             a destiempo producen la misma diferencia sin un solo defecto.

             Medido en buildsigned el 2026-08-28: el gate marcaba `/app/cot-list`
             con ese texto, y contando el DOM en las tres visitas salieron 78
             nodos, 1 fila y 1 input EN LAS TRES. No habia nada duplicado.

             Un fallo que nombra una causa falsa cuesta mas que uno mudo: manda
             a buscar listeners que no existen, y cuando el que busca no
             encuentra nada aprende a no creerle al gate. Ahora dice lo que vio
             y sugiere como confirmarlo. */
          fail(`la pasada ${PASSES} de ${href} se ve distinta a la 1a. ` +
               `Compara el DOM entre visitas antes de concluir: pixeles distintos ` +
               `tambien los produce una carga asincrona, una hora relativa o un foco`);
        }
      }
    }
  }
}
ok(`${PASSES} pasadas completas sobre ${links.length} destinos`);

// ── 3. Los umbrales ───────────────────────────────────────────────────────────
const navCount = await page.evaluate(() => performance.getEntriesByType('navigation').length);
navCount === 1
  ? ok(`1 sola navegacion real del documento tras ${links.length * PASSES} clicks`)
  : fail(`${navCount} navegaciones reales del documento: hay links que recargan la pagina (SPA_DEV_PATTERNS §0)`);

const shifts = await page.evaluate(() => window.__spa.shifts);
const swapCLS = shifts.filter((s) => s.swap).reduce((a, s) => a + s.v, 0);
const loadCLS = shifts.filter((s) => s.fase === 'carga').reduce((a, s) => a + s.v, 0);
const hydrCLS = shifts.filter((s) => s.fase === 'hidratacion').reduce((a, s) => a + s.v, 0);
/* `=== 0` SOBRE UNA SUMA DE FLOTANTES, y el mensaje resultante se contradice a
   si mismo: medido en buildsigned el 2026-08-28, el gate imprimia

     ✗ CLS durante los swaps = 0.0000, el umbral es 0.00

   o sea un FALLO cuyo texto se lee como un aprobado. La suma acumula el ruido
   de decenas de desplazamientos diminutos --- ordenes de 1e-9 --- que no son
   cero en coma flotante y son cero para cualquier ojo.

   La doctrina sigue pidiendo CERO y aqui no se afloja: 1e-6 esta seis ordenes
   de magnitud por debajo del umbral de percepcion, asi que lo que pasa por esta
   rendija no es un desplazamiento, es aritmetica. Y cuando de verdad falla, el
   mensaje imprime bastantes cifras para que nunca vuelva a leerse como un cero. */
const RUIDO_CLS = 1e-6;
swapCLS < RUIDO_CLS
  ? ok('CLS durante los swaps = 0.00')
  : fail(`CLS durante los swaps = ${swapCLS.toPrecision(3)}, el umbral es 0 (SPA_DEV_PATTERNS §0)`);
loadCLS <= 0.1
  ? ok(`CLS de carga inicial = ${loadCLS.toFixed(4)}`)
  : fail(`CLS de carga inicial = ${loadCLS.toFixed(4)}, el umbral es 0.1`);
/* La hidratacion es la fase que antes se contaba como carga. Mismo umbral, otro
   sitio donde mirar: aqui el arreglo es reservar el hueco --- `min-height` en el
   contenedor que se rellena por fetch, `width`/`height` en la imagen ---, no
   tocar el primer pintado del shell. */
hydrCLS <= 0.1
  ? ok(`CLS de hidratacion = ${hydrCLS.toFixed(4)}`)
  : fail(`CLS de hidratacion = ${hydrCLS.toFixed(4)}, el umbral es 0.1. `
       + `Son los datos que llegan DESPUES del settle: reserva el hueco (SPA_DEV_PATTERNS §11)`);

/* Solo los que NACIERON durante el recorrido. Ver la linea base, arriba: §5
   pide cero timers "de los que ella creo" al salir de una pantalla, no cero
   timers --- un shell legitimamente conserva su reloj y su badge. */
const timers = await page.evaluate(() => {
  const base = window.__spa.timersBase || new Set();
  return [...window.__spa.timers].filter((id) => !base.has(id)).length;
});
const timersShell = await page.evaluate(() => (window.__spa.timersBase || new Set()).size);
timers === 0
  ? ok(`sin timers de pantalla vivos al final` +
       (timersShell ? ` (${timersShell} del shell, que sobreviven a proposito)` : ''))
  : fail(`${timers} setInterval nacidos en el recorrido siguen vivos: falta cleanup (SPA_DEV_PATTERNS §5)`);

consoleErrors.length === 0
  ? ok('cero errores de consola')
  : fail(`${consoleErrors.length} errores de consola. Primero: ${consoleErrors[0].slice(0, 160)}`);

overflow.length === 0
  ? ok('sin overflow horizontal')
  : fail(`overflow horizontal en: ${overflow.slice(0, 3).join(', ')} (SPA_DEV_PATTERNS §6)`);

slow.length === 0
  ? ok(`todos los swaps bajo ${BUDGET_MS}ms`)
  : fail(`${slow.length} swaps sobre el presupuesto: ${slow.slice(0, 3).join(', ')}`);

await browser.close();

console.log('');
if (problems.length) {
  console.log(`FALLO — ${problems.length} defecto(s) de arquitectura SPA.`);
  process.exit(1);
}
console.log('OK — la navegacion cumple SPA_DEV_PATTERNS.md §0.');
process.exit(0);

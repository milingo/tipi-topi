# Tipi-Topi

Plataformas 2D con Phaser 3. Los personajes salen de los dibujos de `sketches/`.

## Jugar
```
npm start        # http://localhost:8000   (no hace falta npm install)
```
Alternativa sin Node: `python -m http.server 8000` en esta carpeta.

Controles: ← → / A D mover · ↑ / W saltar (doble salto en el aire) · ESPACIO (o X, Z, J, Shift) atacar · M sonido · F pantalla completa · R reiniciar.
También hay botones en pantalla (ratón o táctil). Parámetro `?debug` muestra las cajas de colisión; `?at=3500` empieza en esa X del nivel; `?level=2` (en la selección de personaje) empieza en el nivel 2; `?boss` te pone en la arena del jefe; `?canvas` usa render por canvas (útil para pruebas automáticas).

## Personajes
- **Tipi-Topi**: golpea con el ojo (embestida).
- **Abuelo**: más lento, pega con el bastón (largo alcance, gira desde el cuerpo).
- **Bebé**: pequeño y rápido, muerde; en el aire, ESPACIO = pedo cohete (nube verde que hace daño y te impulsa). Si le hacen daño, también se tira un pedo.

## Niveles
1. El prado loco – jefe: Planta Loca.
2. La lava loca – pirañas de lava (saltan de los agujeros), bombas con patas (te persiguen y explotan), fuego; jefe: Tipi-Topi Toro Ígneo (embiste; se marea al chocar con la pared y entonces es vulnerable).
3. Las nubes locas – Tropix (ojos-rotor: normal, listo, fuerte, vampiro), abejas con aguijones, torretas con balas explosivas, lavadoras que salen disparadas, aire tóxico, bloques que se rompen saltando encima (y sueltan Tropix) y nubes enfadadas que te lanzan arriba pero te ralentizan; jefe: Tipi-Topi Pájaro (ráfagas de aire y embestida; se estrella y se marea).

En la pantalla de selección se elige personaje (← →) y nivel (↑ ↓ o tocando).

## Estructura
- `src/level1.js`, `level2.js`, `level3.js` – datos de cada nivel (suelo, plataformas, enemigos, estrellas, carteles, zonas, jefe). `src/levels.js` los lista; para un nivel nuevo copia uno y añádelo ahí.
- `src/entities.js` – personajes jugables (`CHARS`), enemigos (bacteria, gordo, araña, fuego, piraña, bomba) y jefes (planta, toro).
- `src/scenes/` – menú, selección de personaje y escena de juego (controles, HUD, flujo).
- `src/audio.js` – efectos y música generados con WebAudio.
- `src/textures.js` – suelo, nubes, estrellas… dibujados por código.
- `assets/sprites/` – sprites generados desde los dibujos.
- `tools/` – generación de sprites (Python + pillow). `make_clean.py` redibuja los personajes en estilo limpio (el actual). `make_enemies.py`/`make_hero.py` recortan los dibujos originales tal cual (estilo crayón). `sh tools/run.sh` regenera los PNG.
- `vendor/phaser.min.js` – Phaser 3.88.2 incluido.

## Tipografía
Por defecto usa una fuente redonda del sistema. Para una fuente propia (p. ej. *Fredoka* de Google Fonts, gratis), guarda el archivo como `assets/fonts/tipi.ttf` (o `tipi.woff2`) y se usará sola.

## Reglas del juego
- Pisar enemigos o golpearlos (ESPACIO). El **fuego** no se puede pisar: solo golpe.
- Las **bombas** se encienden al acercarte: golpéalas antes o corre. Las **pirañas** solo salen de los agujeros de lava.
- Caer a la lava tampoco quita vida.
- El **gordo** aguanta 2 golpes. El **jefe** solo es vulnerable cuando se agacha mareado.
- 5 vidas (ojos). Caer a un agujero no quita vida: vuelves al último punto de control.
- Las setas rosas son trampolines; ¡hay estrellas muy arriba!

## Nivel 4 – Slime y 5 personajes nuevos
- Personajes extra (selector 4×2): **Cucurella** (ESPACIO: paella; en el aire: balón), **Adulto** (café en arco), **Adolescente** (móvil boomerang), **Perro** (lametón), **Gato** (arañazo rápido y 2 saltos en el aire). Sprites: `python3 tools/make_chars.py`.
- Nivel 4 (`src/level4.js`, `?level=4`): fantaslimes (al derrotarlos dejan un charco), charcos que te vuelven slime 8 s para pasar las rejas, mandíbulas (avisan antes de cerrarse), bolitas rebotonas, babosas que escupen, bloques de slime que te lanzan. Jefe: **Fantaslime gigante**. Sprites: `python3 tools/make_slime.py`.

## Nivel 5 – Champiñones
Sin suelo: se avanza por setas gigantes (`giants` en `src/level5.js`). Setas moradas = alucinación 7 s al pisarlas (teclas al revés / mundo boca abajo / avanzar hacia la izquierda; aleatorio). Champiñones que pegan cabezazos (te dan alucinación), Tropix campeón (casco de seta que se vuelve escudo 2 s, espera 5 s), trampolines y jefe Champiñón Rey. Sprites: `python3 tools/make_setas.py`.

## Nivel 6 – Máquinas y 5 personajes más
- Personajes (selector con páginas de 4; Q/E o flechas en pantalla cambian de página): **Panda** (se hace bola y embiste), **Futurista** (rayo láser), **Slime** (bolas que botan), **Científico** (poción que deja un charco), **Granny** (bolsazo). Sprites: `python3 tools/make_chars2.py`.
- Nivel 6 (`src/level6.js`): robots cuerpo a cuerpo, drones que disparan, puertas que no se saltan, cables (tocas un extremo y viajas como electricidad), placas de presión con trampa láser y jefe Robot Gigante. Sprites: `python3 tools/make_maquinas.py`.
- Al perder aparece el botón «Cambiar personaje» (tecla C).

## Nivel 7 – La Odisea y tienda de estrellas
- Nivel 7 (`src/level7.js`, boceto en `sketches/odisea_nivel7.jpg`): **Sirenas** (vuelan y se lanzan en picado; la **cera** que recoges te protege 25 s), **Escila** (roca con 12 cabezas que avisan antes de lanzarse; si las golpeas se encogen), **Caribdis** (remolino que te arrastra hacia el hueco), **Circe** (si la tocas eres cerdo 4 s: sin ataque y más lento), ovejas y el jefe **Polifemo**: tira 2 ojitos cada 4 s y solo le hiere la **estaca de madera** (está al final del nivel; sin ella no puedes entrar en su cueva). Sprites: `python3 tools/make_odisea.py`.
- Tienda (`src/scenes/shop.js`, catálogo en `src/shop.js`, guardado en `src/save.js` con localStorage): las estrellas que cojas en cualquier nivel se guardan. Se entra desde la pantalla de elegir personaje (botón o tecla T). Hay gorros, pieles (colores), armas (espada, varita, martillo) y estelas (confeti, chispas). Sprites: `python3 tools/make_tienda.py`.

## Nivel 8 – Dentro del taco
- `src/level8.js` (boceto: `sketches/taco_nivel8.jpg`): cactus que pinchan, taco-bots que disparan láseres, burritos (+1 vida, pero algunos quitan una), taco-transportante (te lleva a un sitio al azar, incluso ante el jefe), sombrero mexicano (escudo 9 s), nachos (pantalla oscura 8 s) y jefe Tipi-Cacto. Sprites: `python3 tools/make_taco.py`.
- Tienda: antifaz de superhéroe y 4 estelas más (estrellas, burbujas, fuego, arcoíris). Circe ahora tiene 10 vidas.

## Niveles 9, 10 y 11 – Egipto, Halloween y Agua
- Nivel 9 Egipto (`src/level9.js`): rubí maldito (te lleva atrás y te quita vida), diamante (+1 vida, salen 3 escorpiones), escorpiones, Tropix escorpión (escupe veneno), tipi-momia (te enrolla y lanza escorpiones), langostas cada 20 s (los enemigos se esconden y cambian de sitio) y jefe Pirámide (salta y aplasta, suelta un escorpión cada 5 s).
- Nivel 10 Halloween (`src/level10.js`): lluvia de sangre (decorativa), arañas, Tropix vampiro, mini vampiros (mordisco: 5 s de lentitud), calabazas que persiguen y explotan, jefe Vampiro (vuela, muerde y al aterrizar se puede golpear).
- Nivel 11 Agua (`src/level11.js`): el agua no mata, flotas; barriles-plataforma, pez espada (lanza su espada), pez linterna (te hipnotiza: teclas al revés 4 s) y jefe Ballena (chorros venenosos; abre la boca con dientes y entonces se le golpea).
- Sprites: `python3 tools/make_mundos.py`. Bocetos en `sketches/`.

## Nivel 12 – Luna de queso y personaje Astro
- **Astro**: astronauta con casco de cristal; ESPACIO lanza quesos que botan.
- **Luna de queso**: poca gravedad (saltos igual de altos pero muy flotantes). Ratones, ovnis que escupen pegotes y jefe **Rata Reina** (salta despacio y aplasta; suelta un ratón cada 5 s; golpéala cuando se maree).
- Sprites: `python3 tools/make_luna.py assets/sprites`.

## Nivel 13 – El jardín
- Enemigos: escarabajos, mariquitas, abejas y **plantas carnívoras** (escupen polen; si te tocan o te da el polen eres una **maceta 4 s**: vas lento, saltas menos y no atacas; se pueden aplastar).
- Jefe **Enredadera**: marca el suelo con una sombra roja y lanza un zarcillo; tras dos zarcillos se desmaya (golpéala entonces). Suelta un bicho cada 5 s.
- Sprites: `python3 tools/make_jardin.py assets/sprites`.

## Personajes Mariachi y Pirata + nivel 14 (isla pirata)
- **Mariachi** (sombrero y bigote): ESPACIO lanza notas musicales que atraviesan enemigos. **Pirata** (tricornio y barba): sablazo.
- **Isla del tesoro**: cangrejos, loros, cañones piratas y jefe **Cangrejo Rey** (salta, dispara bolas de cañón y suelta cangrejos).
- Sprites: `python3 tools/make_pirata.py assets/sprites`.

## Nivel 15 – Mundo pedorro
- Cacas con ojo, moscas, nubes de pedo y jefe **Gran Caca** (salta, escupe pedos verdes en abanico y suelta cacas). Hay setas-trampolín.
- Sprites: `python3 tools/make_pedos.py assets/sprites`.

## Nivel 16 – Dulcelandia
- 13 enemigos: gominolas, helados (disparan nata) y bombones voladores. Jefe **Tarta Gigante** (embiste y se marea).
- Sprites: `python3 tools/make_dulce.py assets/sprites`.

## Personaje Caquita
- ESPACIO en el suelo: lanza una caca que bota; el malo al que le da **se hace amigo** (corazón rosa, te sigue y ya no te hace daño; a los jefes no les afecta).
- ESPACIO en el aire: pedo cohete (daña y te impulsa). Salta 3 veces (2 saltos extra en el aire, con pedito).
- Sprites: `python3 tools/make_caquita.py assets/sprites`.

## Cacazilla y nivel 17 (circo)
- **Cacazilla**: ESPACIO en el suelo = caca que **mata** al malo (cualquier enemigo normal); ESPACIO en el aire = caca que lo hace amigo. La caca de Caquita y Cacazilla también daña a un jefe mareado.
- **Circo loco**: payasitos, globos, malabaristas (pelotas explosivas) y jefe **Payaso Gigante** (salta, lanza pelotas y suelta payasitos).
- Sprites: `python3 tools/make_circo.py assets/sprites`.

## Amigos que atacan y Tipi-Topi Mona Lisa
- Los **amigos** (malos a los que les diste caca) ahora buscan al malo más cercano y lo atacan; si no hay ninguno, te siguen.
- **Mona Lisa**: pelo oscuro, velo y sonrisa misteriosa. ESPACIO lanza su marco, que atraviesa enemigos y vuelve.
- Sprites: `python3 tools/make_monalisa.py assets/sprites`.

## Nivel 18 – París
Turistas (con cámara que lanza flashes), mimos y palomas. Hay que subir las escaleras de la Torre Eiffel (sobre el Sena) y cruzar el río saltando de barco en barco (los barcos te llevan). Jefe: **Monsieur Gourmet**: cae comida francesa; cada bocado le quita fuerza al chef pero te pone barriga (más lento, saltas menos). Corre y salta para quemarla, come ensalada para adelgazar; si llegas al 100 % pierdes un corazón. Sprites: `python3 tools/make_paris.py assets/sprites`.

## Nivel 19 – Bacterias (dibujo de Miguel) + personaje Bacteria
Tipi-topi bacteria (andan), tropix bacteria (vuelan y lanzan bacterias), bacterias de pinchos (disparan pinchos), placas de bacterias (lentas, en el suelo) y jefe final: la Bacteria Gigante (salta, lanza pinchos, suelta bacterias; golpéala cuando se marea). Personaje **Bacteria**: ESPACIO escupe pinchos que atraviesan. Sprites: `python3 tools/make_bacterias.py assets/sprites`.

## Nivel 20 – Mundo raro (dibujo de Miguel)
Gusanos, serpiente que escupe, oruga, pájaro raro, peludos y **columnas rojas** (indestructibles: te empujan lejos sin hacerte daño). Jefe: el Jefe Raro (cara de anillos): salta, lanza bolas raras y suelta gusanos; golpéalo cuando se maree. Sprites: `python3 tools/make_raro.py assets/sprites`.

## Personaje Unicornio
Tipi-topi unicornio con cuerno y melena arcoíris. ESPACIO lanza tacos tipi-topi que rebotan. Sprites: `python3 tools/make_unicornio.py assets/sprites`.

## Nivel 21 – La selva
Culebras, tigres y plantas que dan manotazos (te empujan hacia atrás sin hacerte daño; se pueden golpear). Jefe: el Gorila Gigante (salta, lanza cocos y suelta culebras). Sprites: `python3 tools/make_selva.py assets/sprites`.

## Nivel 22 – La granja
Corderos que dan balidos (ondas de sonido), terneras que embisten y higos chungos que cuelgan y caen cuando pasas debajo. Jefe: el Albaricoque Gigante (salta, lanza huesos y suelta terneras). Sprites: `python3 tools/make_granja.py assets/sprites`.

## Nivel 23 – Colores (un mundo de cada color del arcoíris)
26 **pegotes de colores** (cada uno del color de su mundo: andan, vuelan con alas o escupen) y **tres jefes seguidos** (Pegote Gigante rojo → verde → violeta). La barra de jefe es la suma de los tres (12 golpes). Clase `TripleJefe` en `entities.js`.

Sprites de los pegotes: `python3 tools/make_pegotes.py assets/sprites`.

## Tienda ampliada
Ahora hay 23 gorros (boina, Papá Noel, pirata, vaquero, cocinero, paja, orejas de gato, cuernitos, cuerno de unicornio, helado, torero, gorra de España, sombrero, lazo…), 18 pieles (incluidas **España** —rojo/amarillo— y **Neón**), 9 armas (lanza, bate, bastón láser, guitarra, tenedor, abanico de España…; cada una con `wk`: tajo / lados / tiro en `shop.js`) y 15 estelas (**España**, corazones, notas, nieve, hojas, oro, noche, cacas, lava…). La tienda tiene páginas de 12 (↑ ↓). Sprites: `python3 tools/make_tienda2.py assets/sprites`.

Más tienda: +14 gorros (corona de flores, auriculares, casco, lana, mago, conejo, alien, tiburón, pizza, sandía, laurel, gafas de sol, bigote, pañuelo), +14 pieles (fuego, México, Francia, oro brillante…), +6 armas (sartén, raqueta, pala, cucharón, poción, queso) y +13 estelas (México, Francia, Italia, rayos, humo, flores, galaxia, hielo, lluvia, pompas, estrellas fugaces, purpurina, gominolas). Sprites: `python3 tools/make_tienda3.py assets/sprites`.

## Tienda 4 (más cosas)
`tools/make_tienda4.py` genera 15 gorros y 12 armas nuevas. Además hay 26 pieles (varias animadas) y 14 estelas nuevas. En total 179 objetos.

## Tienda 5
`tools/make_tienda5.py`: 17 armas más (44 en total, 196 objetos).

## Nivel 24 – Rebuscado
`tools/make_rebuscado.py` + `src/level24.js`. Malos rarísimos: sillón, tostadora (tostadas), lámpara, nube con paraguas, pulpo-teléfono, reloj de cuco, pez en bici, **espejo** (te copia al revés), **imán** (te atrae) y **mimo** (reaparece a tu lado). Jefe: la Tetera Rebuscada.

## Nivel 25 – Tecnología
`tools/make_tecno.py` + `src/level25.js`. Móviles, portátiles, routers, altavoces, ratones, cámaras, CDs voladores, robots y drones. Jefe: Impresora 3D que imprime mini impresiones (`MiniPrint`) que te persiguen.

## Nivel 26 – Navidad
`tools/make_navidad.py` + `src/level26.js`. Nieve cayendo, árboles y bastones decorativos; muñeco de nieve, reno, elfo, cascanueces, bola, galleta, estrella y regalo trampa (`Regalo`). Jefe: Papá Noel Gigante.

## Personaje: Oso pirado
`tools/make_oso.py`: oso despeinado con ojo enorme, ojeras, abeja y gotas de miel. ESPACIO lanza tarros de miel que hacen charco.

## Nivel 27 – Lenguas y babas (idea de los niños)
`tools/make_lenguas.py` + `src/level27.js`. Lenguas que salen del suelo (`Lengua`), babas que caen (`HigoCaida` con otra textura), babosas, tipi-topis malos, bocas voladoras y dientes de decorado. Jefe final: Lengua Gigante.

## Nivel 28 – Fútbol (idea de los niños)
`tools/make_futbol.py` + `src/level28.js`. Balones que botan mucho (`Balon`), porterías que sueltan 3 balones si las tocas (`Porteria`), marcador de 20 s que suelta 10 balones al llegar a 0 (`updateMarcador`), jugadores, árbitros, hinchas y vuvuzelas. Jefe: Goleador Gigante, que lanza balones y camisetas que te atrapan (`Camiseta`).

## Personaje: Ojitos (idea de los niños)
`tools/make_ojitos.py`: cabeza llena de ojitos, naricilla, lengua y baba. ESPACIO lanza ojos con baba.

## Personajes: Ninja y Chupa
- **Ninja** (cuerpo rojo, pañuelo negro): ESPACIO lanza espadas. **Chupa** (lengua rizada): ESPACIO da un lenguetazo.
- Sprites generados con `tools/make_ninja_chupa.py`.

import { makeTextures } from '../textures.js';
import { unlock, SFX } from '../audio.js';

// Si existe assets/fonts/tipi.ttf (o .woff2) se usa esa fuente; si no, una sans redondeada del sistema.
export const FONT = '"Tipi", "Arial Rounded MT Bold", "Trebuchet MS", "Segoe UI", Verdana, sans-serif';
const SPRITES = ['ninja_normal', 'ninja_closed', 'ninja_sad', 'ninja_angry', 'chupa_normal', 'chupa_closed', 'chupa_sad', 'chupa_angry', 'ojitos_normal', 'ojitos_closed', 'ojitos_sad', 'ojitos_angry', 'ojito_p', 'fb_porteria', 'fb_camiseta', 'fb_jugador', 'fb_arbitro', 'fb_hincha', 'fb_vuvuzela', 'fb_banderin', 'fb_cono', 'goleador', 'goleador_jump', 'goleador_dizzy', 'lb_lengua', 'lb_baba', 'lb_babosa', 'lb_tipimalo', 'lb_bocavol', 'lb_diente', 'lengua', 'lengua_jump', 'lengua_dizzy', 'oso_normal', 'oso_closed', 'oso_sad', 'oso_angry', 'miel_p', 'nv_muneco', 'nv_reno', 'nv_elfo', 'nv_cascanueces', 'nv_bola', 'nv_galleta', 'nv_estrella', 'nv_regalo', 'nv_regalo_open', 'nv_arbol', 'nv_baston', 'santa', 'santa_jump', 'santa_dizzy', 'tc_movil', 'tc_portatil', 'tc_router', 'tc_altavoz', 'tc_raton', 'tc_cd', 'tc_camara', 'tc_miniprint', 'impresora', 'impresora_jump', 'impresora_dizzy', 'rb_sillon', 'rb_tostadora', 'rb_lampara', 'rb_nube', 'rb_pulpo', 'rb_cuco', 'rb_pezbici', 'rb_espejo', 'rb_iman', 'rb_mimo', 'tetera', 'tetera_jump', 'tetera_dizzy', 'arma_cangrejo', 'arma_pincel', 'arma_trompeta', 'arma_cafetera', 'arma_paella', 'arma_ensaladera', 'arma_slime', 'arma_taco', 'arma_bacteria', 'arma_retrato', 'arma_maza', 'arma_tridente', 'arma_abanico2', 'arma_plumero', 'arma_boomerang', 'arma_calcetin', 'arma_estrellon', 'hat_astronauta', 'hat_cebolla', 'hat_donut', 'hat_ojos', 'hat_nube', 'hat_piramide', 'hat_cohete', 'hat_zanahoria', 'hat_corazon', 'hat_tricornio', 'hat_samurai', 'hat_pina', 'hat_pajaro', 'hat_fantasma', 'hat_arbol', 'arma_paraguas', 'arma_hacha', 'arma_bocata', 'arma_pez', 'arma_llave', 'arma_trueno', 'arma_globo', 'arma_fregona', 'arma_banana', 'arma_cometa', 'arma_zapato', 'arma_piruleta', 'hat_flores', 'hat_auriculares', 'hat_casco', 'hat_lana', 'hat_mago', 'hat_conejo', 'hat_alien', 'hat_tiburon', 'hat_pizza', 'hat_sandia', 'hat_laurel', 'hat_gafas', 'hat_bigote', 'hat_panuelo', 'arma_sarten', 'arma_raqueta', 'arma_pala', 'arma_cuchara', 'arma_pocion', 'arma_queso', 'hat_boina', 'hat_santa', 'hat_pirata', 'hat_cowboy', 'hat_chef', 'hat_paja', 'hat_gato', 'hat_diablo', 'hat_unicornio', 'hat_helado', 'hat_montera', 'hat_espana', 'hat_sombrero', 'hat_lazo', 'arma_lanza', 'arma_bate', 'arma_laser', 'arma_guitarra', 'arma_tenedor', 'arma_abanico', 'pg_rojo', 'pgv_rojo', 'pgt_rojo', 'pg_naranja', 'pgv_naranja', 'pgt_naranja', 'pg_amarillo', 'pgv_amarillo', 'pgt_amarillo', 'pg_verde', 'pgv_verde', 'pgt_verde', 'pg_azul', 'pgv_azul', 'pgt_azul', 'pg_violeta', 'pgv_violeta', 'pgt_violeta', 'pg_rosa', 'pgv_rosa', 'pgt_rosa', 'pgb_rojo', 'pgb_rojo_jump', 'pgb_rojo_dizzy', 'pgb_verde', 'pgb_verde_jump', 'pgb_verde_dizzy', 'pgb_violeta', 'pgb_violeta_jump', 'pgb_violeta_dizzy', 'cordero', 'ternera', 'higo', 'albaricoque', 'albaricoque_jump', 'albaricoque_dizzy', 'culebra', 'tigre', 'planta_mano', 'planta_mano_slap', 'gorila', 'gorila_jump', 'gorila_dizzy', 'unicornio_normal', 'unicornio_closed', 'unicornio_sad', 'unicornio_angry', 'taco_p', 'gusano', 'serpiente', 'oruga', 'pajaro_raro', 'peludo', 'empujon', 'raro_jefe', 'raro_jefe_jump', 'raro_jefe_dizzy', 'bact_tipi', 'bact_tropix', 'bact_pinchos', 'placa', 'bact_jefe', 'bact_jefe_jump', 'bact_jefe_dizzy', 'bact_p', 'bacteria_normal', 'bacteria_closed', 'bacteria_sad', 'bacteria_angry', 'turista', 'mimo', 'paloma', 'barco', 'torre_eiffel', 'crepe', 'croissant', 'baguette', 'queso_f', 'caracol', 'ensalada', 'chef', 'chef_throw', 'chef_happy', 'hero_normal', 'hero_closed', 'hero_sad', 'hero_angry', 'bacteria', 'arana', 'fuego', 'gordo', 'boss_plant', 'boss_pot',
  'abuelo_normal', 'abuelo_closed', 'abuelo_sad', 'abuelo_angry', 'bebe_normal', 'bebe_closed', 'bebe_sad', 'bebe_angry', 'bebe_bite',
  'cucurella_normal', 'cucurella_closed', 'cucurella_sad', 'cucurella_angry', 'adulto_normal', 'adulto_closed', 'adulto_sad', 'adulto_angry', 'adolescente_normal', 'adolescente_closed', 'adolescente_sad', 'adolescente_angry', 'perro_normal', 'perro_closed', 'perro_sad', 'perro_angry', 'gato_normal', 'gato_closed', 'gato_sad', 'gato_angry', 'paella', 'balon', 'cafe', 'movil', 'baston', 'pirana', 'bomba', 'bomba_hot', 'toro', 'toro_charge', 'toro_dizzy',
  'tropix', 'tropix_listo', 'tropix_fuerte', 'tropix_vampiro', 'ojo_rotor', 'torreta', 'canon', 'bala', 'explosion', 'lavadora', 'lavadora_hot',
  'abeja', 'aguijon', 'nube_feliz', 'nube_enfadada', 'bloque', 'toxico', 'rafaga', 'pajaro', 'pajaro_up', 'pajaro_dizzy',
  'fantaslime', 'charco', 'mandibulas_open', 'mandibulas_closed', 'reja', 'bolita', 'slimebloque', 'babosa', 'glob', 'gran_slime', 'gran_slime_squash', 'gran_slime_jump', 'ola_slime',
  'seta_gigante', 'seta_alu', 'seta_cap', 'champi', 'seta_rey', 'seta_rey_charge', 'seta_rey_dizzy',
  'panda_normal', 'panda_closed', 'panda_sad', 'panda_angry', 'futurista_normal', 'futurista_closed', 'futurista_sad', 'futurista_angry', 'slimey_normal', 'slimey_closed', 'slimey_sad', 'slimey_angry', 'cientifico_normal', 'cientifico_closed', 'cientifico_sad', 'cientifico_angry', 'escarabajo', 'mariquita', 'planta', 'polen', 'enredadera', 'enredadera_swing', 'enredadera_dizzy', 'zarcillo', 'mariachi_normal', 'mariachi_closed', 'mariachi_sad', 'mariachi_angry', 'pirata_normal', 'pirata_closed', 'pirata_sad', 'pirata_angry', 'nota', 'sable', 'cangrejo', 'loro', 'canon_pirata', 'cangrejo_rey', 'cangrejo_rey_jump', 'cangrejo_rey_dizzy', 'caca', 'mosca', 'pedo_nube', 'gran_caca', 'gran_caca_jump', 'gran_caca_dizzy', 'gominola', 'helado', 'bombon', 'tarta', 'tarta_charge', 'tarta_dizzy', 'caquita_normal', 'caquita_closed', 'caquita_sad', 'caquita_angry', 'caca_p', 'cacazilla_normal', 'cacazilla_closed', 'cacazilla_sad', 'cacazilla_angry', 'cacak_p', 'payasito', 'globo', 'malabarista', 'payaso', 'payaso_jump', 'payaso_dizzy', 'monalisa_normal', 'monalisa_closed', 'monalisa_sad', 'monalisa_angry', 'marco', 'astro_normal', 'astro_closed', 'astro_sad', 'astro_angry', 'queso_p', 'raton', 'ovni', 'reina', 'reina_jump', 'reina_dizzy', 'granny_normal', 'granny_closed', 'granny_sad', 'granny_angry', 'laser', 'frasco', 'bolso', 'robot', 'robot_punch', 'dron', 'cable_end', 'puerta', 'placa', 'placa_on', 'rayo', 'antena', 'engranaje', 'mega_robot', 'mega_robot_charge', 'mega_robot_dizzy',
  'escila', 'escila_cabeza', 'caribdis', 'circe', 'sirena', 'sirena_up', 'polifemo', 'polifemo_throw', 'polifemo_dizzy', 'miniojo', 'oveja', 'cera', 'estaca', 'nota', 'columna', 'olivo',
  'hat_gorra', 'hat_copa', 'hat_corona', 'hat_vikingo', 'hat_cumple', 'hat_flor', 'hat_bruja', 'hat_halo', 'arma_espada', 'arma_martillo', 'arma_varita',
  'cactus_h', 'tacobot', 'tipicacto', 'tipicacto_charge', 'tipicacto_dizzy', 'burrito', 'portal', 'sombrero', 'nachos', 'hat_antifaz',
  'rubi', 'diamante', 'escorpion', 'tropix_escorpion', 'momia', 'piramide', 'piramide_jump', 'piramide_dizzy', 'langosta', 'palmera', 'minivamp', 'minivamp_up', 'calabaza', 'calabaza_hot', 'vampiro', 'vampiro_dive', 'vampiro_dizzy', 'lapida', 'gota', 'pez_espada', 'espada', 'pez_linterna', 'ballena', 'ballena_open', 'ballena_hurt'];

export class Boot extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload() {
    const w = this.scale.width, h = this.scale.height;
    const bar = this.add.rectangle(w / 2, h / 2, 10, 14, 0xffffff);
    this.add.text(w / 2, h / 2 - 40, 'Cargando…', { fontFamily: FONT, fontSize: 28, color: '#fff' }).setOrigin(0.5);
    this.load.on('progress', (p) => bar.setSize(Math.max(10, 400 * p), 14));
    SPRITES.forEach((k) => this.load.image(k, `assets/sprites/${k}.png`));
  }
  create() {
    makeTextures(this);
    this.scene.start('Menu');
  }
}

export class Menu extends Phaser.Scene {
  constructor() { super('Menu'); }
  create() {
    const W = 960, H = 540;
    this.add.image(0, 0, 'sky0').setOrigin(0).setDisplaySize(W, H);
    this.add.image(W - 150, 110, 'sunface').setScale(0.9);
    this.add.image(0, H - 260, 'hf0').setOrigin(0);
    this.add.image(0, H - 230, 'hn0').setOrigin(0);
    this.add.tileSprite(W / 2, H - 40, W, 80, 'ground0');
    for (let i = 0; i < 4; i++) {
      const c = this.add.image(Phaser.Math.Between(0, W), Phaser.Math.Between(30, 200), 'cloud').setScale(Phaser.Math.FloatBetween(0.6, 1.1));
      this.tweens.add({ targets: c, x: c.x + 120, duration: Phaser.Math.Between(9000, 15000), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    for (let i = 0; i < 5; i++) {
      const e = this.add.image(80 + i * 190, Phaser.Math.Between(180, 300), 'skyeye').setScale(0.8);
      this.tweens.add({ targets: e, y: e.y - 24, duration: 1200 + i * 150, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    // título loco: cada letra de un color, botando
    const letters = 'Tipi-Topi'.split(''), cols = ['#ff5d8f', '#ffb347', '#ffe14d', '#7ed957', '#4cc9f0', '#b57bff', '#ff5d8f', '#ffb347', '#7ed957'];
    letters.forEach((ch, i) => {
      const t = this.add.text(W / 2 - 330 + i * 82, 130, ch, { fontFamily: FONT, fontStyle: 'bold', fontSize: 120, color: cols[i], stroke: '#2b2b44', strokeThickness: 16 }).setOrigin(0.5);
      this.tweens.add({ targets: t, y: 112, angle: { from: -6, to: 6 }, duration: 600 + i * 40, delay: i * 90, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
    this.body = this.add.image(W / 2, 330, 'hero_normal').setScale(0.4);
    this.legs = this.add.graphics();
    this.tweens.add({ targets: this.body, y: 318, duration: 450, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.t = 0;
    const hint = this.add.text(W / 2, 470, 'Pulsa ESPACIO o toca la pantalla para jugar', { fontFamily: FONT, fontStyle: 'bold', fontSize: 30, color: '#fff', stroke: '#2b2b44', strokeThickness: 8 }).setOrigin(0.5);
    this.tweens.add({ targets: hint, alpha: 0.4, duration: 700, yoyo: true, repeat: -1 });
    this.add.text(W / 2, 516, '← → mover · ↑ saltar (¡doble salto!) · ESPACIO golpear con el ojo · M sonido', { fontFamily: FONT, fontStyle: 'bold', fontSize: 17, color: '#fff', stroke: '#2b2b44', strokeThickness: 5 }).setOrigin(0.5);
    const go = () => { unlock(); SFX.click(); this.scene.start('Select'); };
    this.input.keyboard.once('keydown-SPACE', go); this.input.keyboard.once('keydown-ENTER', go); this.input.once('pointerdown', go);
  }
  update(_, dt) {
    this.t += dt / 1000;
    this.legs.clear().lineStyle(11, 0x2b2b44, 1);
    for (let i = 0; i < 2; i++) { const x = this.body.x + (i ? 24 : -24); this.legs.beginPath().moveTo(x, this.body.y + 56).lineTo(x + Math.sin(this.t * 6 + i * 3) * 6, 442).strokePath(); this.legs.fillStyle(0x2b2b44, 1).fillCircle(x + Math.sin(this.t * 6 + i * 3) * 6, 442, 6); }
  }
}

export const MAPA = {
  imagen: "mapa-museo3D.png",
  ancho: 871,
  alto: 873,
  a: [2.33523546, 0.000920255],
  b: [-0.00682343, 2.34246727],
  c: [435.230382, 445.104189],
  zoomMinimapa: 0.75      
};

export const PUNTOS = [
  {
    id: "pantera",
    extra: "pantera",
    titulo: "Monumento a la Pantera",
    etiqueta: "Monumento",
    texto: [
      "Este monumento no existe físicamente en el plantel: es una pieza creada especialmente para este museo digital, un homenaje a lo que significa ser Pantera para quienes han pasado por el CETIS 69.",
      "La pantera acompaña el escudo del plantel —un engranaje con una pantera— y representa a una comunidad que ya suma 46 años de historia y más de 1,100 estudiantes activos dentro del subsistema DGETI de la SEP."
    ],
    imagenes: [],
    distancia: 60
  },
  {
    id: "letras",
    extra: "letras",
    titulo: "Letras CETIS 69",
    etiqueta: "Fachada",
    texto: "Estas letras forman el nombre completo del plantel: Centro de Estudios Tecnológicos Industrial y de Servicios No. 69, parte del subsistema DGETI de la SEP. El CETIS 69 se ubica en Ciudad Obregón, Sonora, en el sector que antes se conocía como Oriente, dentro de la colonia Benito Juárez, la primera que tuvo la ciudad. Desde hace 46 años, estas letras reciben a cada generación de Panteras que llega a formarse aquí.",
    distancia: 70
  },
  {
    id: "mural",
    objeto: "^mural$",
    titulo: "Mural del museo",
    etiqueta: "Arte",
    texto: "Este mural no corresponde a una obra real fotografiada en el plantel: es una representación pensada para esta sala, inspirada en los símbolos del CETIS 69 —el engranaje, la pantera y los colores institucionales— y en el trabajo de alumnos de las distintas especialidades. Si el plantel tiene un mural real, lo ideal es reemplazar este texto por su historia verdadera: quién lo pintó, en qué año y qué representa.",
    imagenes: [],
    distancia: 70
  },
  {
    id: "mural2",
    objeto: "^mural2$",
    titulo: "Mural lateral",
    etiqueta: "Arte",
    texto: "Este segundo mural es, igual que el anterior, una pieza ilustrativa creada para el recorrido virtual y no la fotografía de un mural existente. Puede usarse para representar otro momento de la vida escolar: una generación egresada, una especialidad en particular o un mensaje de la comunidad estudiantil. Conviene reemplazarlo con la imagen y la historia reales en cuanto el equipo las tenga.",
    distancia: 70
  },
  {
    id: "cuadro",
    objeto: "^cuadro$",
    titulo: "Cuadro principal",
    etiqueta: "Entrada",
    texto: "Bienvenido al Museo Digital CETIS 69. En este recorrido virtual vas a conocer la historia, los espacios y el espíritu de una escuela que, desde 1980, prepara técnicos de nivel medio superior en Ciudad Obregón, Sonora. Hoy más de 1,100 estudiantes comparten una misma identidad: ser Panteras.",
    distancia: 60
  },
  {
    id: "d1980",
    objeto: "^los80$",
    titulo: "Década de 1980",
    etiqueta: "Línea del tiempo",
    texto: "En 1980 abrió sus puertas el CETIS No. 69 en Ciudad Obregón, como parte de la expansión del subsistema DGETI de educación tecnológica en México. Las primeras generaciones de Panteras llegaron a un plantel mucho más pequeño que el actual, con las primeras aulas, talleres y la promesa de ofrecer una carrera técnica junto con el bachillerato. Esta década sentó la identidad que el plantel conserva 46 años después.",
    imagenes: []
  },
  {
    id: "d1990",
    objeto: "^los90$",
    titulo: "Década de 1990",
    etiqueta: "Línea del tiempo",
    texto: "Durante los años 90, el CETIS 69 vivió una etapa de consolidación: llegaron nuevas generaciones de Panteras, creció la matrícula y la planta docente, y el plantel fue ganando presencia dentro de la comunidad de Ciudad Obregón. Varios de los maestros y exalumnos de esta época todavía pueden contar, de primera mano, cómo era la escuela en ese momento.",
    imagenes: []
  },
  {
    id: "d2000",
    objeto: "^los2000$",
    titulo: "Década de 2000",
    etiqueta: "Línea del tiempo",
    texto: "La llegada del nuevo siglo trajo al CETIS 69 la modernización de sus espacios: equipo de cómputo, nuevos talleres y una oferta educativa que empezó a acercarse más a las tecnologías de la información. Para muchos egresados de esta generación, los 2000 marcan el paso de una escuela más tradicional a una escuela más tecnológica.",
    imagenes: []
  },
  {
    id: "d2020",
    objeto: "^los2020$",
    titulo: "Década de 2020",
    etiqueta: "Línea del tiempo",
    texto: "Esta década encontró al CETIS 69 celebrando 46 años de historia y renovando su oferta educativa. En noviembre de 2026, el director del plantel, José Duvier Alvarado Chaparro, anunció seis especialidades técnicas nuevas —Inteligencia Artificial, Mantenimiento Industrial, Robótica y Automatización, Cosmetología, Soporte y Gestión de las Tecnologías Informáticas y E-Commerce— que comienzan a partir del siguiente semestre. Ese mismo mes, el plantel participó en el programa federal Atención a las Causas, para que los estudiantes conocieran mejor la historia de su propia colonia, la Benito Juárez, la primera que tuvo Ciudad Obregón.",
    imagenes: []
  },
  {
    id: "mostrador1",
    objeto: "^mostrador$",
    titulo: "Especialidades",
    etiqueta: "Mostrador",
    texto: "Este mostrador presenta dos de las especialidades técnicas nuevas del CETIS 69: Cosmetología, enfocada en maquillaje profesional, cuidado de la piel y estilismo, y E-Commerce, centrada en tiendas en línea, marketing digital y ventas por internet. Ambas forman parte de las seis especialidades que el plantel anunció en noviembre de 2026 para arrancar el siguiente semestre.",
    imagenes: []
  },
  {
    id: "mostrador2",
    objeto: "^mostrador2$",
    titulo: "Especialidades",
    etiqueta: "Mostrador",
    texto: "Aquí se agrupan Inteligencia Artificial —programación, análisis de datos, aprendizaje automático y visión artificial— y Soporte y Gestión de las Tecnologías Informáticas —soporte técnico, redes de cómputo y administración de equipos—. Son dos de las seis especialidades nuevas con las que el CETIS 69 busca responder a la demanda de perfiles tecnológicos de la región.",
    imagenes: []
  },
  {
    id: "mostrador3",
    objeto: "^mostrador3$",
    titulo: "Especialidades",
    etiqueta: "Mostrador",
    texto: "Este mostrador reúne Mantenimiento Industrial —mantenimiento preventivo y correctivo de maquinaria y de sistemas eléctricos y mecánicos— y Robótica y Automatización, que combina diseño y programación de robots con control automático. Ambas especialidades completan la lista de seis carreras técnicas que el plantel comienza a ofrecer a partir de 2026.",
    imagenes: []
  },
  {
    id: "expositor",
    objeto: "^(expositor|exibidorposter\\d*)$",
    titulo: "Exposición de carteles",
    etiqueta: "Exposición",
    texto: "En esta sala se exhiben carteles y trabajos elaborados por alumnos de las distintas especialidades del CETIS 69: prototipos, proyectos de investigación y propuestas que se presentan en exposiciones internas y ferias tecnológicas. Conforme las especialidades nuevas —como Inteligencia Artificial y Robótica— generen sus primeros proyectos, esta sala es un buen lugar para mostrarlos.",
    imagenes: []
  },
  {
    id: "banners",
    objeto: "^banner\\d$",
    titulo: "Banners institucionales",
    etiqueta: "Institución",
    texto: "Estos banners llevan el mensaje que guía al CETIS 69: una educación que combina conocimientos académicos, habilidades tecnológicas y formación en valores. El respeto, la responsabilidad, la disciplina, la innovación y el trabajo en equipo son los valores que el plantel busca formar en cada generación de Panteras.",
    distancia: 60
  },
  {
    id: "fuentes",
    extra: "fuentes",
    titulo: "Fuentes del jardín",
    etiqueta: "Jardín",
    texto: "Estas fuentes tampoco existen en el plantel real: son un elemento decorativo creado para dar vida al jardín del museo digital. Dentro de esta recreación representan un espacio de descanso y convivencia, algo que toda comunidad escolar valora, aunque en el CETIS 69 real ese punto de encuentro tenga otra forma: la plaza cívica, las áreas verdes o el área techada de las Panteras.",
    distancia: 50
  },
  {
    id: "auditorio",
    objeto: "^aud_marco_pantalla$",
    titulo: "Auditorio",
    etiqueta: "Auditorio",
    texto: [
      "Este auditorio, igual que el monumento a la pantera, es una creación del museo digital: el CETIS 69 real no cuenta con un auditorio así. Aquí se proyectan videos sobre el plantel, sus especialidades y su historia: puedes pensarlo como la sala de proyecciones del museo.",
      "Tip: dentro del auditorio puedes sentarte con la tecla E, y hacer clic en la pantalla para pausar el video."
    ],
    distancia: 90
  }
];

export const PLACA_PANTERA = {
  activo: true,
  objeto: "^exibidor$",
  titulo: "LA PANTERA",
  subtitulo: "Monumento del CETIS 69",
  lineas: ["Obra de: Equipo MUDICET69", "Inaugurada en: 2026", "Símbolo de orgullo y unidad"],
  infoId: "pantera",
  ancho: 6.4,
  alto: 2.6,
  altura: 1.9
};


export const VITRINAS = [
  { id: "vit1", x: 2.5,  z: 20.5,  titulo: "Cosmetología", contenido: ["trofeo", "prototipo", "libro"],
    texto: "Cosmetología es una de las seis especialidades técnicas nuevas del CETIS 69, que arranca a partir de 2026. Se enfoca en maquillaje profesional, cuidado de la piel y estilismo, preparando a los estudiantes para trabajar en salones de belleza, spas o para iniciar su propio negocio. Por ser una especialidad que apenas comienza, el trofeo y el prototipo de esta vitrina representan la meta de las primeras generaciones, no logros ya obtenidos: actualízalos en cuanto haya resultados reales que mostrar." },
  { id: "vit2", x: 17.5, z: 20.5,  titulo: "Robótica y Automatización", contenido: ["robot", "medalla", "engrane"],
    texto: "Robótica y Automatización es una de las especialidades técnicas que el CETIS 69 incorpora a partir de 2026. Combina el diseño y la programación de robots con el control automático y los sistemas electrónicos. El robot y el engrane de esta vitrina representan el tipo de proyectos que construirán los estudiantes; como la especialidad es nueva, todavía no hay medallas reales que mostrar, así que conviene actualizar esta vitrina cuando el primer equipo compita." },
  { id: "vit3", x: 8,    z: -18.8, titulo: "Mantenimiento Industrial", contenido: ["trofeo", "engrane"],
    texto: "Mantenimiento Industrial es una de las seis especialidades técnicas nuevas del CETIS 69, enfocada en el mantenimiento preventivo y correctivo de maquinaria y de sistemas eléctricos y mecánicos. El engrane de esta vitrina resume el oficio: mantener en movimiento la maquinaria que mueve la industria de la región." },
  { id: "vit4", x: 23,   z: -18.8, titulo: "E-Commerce", contenido: ["prototipo", "medalla", "libro"],
    texto: "E-Commerce es una de las especialidades nuevas del CETIS 69: forma estudiantes en comercio electrónico, tiendas en línea, marketing digital y gestión de ventas por internet. El prototipo de esta vitrina puede representar una tienda en línea hecha por alumnos, y el libro, los conocimientos de negocio digital que se enseñan en la especialidad. Como acaba de incorporarse, todavía no hay medallas o reconocimientos reales que mostrar aquí." },
  { id: "vit5", x: -18.5, z: 1.4,  titulo: "Inteligencia Artificial", contenido: ["robot", "trofeo"],
    texto: "Inteligencia Artificial es, junto con las demás especialidades anunciadas en noviembre de 2026, una de las seis carreras técnicas nuevas del CETIS 69. Incluye programación, análisis de datos, aprendizaje automático y visión artificial. El robot de esta vitrina representa el tipo de proyectos que desarrollarán los estudiantes; el trofeo, la meta de participar en concursos de tecnología una vez que la especialidad esté en marcha." },
  { id: "vit6", x: -3,   z: 1.4,   titulo: "Soporte y Gestión de TI", contenido: ["medalla", "prototipo", "engrane"],
    texto: "Soporte y Gestión de las Tecnologías Informáticas forma técnicos en soporte técnico, redes de cómputo y administración de equipos y sistemas. Es la sexta de las especialidades nuevas que el CETIS 69 comienza a ofrecer a partir de 2026. El prototipo y la medalla de esta vitrina están pensados como meta a futuro: todavía no hay un historial de logros que contar, porque la especialidad apenas inicia." }
];


export const GALERIAS = [
  {
    activo: true,
    id: "galeria1",
    desde: [-27.5, -20],
    hasta: [-27.5, 15],
    y: 7.5,
    alto: 4.2,
    separacion: 1.2,
    lado: 1,
    imagenes: [
      { archivo: "fotos/foto1.jpg", titulo: "Foto 1", texto: "✏️ Descripción de la foto 1." },
      { archivo: "fotos/foto2.jpg", titulo: "Foto 2", texto: "✏️ Descripción de la foto 2." },
      { archivo: "fotos/foto3.jpg", titulo: "Foto 3", texto: "✏️ Descripción de la foto 3." }
    ]
  }
];


export const BOCINAS = {
  objeto: "bocina|altavoz|parlante|speaker",
  ganancia: 2.6,        
  distanciaReferencia: 14
};


export const ASIENTOS = {
  columnasX: [-147.55, -145.45, -143.35, -141.25, -139.15, -137.05, -134.95, -132.85, -130.75, -128.65,
    -126.55, -124.45, -122.35, -120.25, -118.15, -109.25, -107.15, -105.05, -102.95, -100.85,
    -98.75, -96.65, -94.55, -92.45, -90.35, -88.25, -86.15, -84.05, -81.95, -79.85],
  z0: 2.2,
  paso: 4.5,
  filas: 13,
  desplazamiento: 2.2,     
  alturaOjos: 4.5,        
  distanciaMaxima: 3.6    
};


export const GUIA = [
  { para: "pc",     icono: "fa-keyboard",        titulo: "Caminar",      texto: "W A S D o las flechas. Mantén Shift para correr." },
  { para: "pc",     icono: "fa-computer-mouse",  titulo: "Mirar",        texto: "Mueve el mouse. Esc pausa el recorrido." },
  { para: "pc",     icono: "fa-hand-pointer",    titulo: "Ver información", texto: "Apunta con el punto del centro a un mural, vitrina o monumento y haz clic." },
  { para: "pc",     icono: "fa-map",             titulo: "Mapa",         texto: "Tab abre el mapa grande: toca un lugar para ir directo." },
  { para: "pc",     icono: "fa-chair",           titulo: "Sentarte",     texto: "En el auditorio, acércate a una butaca y pulsa E." },
  { para: "pc",     icono: "fa-circle-question", titulo: "Ayuda",     texto: "H vuelve a mostrar esta guía en cualquier momento." },
  { para: "pc",     icono: "fa-sun",             titulo: "Iluminación",  texto: "1 Día · 2 Atardecer · 3 Noche. M activa o silencia el sonido." },
  { para: "tactil", icono: "fa-gamepad",         titulo: "Caminar",      texto: "Usa el joystick de la esquina izquierda." },
  { para: "tactil", icono: "fa-hand",            titulo: "Mirar",        texto: "Arrastra el dedo por la pantalla." },
  { para: "tactil", icono: "fa-hand-pointer",    titulo: "Ver información", texto: "Toca un mural, vitrina o monumento." },
  { para: "tactil", icono: "fa-map",             titulo: "Mapa",         texto: "Toca el botón Mapa y elige un lugar para ir directo." },
  { para: "tactil", icono: "fa-chair",           titulo: "Sentarte",     texto: "En el auditorio, acércate a una butaca y toca Sentarse." },
  { para: "tactil", icono: "fa-sun",             titulo: "Iluminación",  texto: "Cambia entre Día, Atardecer y Noche con los botones de arriba." }
];


export const CONSEJOS = [
  "Presiona 1, 2 o 3 para cambiar la iluminación",
  "Acércate a un mural o vitrina y haz clic para ver su historia",
  "Abre el mapa con Tab y viaja a cualquier lugar",
  "En el auditorio puedes sentarte con la tecla E",
  "Visita las fuentes de noche para ver su resplandor",
  "Haz clic en la pantalla del auditorio para pausar el video"
];
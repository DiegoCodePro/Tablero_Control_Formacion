// ==================== ENGINE & BUSINESS LOGIC: TECNOLOGÍAS PARA APRENDER ====================

// ==============================================================================
// ☁️ CONFIGURACIÓN DE SUPABASE (BASE DE DATOS CENTRALIZADA EN LA NUBE)
// ==============================================================================
// Pega aquí la URL y la Anon Key de tu proyecto en Supabase (Settings -> API)
const SUPABASE_URL = 'https://adyzbimnjtqcgubuxqyr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_sxfWTa8gLJGe0N2P4w2hgA_43QvxPDR';

let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes('TU_SUPABASE_URL') && !SUPABASE_ANON_KEY.includes('TU_SUPABASE_ANON')) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase conectado exitosamente.');
    } catch (e) {
        console.warn('⚠️ Error al inicializar cliente de Supabase:', e);
    }
}

//// --- DATA SYSTEM (LOCAL STORAGE PERSISTENCE) ---
const STORAGE_KEYS = {
    ACTIONS: 'tpa_dashboard_actions_v2',
    INDICATORS: 'tpa_dashboard_indicators_v2',
    EVENTS: 'tpa_dashboard_events',
    NEWS: 'tpa_dashboard_news',
    STRATEGIES: 'tpa_dashboard_strategies',
    IS_ADMIN: 'tpa_dashboard_is_admin'
};

// CONTRASEÑA POR DEFECTO PARA EL ADMINISTRADOR ÚNICO
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'tecnologias2026'
};

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const MONTHS_FULL = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// --- DATA SEEDS (DATOS REALES EXTRAÍDOS DEL EXCEL PDA FORMACION_2026.xlsx) ---
const DEFAULT_ACTIONS = [
    {
        id: 'act-1',
        code: 'FE_01',
        name: 'Mesas Técnicas de innovación',
        line: 'Innovación',
        description: 'Organizar cuatro mesas técnicas de innovación al año, con participación de personal interno, orientadas a apoyar y acompañar la planificación, ejecución y seguimiento de las actividades del Programa de Innovación.',
        support: 'Lista de asistencia a la reunión o grabación',
        goal: 4,
        unit: 'Mesas técnicas de innovación',
        plannedMonths: { Ene:0, Feb:0, Mar:1, Abr:0, May:0, Jun:1, Jul:0, Ago:0, Sep:1, Oct:0, Nov:1, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Subdirectora de Formación e Innovación / Profesional de Innovación',
        responsibleName: 'Angélica del Pilar Osorio\nDiego Poveda',
        status: 'Planeado'
    },
    {
        id: 'act-2',
        code: 'FE_02',
        name: 'Actividades de innovación pública',
        line: 'Innovación',
        description: 'Organizar actividades como talleres, charlas, encuentros, que permitan la transferencia de conocimientos alineados con las tendencias actuales en innovación dirigidas a todos los colaboradores de CPE.',
        support: 'Lista de asistencia a la reunión o grabación',
        goal: 5,
        unit: 'Talleres, charlas o encuentros u otros',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:1, May:1, Jun:0, Jul:1, Ago:0, Sep:1, Oct:0, Nov:1, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Innovación',
        responsibleName: 'Diego Poveda',
        status: 'Planeado'
    },
    {
        id: 'act-3',
        code: 'FE_03',
        name: 'Docentes formados y acompañados',
        line: 'Formación',
        description: 'Desarrollar la oferta formativa y acompañamiento a docentes por parte de CPE.',
        support: 'Base de datos de docentes formados y acompañados',
        goal: 3600,
        unit: 'Docentes',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:600, Sep:1280, Oct:0, Nov:1720, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional  de Formación 5.2 / Contratista / Contratista',
        responsibleName: 'Diana Maria Montero\nJuan Carlos Ruíz\nJuan Camilo Aponte',
        status: 'Planeado'
    },
    {
        id: 'act-4',
        code: 'FE_04',
        name: 'Alcanzar 800 nuevos Centros de Interés - Línea 1',
        line: 'Formación',
        description: 'La incorporación de esta acción responde a la necesidad de integrar la entrega de dotación tecnológica con procesos de formación y acompañamiento pedagógico, evitando que los recursos se queden en un enfoque meramente dotacional. De este modo, se garantiza que los establecimientos educativos priorizados cuenten con apoyo técnico y pedagógico que promueva la sostenibilidad y la apropiación efectiva de la tecnología.',
        support: 'Base de datos CI creados',
        goal: 875,
        unit: 'Centros de interés',
        plannedMonths: { Ene:0, Feb:688, Mar:12, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:175, Oct:0, Nov:0, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 8.2 / Profesional  de Formación 5.2 / Contratista',
        responsibleName: 'Juliana Lesmes Alvarado\nDiana Maria Montero\nJuan Camilo Aponte',
        status: 'Planeado'
    },
    {
        id: 'act-5',
        code: 'FE_05',
        name: 'Alcanzar 700 Centros de Interés fortalecidos - Linea 2',
        line: 'Formación',
        description: 'La incorporación de esta acción responde a la necesidad de integrar la entrega de dotación tecnológica con procesos de formación y acompañamiento pedagógico, evitando que los recursos se queden en un enfoque meramente dotacional. De este modo, se garantiza que los establecimientos educativos priorizados cuenten con apoyo técnico y pedagógico que promueva la sostenibilidad y la apropiación efectiva de la tecnología.',
        support: 'Base de datos CI acompañados',
        goal: 775,
        unit: 'Centros de interés',
        plannedMonths: { Ene:0, Feb:588, Mar:12, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:175, Oct:0, Nov:0, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 8.2 / Profesional  de Formación 5.2 / Contratista / Contratista',
        responsibleName: 'Juliana Lesmes Alvarado\nDiana Maria Montero\nJuan Camilo Aponte\nJose Luis Rodríguez',
        status: 'Planeado'
    },
    {
        id: 'act-6',
        code: 'FE_06',
        name: 'Actualización y mejora de los contenidos educativos digitales',
        line: 'Formación',
        description: 'Implementar las acciones orientadas a la actualización y mejora de los contenidos educativos digitales, de igual forma realizar dos mesas de seguimiento a la implementación de la estrategia de fomento al uso y apropiación de contenido educativo disponible, en docentes, estudiantes y padres de familia o cuidadores.',
        support: 'Reporte de ejecución y/o asistencia',
        goal: 2,
        unit: 'Reporte de ejecución/asistencia/grabacion',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:1, Ago:0, Sep:0, Oct:0, Nov:0, Dic:1 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 5.1 / Contratista',
        responsibleName: 'Mery Johana Gomez\nJose Luis Rodríguez',
        status: 'Planeado'
    },
    {
        id: 'act-7',
        code: 'FE_07',
        name: 'Actividades para la familia',
        line: 'Formación',
        description: 'Ejecutar las actividades para la familia con padres y cuidadores 2026.',
        support: 'Base de datos de padres o cuidadores',
        goal: 1300,
        unit: 'Padres o cuidadores capacitados',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:1300, Nov:0, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional  de Formación 5.2 / Profesional de Formación 4 / Contratista / Contratista',
        responsibleName: 'Diana Maria Montero\nMateo Castro\nJose Luis Rodríguez\nJuan Camilo Aponte',
        status: 'Planeado'
    },
    {
        id: 'act-8',
        code: 'FE_08',
        name: 'Estudiantes participantes en procesos de formación',
        line: 'Formación',
        description: 'Ejecutar las actividades y experiencias de aprendizaje con uso de elementos electrónicos y tecnológicos recuperados a través del kit Maker con estudiantes de las sedes educativas focalizadas, y a su vez desarrollar sesiones de trabajo, de entrenamiento a estudiantes que permitan desarrollar competencias bajo el enfoque STEM.',
        support: 'Base de datos  estudiantes formados y/o acompañados',
        goal: 15000,
        unit: 'Estudiantes',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:5000, Sep:0, Oct:5000, Nov:5000, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 5.2 / Profesional de Formación 4 / Contratista / Profesional de Formación 8.2 / Contratista',
        responsibleName: 'Diana Maria Montero\nMateo Castro\nJose Luis Rodríguez\nJuliana Lesmes Alvarado\nJuan Camilo Aponte',
        status: 'Planeado'
    },
    {
        id: 'act-9',
        code: 'FE_09',
        name: 'Encuentros, eventos y espacios de participación y/o formación',
        line: 'Formación',
        description: 'La integración de todos los encuentros, eventos y espacios de participación y/o formación en un solo reporte dentro de la estrategia de formación integral de Computadores para Educar (CPE) permite optimizar la planeación, ejecución y  seguimiento de estas actividades. Esta consolidación evita la dispersión de información en reportes aislados, facilita la articulación de los objetivos pedagógicos y técnicos de la Subdirección de Formación y fortalece la coherencia de la estrategia a nivel nacional.',
        support: 'Registro de asistencia participantes',
        goal: 40,
        unit: 'Evento',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:7, Jun:3, Jul:0, Ago:8, Sep:0, Oct:12, Nov:0, Dic:10 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 5.1 / Tecnico de Formación 5 / Profesional de Formación 3 / Profesional de Innovación',
        responsibleName: 'Mery Johana Gomez\nDiana Marcela Arias Garcia\nLuis Ramos\nDiego Poveda',
        status: 'Planeado'
    },
    {
        id: 'act-10',
        code: 'FE_10',
        name: 'Alcanzar 400 nuevas Iniciativas Escolares que integran la Tecnologia - Línea 3',
        line: 'Formación',
        description: 'La incorporación de esta acción responde a la necesidad de integrar la entrega de dotación tecnológica con procesos de formación y acompañamiento pedagógico, evitando que los recursos se queden en un enfoque meramente dotacional. De este modo, se garantiza que los establecimientos educativos priorizados cuenten con apoyo técnico y pedagógico que promueva la sostenibilidad y la apropiación efectiva de la tecnología.',
        support: 'Base de datos Iniciativas Escolares',
        goal: 400,
        unit: 'Iniciativas Escolares',
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:400, Oct:0, Nov:0, Dic:0 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 8.2 / Profesional  de Formación 5.2 / Contratista',
        responsibleName: 'Juliana Lesmes Alvarado\nDiana Maria Montero\nJuan Camilo Aponte',
        status: 'Planeado'
    }
];

const DEFAULT_INDICATORS = [
    {
        id: 'ind-1',
        code: 'FE_1',
        name: 'Porcentaje de satisfacción de los participantes en las estrategias de formación e innovación',
        proceso: 'Formación Educativa',
        type: 'Resultado',
        description: 'Medir el nivel de satisfacción de los participantes frente a las actividades, metodologías y contenidos desarrollados en las estrategias de formación e innovación implementadas por la subdirección.',
        frequency: 'Anual',
        formula: '(Número de participantes satisfechos/ total de participantes) *100',
        unit: 'Porcentaje',
        support: 'Reporte del indicador',
        control: 'Mínimo',
        goal: 80,
        plannedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:80 },
        executedMonths: { Ene:0, Feb:0, Mar:0, Abr:0, May:0, Jun:0, Jul:0, Ago:0, Sep:0, Oct:0, Nov:0, Dic:0 },
        responsibleRole: 'Profesional de Formación 8.2 / Profesional  de Formación 5.2 / Profesional de  Innovación',
        responsibleName: 'Juliana Lesmes Alvarado\nDiana Maria Montero\nDiego Poveda',
        status: 'Planeado'
    }
];

const DEFAULT_EVENTS = [
    {
        id: 'evt-1',
        name: 'Encuentro Nacional de Innovadores Educativos 2026',
        date: '2026-06-15',
        time: '09:00',
        mode: 'Virtual',
        link: 'https://teams.microsoft.com/l/meetup-join/tpa-encuentro',
        desc: 'El evento insignia para compartir experiencias significativas sobre el uso de tecnologías emergentes, robótica educativa y pensamiento computacional en escuelas públicas de Colombia.'
    },
    {
        id: 'evt-2',
        name: 'Taller Práctico: Herramientas de IA en la Docencia',
        date: '2026-07-28',
        time: '14:00',
        mode: 'Presencial',
        link: 'Auditorio Principal - Sede Tecnologías para Aprender (Bogotá)',
        desc: 'Capacitación teórico-práctica interactiva para el diseño de prompts efectivos y uso de asistentes de IA adaptados al currículo escolar de primaria y secundaria.'
    },
    {
        id: 'evt-3',
        name: 'Webinar: Integración de la Metodología STEAM en el Aula',
        date: '2026-06-02',
        time: '16:00',
        mode: 'Virtual',
        link: 'https://youtube.com/live/tpa-webinar-steam',
        desc: 'Aprende cómo conectar Ciencias, Tecnología, Ingeniería, Arte y Matemáticas de forma integradora y dinámica utilizando recursos de bajo costo y proyectos prácticos.'
    }
];

const DEFAULT_NEWS = [
    {
        id: 'nws-1',
        title: "Computadores para Educar evoluciona a 'Tecnologías para Aprender'",
        tag: 'Institucional',
        date: '2026-05-10',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        content: 'Con un enfoque renovado enfocado en el desarrollo del pensamiento crítico, el pensamiento computacional, la inteligencia artificial aplicada y la robótica educativa, la Subdirección de Formación e Innovación lanza su plan de transformación digital "Tecnologías para Aprender".'
    },
    {
        id: 'nws-2',
        title: 'Con gran éxito finaliza la entrega de laboratorios en zonas rurales',
        tag: 'Innovación',
        date: '2026-05-18',
        img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
        content: 'Más de 35 sedes educativas rurales de zonas de difícil acceso cuentan a partir de hoy con modernos laboratorios de innovación equipados con kits de robótica, sensores de experimentación científica e impresoras 3D.'
    },
    {
        id: 'nws-3',
        title: 'Abiertas las postulaciones para la Certificación Nacional Docente STEAM 2026',
        tag: 'Formación',
        date: '2026-05-15',
        img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
        content: 'La Subdirección de Formación e Innovación anuncia la apertura de la convocatoria nacional para otorgar 1,500 becas del 100% en la certificación pedagógica STEAM, dirigida a docentes en servicio de instituciones públicas oficiales del país.'
    }
];

const DEFAULT_STRATEGIES = [
    {
        id: 'strat-1',
        name: 'Estrategia de Inteligencia Artificial (IA)',
        tag: 'Innovación',
        desc: 'Fomentar la adopción ética y creativa de herramientas de Inteligencia Artificial Generativa en los procesos educativos de los docentes de colegios públicos.',
        objectives: [
            'Capacitar a 1,500 docentes en diseño de prompts pedagógicos.',
            'Desarrollar guías orientadoras sobre el uso ético de la IA en el aula.',
            'Crear un asistente virtual de IA para apoyar a los docentes en planeación curricular.'
        ],
        status: 'En Ejecución',
        color: 'from-purple-500 to-indigo-600',
        icon: 'fa-brain'
    },
    {
        id: 'strat-2',
        name: 'Estrategia Escuela TIC Familia',
        tag: 'Formación',
        desc: 'Promover el uso de tecnologías digitales en padres de familia y cuidadores para mitigar los riesgos de la era digital y potenciar la educación compartida.',
        objectives: [
            'Formar a 1,300 padres de familia en competencias digitales básicas.',
            'Realizar talleres virtuales y presenciales sobre ciberseguridad familiar.',
            'Entregar cartillas digitales de prevención de riesgos en internet.'
        ],
        status: 'En Ejecución',
        color: 'from-rose-500 to-orange-500',
        icon: 'fa-house-laptop'
    },
    {
        id: 'strat-3',
        name: 'Estrategia STEM + Kit Maker',
        tag: 'Formación / Innovación',
        desc: 'Implementar experiencias de aprendizaje con enfoque STEM utilizando elementos electrónicos recuperados para desarrollar el pensamiento computacional.',
        objectives: [
            'Distribuir kits Maker y capacitar a docentes de 100 sedes priorizadas.',
            'Desarrollar 10 guías pedagógicas STEM orientadas al enfoque territorial.',
            'Realizar el Encuentro Nacional de Robótica Educativa y Kit Maker.'
        ],
        status: 'En Planeación',
        color: 'from-blue-500 to-cyan-500',
        icon: 'fa-robot'
    }
];

// --- APP STATE ---
let actions = [];
let indicators = [];
let events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS)) || DEFAULT_EVENTS;
let news = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWS)) || DEFAULT_NEWS;
let strategies = JSON.parse(localStorage.getItem(STORAGE_KEYS.STRATEGIES)) || DEFAULT_STRATEGIES;
let isAdmin = JSON.parse(localStorage.getItem(STORAGE_KEYS.IS_ADMIN)) || false;
let currentSubTab = 'resumen'; // 'resumen' or 'act-X'
let currentIndicatorTab = 'resumen'; // 'resumen' or 'ind-X'

// --- HELPER: Compute progress for a single action ---
function computeActionProgress(act) {
    const totalExecuted = MONTHS.reduce((s, m) => s + (Number(act.executedMonths[m]) || 0), 0);
    const pct = act.goal > 0 ? Math.min(100, Math.round((totalExecuted / act.goal) * 100)) : 0;
    return pct;
}

function computeActionStatus(act) {
    const totalExecuted = MONTHS.reduce((s, m) => s + (Number(act.executedMonths[m]) || 0), 0);
    if (totalExecuted === 0) return 'Planeado';
    if (totalExecuted >= act.goal) return 'Completado';
    return 'En Curso';
}

// --- HELPER: Compute progress for a single indicator ---
function computeIndicatorProgress(ind) {
    let targetMonths = 0;
    let totalPct = 0;
    MONTHS.forEach(m => {
        const target = Number(ind.plannedMonths[m]) || 0;
        if (target > 0) {
            targetMonths++;
            const exec = Number(ind.executedMonths[m]) || 0;
            // Since it's minimum, if exec >= target, we completed 100% for that month
            if (ind.control === 'Mínimo') {
                totalPct += exec >= target ? 100 : Math.round((exec / target) * 100);
            } else {
                totalPct += Math.round((exec / target) * 100);
            }
        }
    });
    return targetMonths > 0 ? Math.min(100, Math.round(totalPct / targetMonths)) : 0;
}

function computeIndicatorStatus(ind) {
    const totalExecuted = MONTHS.reduce((s, m) => s + (Number(ind.executedMonths[m]) || 0), 0);
    if (totalExecuted === 0) return 'Planeado';
    const progress = computeIndicatorProgress(ind);
    if (progress >= 100) return 'Completado';
    return 'En Curso';
}

// --- LOAD ACTIONS: Merge persisted executed data over defaults ---
function loadActions() {
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIONS));
    if (persisted) {
        // Merge persisted executedMonths into default actions (preserve structure but keep executions)
        return DEFAULT_ACTIONS.map(def => {
            const saved = persisted.find(p => p.id === def.id);
            if (saved && saved.executedMonths) {
                return { ...def, executedMonths: saved.executedMonths };
            }
            return { ...def };
        });
    }
    return DEFAULT_ACTIONS.map(d => ({ ...d }));
}

// ==============================================================================
// ☁️ FUNCIONES DE SINCRONIZACIÓN CON SUPABASE
// ==============================================================================
async function fetchFromSupabase(key) {
    if (!supabaseClient) return null;
    try {
        const { data, error } = await supabaseClient
            .from('dashboard_data')
            .select('data')
            .eq('key', key)
            .single();
        if (error) {
            // Error code PGRST116 means no row found (initial run)
            if (error.code !== 'PGRST116') console.warn(`Supabase fetch warning for ${key}:`, error.message);
            return null;
        }
        return data ? data.data : null;
    } catch (err) {
        console.warn(`Error conectando a Supabase para ${key}:`, err);
        return null;
    }
}

async function saveToSupabase(key, payload) {
    if (!supabaseClient) return;
    try {
        const { error } = await supabaseClient
            .from('dashboard_data')
            .upsert({
                key: key,
                data: payload,
                updated_at: new Date().toISOString()
            });
        if (error) console.error(`Error guardando en Supabase (${key}):`, error.message);
        else console.log(`☁️ Sincronizado en la nube: ${key}`);
    } catch (err) {
        console.error(`Error en petición a Supabase (${key}):`, err);
    }
}

// Sincronización inicial desde la nube al cargar la página
async function initCloudSync() {
    if (!supabaseClient) return;

    try {
        const [cloudActions, cloudIndicators, cloudEvents, cloudNews, cloudStrategies] = await Promise.all([
            fetchFromSupabase('actions'),
            fetchFromSupabase('indicators'),
            fetchFromSupabase('events'),
            fetchFromSupabase('news'),
            fetchFromSupabase('strategies')
        ]);

        let hasUpdates = false;

        if (cloudActions && Array.isArray(cloudActions)) {
            actions = DEFAULT_ACTIONS.map(def => {
                const saved = cloudActions.find(p => p.id === def.id);
                if (saved && saved.executedMonths) {
                    return { ...def, executedMonths: saved.executedMonths };
                }
                return { ...def };
            });
            localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(cloudActions));
            hasUpdates = true;
        } else {
            // Inicializar fila en Supabase con los datos base
            saveToSupabase('actions', actions.map(act => ({ id: act.id, executedMonths: act.executedMonths })));
        }

        if (cloudIndicators && Array.isArray(cloudIndicators)) {
            indicators = DEFAULT_INDICATORS.map(def => {
                const saved = cloudIndicators.find(p => p.id === def.id);
                if (saved && saved.executedMonths) {
                    return { ...def, executedMonths: saved.executedMonths };
                }
                return { ...def };
            });
            localStorage.setItem(STORAGE_KEYS.INDICATORS, JSON.stringify(cloudIndicators));
            hasUpdates = true;
        } else {
            saveToSupabase('indicators', indicators.map(ind => ({ id: ind.id, executedMonths: ind.executedMonths })));
        }

        if (cloudEvents && Array.isArray(cloudEvents)) {
            events = cloudEvents;
            localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
            hasUpdates = true;
        } else {
            saveToSupabase('events', events);
        }

        if (cloudNews && Array.isArray(cloudNews)) {
            news = cloudNews;
            localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
            hasUpdates = true;
        } else {
            saveToSupabase('news', news);
        }

        if (cloudStrategies && Array.isArray(cloudStrategies)) {
            strategies = cloudStrategies;
            localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies));
            hasUpdates = true;
        } else {
            saveToSupabase('strategies', strategies);
        }

        if (hasUpdates) {
            renderAllData();
            if (currentSubTab !== 'resumen') renderActionDetail(currentSubTab);
            if (currentIndicatorTab !== 'resumen') renderIndicatorDetail(currentIndicatorTab);
        }
    } catch (e) {
        console.warn('Error sincronizando datos iniciales de Supabase:', e);
    }
}

function saveActions() {
    // Only persist id + executedMonths to avoid stale data
    const toSave = actions.map(act => ({ id: act.id, executedMonths: act.executedMonths }));
    localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(toSave));
    saveToSupabase('actions', toSave);
}

// --- LOAD INDICATORS: Merge persisted executed data over defaults ---
function loadIndicators() {
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEYS.INDICATORS));
    if (persisted) {
        return DEFAULT_INDICATORS.map(def => {
            const saved = persisted.find(p => p.id === def.id);
            if (saved && saved.executedMonths) {
                return { ...def, executedMonths: saved.executedMonths };
            }
            return { ...def };
        });
    }
    return DEFAULT_INDICATORS.map(d => ({ ...d }));
}

function saveIndicators() {
    const toSave = indicators.map(ind => ({ id: ind.id, executedMonths: ind.executedMonths }));
    localStorage.setItem(STORAGE_KEYS.INDICATORS, JSON.stringify(toSave));
    saveToSupabase('indicators', toSave);
}

// --- INITIALIZER ---
document.addEventListener('DOMContentLoaded', () => {
    actions = loadActions();
    indicators = loadIndicators();

    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    if (!localStorage.getItem(STORAGE_KEYS.STRATEGIES)) localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies));
    if (!localStorage.getItem(STORAGE_KEYS.INDICATORS)) saveIndicators();

    // Apply theme
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }

    // Header date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', options);
    const headerSub = document.querySelector('header h2');
    if (headerSub) {
        headerSub.textContent = `Subdirección de Formación e Innovación • ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`;
    }

    updateAdminUI();
    renderSubIndicesMenu();
    renderAllData();
    switchSubTab('resumen');

    // Sincronizar automáticamente con Supabase si está configurado
    initCloudSync();

});


// --- RENDER ALL ---
function renderAllData() {
    renderKPIs();
    renderCharts();
    renderGeneralTable();
    renderEvents();
    renderNews();
    renderStrategies();
    renderIndicatorsTable();
}

// =============================================
// SUBÍNDICES DE NAVEGACIÓN EN LA BARRA LATERAL
// =============================================
function renderSubIndicesMenu() {
    const container = document.getElementById('sub-indices-menu');
    if (!container) return;

    const lineColors = {
        'Innovación': 'text-emerald-500',
        'Formación': 'text-brand-500'
    };

    let html = '';

    actions.forEach((act, idx) => {
        const colorCls = lineColors[act.line] || 'text-brand-500';
        const dotColor = act.line === 'Innovación' ? 'bg-emerald-500' : 'bg-brand-500';
        html += `
            <button onclick="switchSubTab('${act.id}')" id="btn-sub-${act.id}"
                class="sub-tab-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-left">
                <span class="w-2 h-2 rounded-full flex-shrink-0 ${dotColor}"></span>
                <span class="truncate leading-tight">${idx + 1}. ${act.name}</span>
            </button>
        `;
    });

    container.innerHTML = html;
}

// =============================================
// CAMBIO DE SUB-TAB (RESUMEN vs DETALLE)
// =============================================
function switchSubTab(subTabId) {
    currentSubTab = subTabId;

    const resumenContainer = document.getElementById('tablero-resumen');
    const detalleContainer = document.getElementById('tablero-detalle');

    // Update sidebar button highlights
    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
        btn.classList.remove('sub-tab-active', 'bg-brand-50', 'dark:bg-brand-950/20', 'text-brand-600', 'dark:text-brand-400', 'font-semibold');
    });

    const activeBtn = document.getElementById(`btn-sub-${subTabId}`);
    if (activeBtn) {
        activeBtn.classList.add('sub-tab-active', 'bg-brand-50', 'dark:bg-brand-950/20', 'text-brand-600', 'dark:text-brand-400', 'font-semibold');
    }

    if (subTabId === 'resumen') {
        resumenContainer.classList.remove('hidden');
        resumenContainer.classList.add('active-view');
        detalleContainer.classList.add('hidden');
        detalleContainer.classList.remove('active-view');
        document.getElementById('header-title').textContent = 'Plan de Acción — Resumen General';
    } else {
        resumenContainer.classList.add('hidden');
        resumenContainer.classList.remove('active-view');
        detalleContainer.classList.remove('hidden');
        detalleContainer.classList.add('active-view');
        renderActionDetail(subTabId);
        const act = actions.find(a => a.id === subTabId);
        if (act) document.getElementById('header-title').textContent = `Plan de Acción — ${act.name}`;
    }

    // Close mobile sidebar
    document.body.classList.remove('sidebar-open');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('-translate-x-full');
}

// =============================================
// FICHA TÉCNICA DE ACCIÓN (DETAIL VIEW)
// =============================================
function renderActionDetail(actionId) {
    const act = actions.find(a => a.id === actionId);
    const container = document.getElementById('tablero-detalle');
    if (!act || !container) return;

    const progress = computeActionProgress(act);
    const status = computeActionStatus(act);

    const lineBadgeClass = act.line === 'Innovación'
        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
        : 'bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800';
    const lineIcon = act.line === 'Innovación' ? 'fa-lightbulb' : 'fa-graduation-cap';

    const statusColors = {
        'Planeado': 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        'En Curso': 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 animate-pulse',
        'Completado': 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
    };
    const statusBadge = statusColors[status] || statusColors['Planeado'];

    // Progress ring math (r=36 → circumference = 226.2)
    const circ = 226.2;
    const progressOffset = circ - (circ * progress / 100);
    const progressColor = progress === 100 ? '#10b981' : progress > 50 ? '#6366f1' : '#f59e0b';

    // Team members
    const names = (act.responsibleName || '').split(/\n|\//).map(n => n.trim()).filter(n => n.length > 0);
    const roles = (act.responsibleRole || '').split(/\n|\//).map(r => r.trim()).filter(r => r.length > 0);
    const avatarColors = ['from-brand-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600', 'from-pink-500 to-rose-600', 'from-cyan-500 to-blue-600'];

    let teamHTML = names.map((name, i) => {
        const initials = name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
        const colorGrad = avatarColors[i % avatarColors.length];
        const role = roles[i] || roles[roles.length - 1] || 'Responsable';
        return `
            <div class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${colorGrad} text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-md">${initials}</div>
                <div class="overflow-hidden">
                    <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">${name.trim()}</p>
                    <p class="text-[10px] text-slate-400 truncate">${role}</p>
                </div>
            </div>
        `;
    }).join('');
    if (!teamHTML) {
        teamHTML = `<p class="text-xs text-slate-400 col-span-full">No se registraron responsables para esta acción.</p>`;
    }

    // Monthly grid
    const monthlyGridHTML = buildMonthlyGrid(act, isAdmin);

    // Total executed
    const totalExecuted = MONTHS.reduce((s, m) => s + (Number(act.executedMonths[m]) || 0), 0);

    container.innerHTML = `
        <div class="space-y-6 animate-fadeIn">

            <!-- BACK BUTTON -->
            <button onclick="switchSubTab('resumen')" class="flex items-center space-x-2 text-sm text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors font-medium group">
                <i class="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200"></i>
                <span>Volver al Resumen General</span>
            </button>

            <!-- HEADER DE LA ACCIÓN -->
            <div class="glass-card p-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div class="space-y-2 flex-1">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">${act.code}</span>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${lineBadgeClass}">
                                <i class="fa-solid ${lineIcon} mr-1"></i>${act.line}
                            </span>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${statusBadge}">${status}</span>
                        </div>
                        <h2 class="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">${act.name}</h2>
                    </div>
                </div>
            </div>

            <!-- KPI CARDS ROW -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">

                <!-- META GIGANTE -->
                <div class="glass-card p-6 flex flex-col justify-between sm:col-span-1 relative overflow-hidden group">
                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Meta Anual</span>
                    <div class="flex-1 flex flex-col items-center justify-center py-4">
                        <span class="text-5xl md:text-6xl font-black bg-gradient-to-br from-brand-500 to-indigo-400 bg-clip-text text-transparent tracking-tighter leading-none">${act.goal.toLocaleString('es-CO')}</span>
                        <span class="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 text-center leading-tight">${act.unit}</span>
                    </div>
                    <div class="absolute -right-3 -bottom-3 text-brand-500/[0.05] dark:text-brand-400/[0.06] text-8xl font-black pointer-events-none select-none">★</div>
                </div>

                <!-- PROGRESO CIRCULAR -->
                <div class="glass-card p-6 flex flex-col items-center justify-center sm:col-span-1 relative">
                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Avance Actual</span>
                    <div class="relative w-28 h-28">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="36" fill="transparent" stroke="rgba(226,232,240,0.15)" stroke-width="7"/>
                            <circle cx="40" cy="40" r="36" fill="transparent" stroke="${progressColor}" stroke-width="7"
                                stroke-dasharray="${circ}" stroke-dashoffset="${progressOffset}"
                                stroke-linecap="round" class="transition-all duration-1000 ease-out"/>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-2xl font-black text-slate-800 dark:text-slate-100">${progress}%</span>
                        </div>
                    </div>
                    <div class="mt-3 text-center">
                        <p class="text-xs text-slate-500"><span class="font-bold text-slate-700 dark:text-slate-200">${totalExecuted.toLocaleString('es-CO')}</span> / ${act.goal.toLocaleString('es-CO')} ${act.unit}</p>
                    </div>
                </div>

                <!-- SOPORTE REQUERIDO -->
                <div class="glass-card p-6 flex flex-col justify-between sm:col-span-1">
                    <div class="flex items-center space-x-2 mb-3">
                        <div class="p-2 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 rounded-lg">
                            <i class="fa-solid fa-file-circle-check text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Soporte Requerido</span>
                    </div>
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed flex-1">${act.support}</p>
                    <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                        <p class="text-[10px] text-slate-400">Evidencia física o digital que valida el cumplimiento de esta acción ante la entidad.</p>
                    </div>
                </div>
            </div>

            <!-- DESCRIPCIÓN DE LA ACTIVIDAD -->
            <div class="glass-card p-6">
                <div class="flex items-center space-x-3 mb-4">
                    <div class="p-2.5 bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 rounded-xl">
                        <i class="fa-solid fa-file-lines text-lg"></i>
                    </div>
                    <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Descripción de la Actividad</h3>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${act.description}</p>
            </div>

            <!-- GRILLA MENSUAL PLANIFICADO VS EJECUTADO -->
            <div class="glass-card p-6" id="monthly-grid-card-${act.id}">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="p-2.5 bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-500 rounded-xl">
                            <i class="fa-solid fa-calendar-check text-lg"></i>
                        </div>
                        <div>
                            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Seguimiento Mensual</h3>
                            <p class="text-[10px] text-slate-400 mt-0.5">Planificado según el Excel vs. Ejecutado real</p>
                        </div>
                    </div>
                    ${isAdmin ? `
                    <button onclick="saveMonthlyExecution('${act.id}')"
                        class="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex-shrink-0">
                        <i class="fa-solid fa-floppy-disk text-xs"></i>
                        <span>Guardar Ejecución</span>
                    </button>` : ''}
                </div>
                ${monthlyGridHTML}
                ${isAdmin ? `
                <p class="mt-3 text-[10px] text-slate-400 flex items-center space-x-1">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>Modo Administrador: edita los valores de la fila "Ejecutado" y haz clic en "Guardar Ejecución".</span>
                </p>` : `
                <p class="mt-3 text-[10px] text-slate-400 flex items-center space-x-1">
                    <i class="fa-solid fa-lock"></i>
                    <span>Inicia sesión como Administrador para registrar los logros mensuales.</span>
                </p>`}
            </div>

            <!-- EQUIPO RESPONSABLE -->
            <div class="glass-card p-6">
                <div class="flex items-center space-x-3 mb-5">
                    <div class="p-2.5 bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 rounded-xl">
                        <i class="fa-solid fa-users text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Equipo Responsable</h3>
                        <p class="text-[10px] text-slate-400 mt-0.5">${act.responsibleRole}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${teamHTML}
                </div>
            </div>

        </div>
    `;
}

// =============================================
// GRILLA MENSUAL (HTML Builder)
// =============================================
function buildMonthlyGrid(act, adminMode) {
    const months = MONTHS;
    const fullMonths = MONTHS_FULL;

    // Headers
    let headersHTML = `<th class="py-2 px-1 text-left text-[10px] font-bold tracking-wider text-slate-400 uppercase w-24 sticky left-0 bg-white dark:bg-slate-900">Indicador</th>`;
    months.forEach((m, i) => {
        headersHTML += `<th class="py-2 px-1 text-center text-[10px] font-bold tracking-wider text-slate-400 uppercase min-w-[60px]" title="${fullMonths[i]}">${m}</th>`;
    });
    headersHTML += `<th class="py-2 px-1 text-center text-[10px] font-bold tracking-wider text-slate-400 uppercase min-w-[60px]">Total</th>`;

    // Planificado row
    let plannedHTML = `<td class="py-3 px-2 text-xs font-bold text-slate-600 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900">
        <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
            <span>Planificado</span>
        </div>
    </td>`;
    let totalPlanned = 0;
    months.forEach(m => {
        const val = act.plannedMonths[m] || 0;
        totalPlanned += val;
        const hasPlan = val > 0;
        plannedHTML += `<td class="py-3 px-1 text-center">
            <span class="inline-block px-2 py-1 rounded-lg text-xs font-bold ${hasPlan ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300' : 'text-slate-300 dark:text-slate-600'}">
                ${hasPlan ? val.toLocaleString('es-CO') : '—'}
            </span>
        </td>`;
    });
    plannedHTML += `<td class="py-3 px-1 text-center"><span class="inline-block px-2 py-1 rounded-lg text-xs font-bold bg-brand-500 text-white">${totalPlanned.toLocaleString('es-CO')}</span></td>`;

    // Ejecutado row
    let executedHTML = `<td class="py-3 px-2 text-xs font-bold text-slate-600 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900">
        <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
            <span>Ejecutado</span>
        </div>
    </td>`;
    let totalExecuted = 0;
    months.forEach(m => {
        const val = Number(act.executedMonths[m]) || 0;
        totalExecuted += val;
        const planned = act.plannedMonths[m] || 0;
        const metOrExceeded = val >= planned && planned > 0;
        const hasExec = val > 0;

        if (adminMode) {
            executedHTML += `<td class="py-2 px-1 text-center">
                <input type="number" id="exec-${act.id}-${m}" value="${val}" min="0"
                    class="w-14 text-center text-xs font-bold py-1.5 px-1 rounded-lg border-2 ${metOrExceeded ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}
                    focus:outline-none focus:border-brand-500 transition-colors">
            </td>`;
        } else {
            const cellClass = hasExec
                ? (metOrExceeded ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300')
                : 'text-slate-300 dark:text-slate-600';
            executedHTML += `<td class="py-3 px-1 text-center">
                <span class="inline-block px-2 py-1 rounded-lg text-xs font-bold ${cellClass}">
                    ${hasExec ? val.toLocaleString('es-CO') : '—'}
                </span>
            </td>`;
        }
    });

    const execTotalClass = totalExecuted >= totalPlanned && totalPlanned > 0 ? 'bg-emerald-500' : totalExecuted > 0 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600';
    executedHTML += `<td class="py-3 px-1 text-center"><span class="inline-block px-2 py-1 rounded-lg text-xs font-bold ${execTotalClass} text-white">${totalExecuted.toLocaleString('es-CO')}</span></td>`;

    // Difference row (planned - executed per month)
    let diffHTML = `<td class="py-3 px-2 text-xs font-bold text-slate-600 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900">
        <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0"></span>
            <span>Pendiente</span>
        </div>
    </td>`;
    let totalPending = 0;
    months.forEach(m => {
        const planned = act.plannedMonths[m] || 0;
        const exec = Number(act.executedMonths[m]) || 0;
        const diff = Math.max(0, planned - exec);
        totalPending += diff;
        diffHTML += `<td class="py-3 px-1 text-center">
            <span class="inline-block text-xs font-medium ${diff > 0 ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-600'}">
                ${planned > 0 ? (diff > 0 ? diff.toLocaleString('es-CO') : '✓') : '—'}
            </span>
        </td>`;
    });
    diffHTML += `<td class="py-3 px-1 text-center"><span class="inline-block text-xs font-bold text-slate-500 dark:text-slate-400">${totalPending.toLocaleString('es-CO')}</span></td>`;

    return `
        <div class="overflow-x-auto -mx-2 px-2">
            <table class="w-full border-collapse min-w-max">
                <thead>
                    <tr class="border-b border-slate-150 dark:border-slate-700/50">${headersHTML}</tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
                    <tr>${plannedHTML}</tr>
                    <tr>${executedHTML}</tr>
                    <tr>${diffHTML}</tr>
                </tbody>
            </table>
        </div>
    `;
}

// =============================================
// GUARDAR EJECUCIÓN MENSUAL
// =============================================
function saveMonthlyExecution(actionId) {
    const act = actions.find(a => a.id === actionId);
    if (!act) return;

    let changed = false;
    MONTHS.forEach(m => {
        const input = document.getElementById(`exec-${actionId}-${m}`);
        if (input) {
            const newVal = Math.max(0, parseInt(input.value) || 0);
            if (newVal !== act.executedMonths[m]) {
                act.executedMonths[m] = newVal;
                changed = true;
            }
        }
    });

    if (changed) {
        saveActions();
        // Show save feedback
        showSaveFeedback(actionId);
        // Re-render the global charts and KPIs
        renderKPIs();
        renderCharts();
        renderGeneralTable();
        // Re-render sub-indices menu to update dots
        renderSubIndicesMenu();
        // Mark active btn again
        const activeBtn = document.getElementById(`btn-sub-${actionId}`);
        if (activeBtn) {
            activeBtn.classList.add('sub-tab-active', 'bg-brand-50', 'dark:bg-brand-950/20', 'text-brand-600', 'dark:text-brand-400', 'font-semibold');
        }
        // Re-render detail to update progress ring
        renderActionDetail(actionId);
    }
}

function showSaveFeedback(actionId) {
    // Toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 bg-emerald-600 text-white rounded-2xl shadow-2xl shadow-emerald-500/30 text-sm font-semibold transition-all duration-300 opacity-0 translate-y-4';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-lg"></i><span>¡Ejecución guardada exitosamente!</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('opacity-0', 'translate-y-4');
    });
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// KPI RENDERING (Updated for new data model)
// =============================================
function renderKPIs() {
    if (actions.length === 0) return;

    const totalActions = actions.length;
    const progressList = actions.map(a => computeActionProgress(a));
    const completedActions = progressList.filter(p => p === 100).length;

    animateNumber('kpi-acciones-totales', totalActions);
    const compEl = document.getElementById('kpi-acciones-completas');
    if (compEl) compEl.textContent = `${completedActions} completadas`;

    // KPI Meta Eventos: FE_09
    const eventosAct = actions.find(a => a.code === 'FE_09');
    if (eventosAct) {
        animateNumber('kpi-eventos-totales', eventosAct.goal);
        const totalExecutedEvents = MONTHS.reduce((s, m) => s + (Number(eventosAct.executedMonths[m]) || 0), 0);
        const kpiEventosEjecutados = document.getElementById('kpi-eventos-ejecutados');
        if (kpiEventosEjecutados) kpiEventosEjecutados.textContent = `${totalExecutedEvents} ejecutados`;
    }

    // KPI CI Nuevos: FE_04
    const ciAct4 = actions.find(a => a.code === 'FE_04');
    if (ciAct4) {
        const kpiCI4 = document.getElementById('kpi-ci-nuevos');
        if (kpiCI4) kpiCI4.textContent = ciAct4.goal.toLocaleString('es-CO');
        const totalExecutedCI4 = MONTHS.reduce((s, m) => s + (Number(ciAct4.executedMonths[m]) || 0), 0);
        const kpiCI4Ejecutados = document.getElementById('kpi-ci-nuevos-ejecutados');
        if (kpiCI4Ejecutados) kpiCI4Ejecutados.textContent = `${totalExecutedCI4.toLocaleString('es-CO')} creados`;
    }

    // KPI CI Fortalecidos: FE_05
    const ciAct5 = actions.find(a => a.code === 'FE_05');
    if (ciAct5) {
        const kpiCI5 = document.getElementById('kpi-ci-fortalecidos');
        if (kpiCI5) kpiCI5.textContent = ciAct5.goal.toLocaleString('es-CO');
        const totalExecutedCI5 = MONTHS.reduce((s, m) => s + (Number(ciAct5.executedMonths[m]) || 0), 0);
        const kpiCI5Ejecutados = document.getElementById('kpi-ci-fortalecidos-ejecutados');
        if (kpiCI5Ejecutados) kpiCI5Ejecutados.textContent = `${totalExecutedCI5.toLocaleString('es-CO')} acompañados`;
    }

    // KPI Meta Docentes: FE_03
    const docentesAct = actions.find(a => a.code === 'FE_03');
    if (docentesAct) {
        const kpiDocentes = document.getElementById('kpi-docentes');
        if (kpiDocentes) kpiDocentes.textContent = docentesAct.goal.toLocaleString('es-CO');
        const totalExecutedDocentes = MONTHS.reduce((s, m) => s + (Number(docentesAct.executedMonths[m]) || 0), 0);
        const kpiDocentesEjecutados = document.getElementById('kpi-docentes-ejecutados');
        if (kpiDocentesEjecutados) kpiDocentesEjecutados.textContent = `${totalExecutedDocentes.toLocaleString('es-CO')} formados`;
    }

    // KPI Meta Estudiantes: FE_08
    const estudiantesAct = actions.find(a => a.code === 'FE_08');
    if (estudiantesAct) {
        const kpiEstudiantes = document.getElementById('kpi-estudiantes');
        if (kpiEstudiantes) kpiEstudiantes.textContent = estudiantesAct.goal.toLocaleString('es-CO');
        const totalExecutedEstudiantes = MONTHS.reduce((s, m) => s + (Number(estudiantesAct.executedMonths[m]) || 0), 0);
        const kpiEstudiantesEjecutados = document.getElementById('kpi-estudiantes-ejecutados');
        if (kpiEstudiantesEjecutados) kpiEstudiantesEjecutados.textContent = `${totalExecutedEstudiantes.toLocaleString('es-CO')} formados`;
    }

    // KPI Meta Familia: FE_07
    const familiaAct = actions.find(a => a.code === 'FE_07');
    if (familiaAct) {
        const kpiFamilia = document.getElementById('kpi-familia');
        if (kpiFamilia) kpiFamilia.textContent = familiaAct.goal.toLocaleString('es-CO');
        const totalExecutedFamilia = MONTHS.reduce((s, m) => s + (Number(familiaAct.executedMonths[m]) || 0), 0);
        const kpiFamiliaEjecutados = document.getElementById('kpi-familia-ejecutados');
        if (kpiFamiliaEjecutados) kpiFamiliaEjecutados.textContent = `${totalExecutedFamilia.toLocaleString('es-CO')} capacitados`;
    }

    // KPI Iniciativas Escolares: FE_10
    const iniciativasAct = actions.find(a => a.code === 'FE_10');
    if (iniciativasAct) {
        const kpiIniciativas = document.getElementById('kpi-iniciativas');
        if (kpiIniciativas) kpiIniciativas.textContent = iniciativasAct.goal.toLocaleString('es-CO');
        const totalExecutedIniciativas = MONTHS.reduce((s, m) => s + (Number(iniciativasAct.executedMonths[m]) || 0), 0);
        const kpiIniciativasEjecutados = document.getElementById('kpi-iniciativas-ejecutados');
        if (kpiIniciativasEjecutados) kpiIniciativasEjecutados.textContent = `${totalExecutedIniciativas.toLocaleString('es-CO')} integradas`;
    }
}


// =============================================
// CHARTS RENDERING
// =============================================
function renderCharts() {
    const globalAvg = actions.length > 0 ? Math.round(actions.reduce((s, a) => s + computeActionProgress(a), 0) / actions.length) : 0;

    const needle = document.getElementById('chart-gauge-needle');
    if (needle) {
        needle.style.transform = `rotate(${(180 * globalAvg) / 100}deg)`;
    }

    const gaugeValue = document.getElementById('gauge-value');
    if (gaugeValue) {
        animateNumber('gauge-value', globalAvg, '%');
    }

    // Horizontal bar chart — all 9 actions
    const barContainer = document.getElementById('bar-chart-container');
    if (!barContainer) return;

    if (actions.length === 0) {
        barContainer.innerHTML = `<div class="text-center text-slate-400 py-10">Sin datos de acciones.</div>`;
        return;
    }

    let barsHTML = '';
    actions.forEach(act => {
        const prog = computeActionProgress(act);
        const lineColors = act.line === 'Formación' ? 'from-brand-500 to-indigo-500' : 'from-emerald-500 to-teal-400';
        const lineBadge = act.line === 'Formación' ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400';
        const barWidth = prog > 0 ? prog : 0;

        barsHTML += `
            <div class="space-y-1.5 group cursor-pointer" onclick="switchSubTab('${act.id}')" title="Ver detalle: ${act.name}">
                <div class="flex items-center justify-between text-xs font-semibold">
                    <div class="flex items-center space-x-2 truncate pr-4 max-w-[80%]">
                        <span class="px-2 py-0.5 rounded text-[9px] font-bold flex-shrink-0 ${lineBadge}">${act.line === 'Formación' ? 'Form.' : 'Innov.'}</span>
                        <span class="truncate text-slate-700 dark:text-slate-200 group-hover:text-brand-500 transition-colors">${act.name}</span>
                    </div>
                    <span class="font-bold text-slate-800 dark:text-slate-100 flex-shrink-0">${prog}%</span>
                </div>
                <div class="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r ${lineColors} rounded-full transition-all duration-1000 ease-out" style="width: ${barWidth}%"></div>
                </div>
            </div>
        `;
    });

    barContainer.innerHTML = barsHTML;
}

// =============================================
// GENERAL TABLE RENDERING
// =============================================
function renderGeneralTable(filteredList = null) {
    const tableBody = document.getElementById('actions-table-body');
    if (!tableBody) return;

    const listToRender = filteredList || actions;

    if (listToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-400"><i class="fa-solid fa-folder-open text-3xl mb-2 block"></i>No se encontraron acciones.</td></tr>`;
        return;
    }

    let rowsHTML = '';
    listToRender.forEach(act => {
        const progress = computeActionProgress(act);
        const status = computeActionStatus(act);

        const lineBadge = act.line === 'Formación'
            ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50'
            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50';

        let statusBadge = '';
        if (status === 'Planeado') statusBadge = 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
        else if (status === 'En Curso') statusBadge = 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 animate-pulse';
        else if (status === 'Completado') statusBadge = 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50';

        const totalExec = MONTHS.reduce((s, m) => s + (Number(act.executedMonths[m]) || 0), 0);
        const goalText = `${totalExec.toLocaleString('es-CO')} / ${act.goal.toLocaleString('es-CO')} ${act.unit}`;

        rowsHTML += `
            <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group cursor-pointer" onclick="switchSubTab('${act.id}')">
                <td class="py-4 px-4 max-w-sm">
                    <h5 class="font-semibold text-slate-800 dark:text-slate-100 tracking-tight leading-snug truncate group-hover:text-brand-500 transition-colors" title="${act.name}">${act.name}</h5>
                    <span class="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${lineBadge}">${act.line}</span>
                </td>
                <td class="py-4 px-4 w-40">
                    <div class="flex items-center space-x-2">
                        <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-brand-500 rounded-full transition-all duration-700" style="width: ${progress}%"></div>
                        </div>
                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[32px] text-right">${progress}%</span>
                    </div>
                </td>
                <td class="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-300 max-w-[150px] truncate" title="${goalText}">${goalText}</td>
                <td class="py-4 px-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${statusBadge}">${status}</span>
                </td>
                <td class="py-4 px-4 text-right whitespace-nowrap">
                    <button onclick="event.stopPropagation(); switchSubTab('${act.id}')" class="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:hover:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-lg transition-all">
                        Ver detalle <i class="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rowsHTML;
}

// --- FILTER ACTIONS ENGINE ---
function filterActions() {
    const query = (document.getElementById('filter-search') || {}).value?.toLowerCase() || '';
    const line = (document.getElementById('filter-line') || {}).value || 'todos';
    const status = (document.getElementById('filter-status') || {}).value || 'todos';

    const filtered = actions.filter(act => {
        const computedStatus = computeActionStatus(act);
        const matchesQuery = act.name.toLowerCase().includes(query) || act.unit.toLowerCase().includes(query);
        const matchesLine = line === 'todos' || act.line === line;
        const matchesStatus = status === 'todos' || computedStatus === status;
        return matchesQuery && matchesLine && matchesStatus;
    });

    renderGeneralTable(filtered);
}

// =============================================
// EVENTS RENDERING
// =============================================
function renderEvents() {
    const grid = document.getElementById('events-grid');
    if (!grid) return;

    if (events.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-slate-400"><i class="fa-solid fa-calendar-xmark text-4xl mb-3 block"></i>No hay eventos programados.</div>`;
        return;
    }

    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    let cardsHTML = '';
    sortedEvents.forEach(evt => {
        const eventDateObj = new Date(evt.date + 'T00:00:00');
        const day = eventDateObj.getDate();
        const month = eventDateObj.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '').toUpperCase();

        const modeBadge = evt.mode === 'Virtual'
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50'
            : 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50';

        const modeIcon = evt.mode === 'Virtual' ? '<i class="fa-solid fa-video text-xs mr-1"></i>' : '<i class="fa-solid fa-location-dot text-xs mr-1"></i>';

        cardsHTML += `
            <div class="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
                <div class="space-y-4">
                    <div class="flex justify-between items-start">
                        <div class="flex items-center space-x-3">
                            <div class="flex flex-col items-center justify-center w-12 h-14 bg-brand-500/10 text-brand-500 dark:bg-brand-500/20 dark:text-brand-400 rounded-xl font-bold border border-brand-500/20">
                                <span class="text-xs leading-none uppercase text-brand-500/70 font-extrabold">${month}</span>
                                <span class="text-xl leading-none tracking-tighter mt-1">${day}</span>
                            </div>
                            <div class="text-xs font-semibold text-slate-400">
                                <div><i class="fa-solid fa-clock text-[10px] mr-1"></i>${evt.time} hs</div>
                                <div class="mt-0.5">${evt.mode}</div>
                            </div>
                        </div>
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${modeBadge}">${modeIcon}${evt.mode}</span>
                    </div>
                    <div class="space-y-2">
                        <h4 class="font-extrabold text-slate-800 dark:text-slate-100 text-base leading-snug tracking-tight group-hover:text-brand-500 transition-colors duration-200">${evt.name}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">${evt.desc}</p>
                    </div>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                    ${evt.mode === 'Virtual'
                        ? `<a href="${evt.link}" target="_blank" class="text-xs font-bold text-brand-500 hover:text-brand-700 dark:hover:text-brand-400 flex items-center space-x-1"><i class="fa-solid fa-right-to-bracket mr-1"></i>Conectarse al Evento</a>`
                        : `<span class="text-xs font-medium text-slate-400 truncate max-w-[170px]" title="${evt.link}"><i class="fa-solid fa-location-arrow mr-1"></i>${evt.link}</span>`
                    }
                    <div class="flex items-center space-x-1" style="${isAdmin ? 'display: flex;' : 'display: none;'}">
                        <button onclick="editEvent('${evt.id}')" class="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all" title="Editar"><i class="fa-solid fa-pen text-xs"></i></button>
                        <button onclick="deleteEvent('${evt.id}')" class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all" title="Eliminar"><i class="fa-solid fa-trash text-xs"></i></button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = cardsHTML;
}

// =============================================
// NEWS RENDERING
// =============================================
function renderNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    if (news.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-slate-400"><i class="fa-solid fa-newspaper text-4xl mb-3 block"></i>No hay noticias publicadas.</div>`;
        return;
    }

    const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));

    let cardsHTML = '';
    sortedNews.forEach(nws => {
        const newsDateObj = new Date(nws.date + 'T00:00:00');
        const formattedDate = newsDateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

        cardsHTML += `
            <div class="glass-card overflow-hidden group flex flex-col justify-between h-[450px]">
                <div class="h-48 overflow-hidden relative flex-shrink-0">
                    <img src="${nws.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}" alt="${nws.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                    <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded-lg bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-lg shadow-brand-500/20">${nws.tag}</span>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div class="space-y-2">
                        <div class="text-[10px] font-bold text-slate-400 flex items-center space-x-1.5">
                            <i class="fa-solid fa-calendar text-[9px]"></i>
                            <span>${formattedDate.toUpperCase()}</span>
                        </div>
                        <h4 class="font-extrabold text-slate-800 dark:text-slate-100 text-base leading-snug tracking-tight line-clamp-2 group-hover:text-brand-500 transition-colors duration-200" title="${nws.title}">${nws.title}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">${nws.content}</p>
                    </div>
                    <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                        <button onclick="readNewsDetail('${nws.id}')" class="text-xs font-bold text-brand-500 hover:text-brand-700 dark:hover:text-brand-400 flex items-center">
                            Leer Más <i class="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                        </button>
                        <div class="flex items-center space-x-1" style="${isAdmin ? 'display: flex;' : 'display: none;'}">
                            <button onclick="editNews('${nws.id}')" class="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all" title="Editar"><i class="fa-solid fa-pen text-xs"></i></button>
                            <button onclick="deleteNews('${nws.id}')" class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all" title="Eliminar"><i class="fa-solid fa-trash text-xs"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = cardsHTML;
}

// =============================================
// ADMIN SYSTEM
// =============================================
function openLoginModal() {
    document.getElementById('modal-login').classList.add('active');
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}

function closeLoginModal() {
    document.getElementById('modal-login').classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    if (user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
        isAdmin = true;
        localStorage.setItem(STORAGE_KEYS.IS_ADMIN, JSON.stringify(true));
        updateAdminUI();
        closeLoginModal();
        // If on a detail view, re-render to unlock fields
        if (currentSubTab !== 'resumen') {
            renderActionDetail(currentSubTab);
        } else {
            renderAllData();
        }
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

function logout() {
    isAdmin = false;
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, JSON.stringify(false));
    updateAdminUI();
    if (currentSubTab !== 'resumen') {
        renderActionDetail(currentSubTab);
    } else {
        renderAllData();
    }
}

function updateAdminUI() {
    const badge = document.getElementById('admin-badge');
    const loggedOutSection = document.getElementById('logged-out-user');
    const loggedInSection = document.getElementById('logged-in-user');
    const adminActionsMenu = document.getElementById('admin-actions-menu');

    const btnAddEvt = document.getElementById('btn-add-evento');
    const btnAddNws = document.getElementById('btn-add-noticia');
    const btnAddStrat = document.getElementById('btn-add-estrategia');

    if (isAdmin) {
        if (badge) { badge.classList.remove('hidden'); badge.classList.add('flex'); }
        if (loggedOutSection) loggedOutSection.classList.add('hidden');
        if (loggedInSection) loggedInSection.classList.remove('hidden');
        if (adminActionsMenu) adminActionsMenu.classList.remove('hidden');
        if (btnAddEvt) { btnAddEvt.classList.remove('hidden'); btnAddEvt.classList.add('flex'); }
        if (btnAddNws) { btnAddNws.classList.remove('hidden'); btnAddNws.classList.add('flex'); }
        if (btnAddStrat) { btnAddStrat.classList.remove('hidden'); btnAddStrat.classList.add('flex'); }
    } else {
        if (badge) { badge.classList.add('hidden'); badge.classList.remove('flex'); }
        if (loggedOutSection) loggedOutSection.classList.remove('hidden');
        if (loggedInSection) loggedInSection.classList.add('hidden');
        if (adminActionsMenu) adminActionsMenu.classList.add('hidden');
        if (btnAddEvt) btnAddEvt.classList.add('hidden');
        if (btnAddNws) btnAddNws.classList.add('hidden');
        if (btnAddStrat) btnAddStrat.classList.add('hidden');
    }
}

// =============================================
// TAB SWITCHING (main tabs)
// =============================================
function togglePlanAccionMenu() {
    const planWrapper = document.getElementById('plan-accion-wrapper');
    const isTableroActive = !document.getElementById('view-tablero').classList.contains('hidden');
    
    if (planWrapper) {
        if (isTableroActive) {
            if (currentSubTab !== 'resumen') {
                // Si estamos viendo una acción, al hacer clic volvemos al Resumen General y colapsamos
                switchSubTab('resumen');
                planWrapper.classList.remove('submenu-open');
            } else {
                // Si ya estamos en el Resumen General, simplemente alternamos el submenú
                planWrapper.classList.toggle('submenu-open');
            }
        } else {
            // Si no estamos en el tablero (e.g. en Eventos/Noticias), nos lleva al Resumen General y abre el submenú
            switchSubTab('resumen');
            planWrapper.classList.add('submenu-open');
            switchTab('tablero');
        }
    } else {
        switchTab('tablero');
    }
}

function goToSummary() {
    switchSubTab('resumen');
    switchTab('tablero');
    const planWrapper = document.getElementById('plan-accion-wrapper');
    if (planWrapper) planWrapper.classList.remove('submenu-open');
}

function switchTab(tabName) {
    const views = ['tablero', 'eventos', 'noticias', 'estrategias', 'indicadores'];
    views.forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) { el.classList.add('hidden'); el.classList.remove('active-view'); }
        const btn = document.getElementById(`btn-${v}`);
        if (btn) btn.classList.remove('btn-active');
    });

    const target = document.getElementById(`view-${tabName}`);
    const btnTarget = document.getElementById(`btn-${tabName}`);
    if (target) { target.classList.remove('hidden'); target.classList.add('active-view'); }
    if (btnTarget) btnTarget.classList.add('btn-active');

    const titles = { 
        tablero: 'Plan de Acción — Avances', 
        eventos: 'Agenda de Eventos', 
        noticias: 'Noticias e Hitos',
        estrategias: 'Estrategias de Formación e Innovación',
        indicadores: 'Indicadores de Gestión 2026'
    };
    const headerTitle = document.getElementById('header-title');
    if (headerTitle) headerTitle.textContent = titles[tabName] || '';

    // Mantener el submenú abierto cuando el tab tablero está activo
    const planWrapper = document.getElementById('plan-accion-wrapper');
    if (planWrapper) {
        if (tabName === 'tablero') {
            planWrapper.classList.add('submenu-open');
        } else {
            planWrapper.classList.remove('submenu-open');
        }
    }

    // When switching back to tablero, show the last active subtab
    if (tabName === 'tablero') {
        switchSubTab(currentSubTab);
    }
    
    // When switching to indicators, show the summary table by default
    if (tabName === 'indicadores') {
        switchIndicatorSubTab('resumen');
    }

    document.body.classList.remove('sidebar-open');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('-translate-x-full');
}



function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        document.body.classList.add('sidebar-open');
    } else {
        sidebar.classList.add('-translate-x-full');
        document.body.classList.remove('sidebar-open');
    }
}

// =============================================
// CRUD: EVENTS
// =============================================
function openEventModal(eventToEdit = null) {
    const modal = document.getElementById('modal-evento');
    const titleEl = document.getElementById('event-modal-title');

    if (eventToEdit) {
        titleEl.textContent = 'Editar Evento Programado';
        document.getElementById('event-id').value = eventToEdit.id;
        document.getElementById('event-name').value = eventToEdit.name;
        document.getElementById('event-date').value = eventToEdit.date;
        document.getElementById('event-time').value = eventToEdit.time;
        document.getElementById('event-mode').value = eventToEdit.mode;
        document.getElementById('event-link').value = eventToEdit.link;
        document.getElementById('event-desc').value = eventToEdit.desc;
    } else {
        titleEl.textContent = 'Programar Evento';
        document.getElementById('event-id').value = '';
        document.getElementById('event-name').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-time').value = '';
        document.getElementById('event-mode').value = 'Virtual';
        document.getElementById('event-link').value = '';
        document.getElementById('event-desc').value = '';
    }

    toggleEventLinkField();
    modal.classList.add('active');
}

function closeEventModal() {
    document.getElementById('modal-evento').classList.remove('active');
}

function toggleEventLinkField() {
    const mode = document.getElementById('event-mode').value;
    const label = document.getElementById('event-link-label');
    const input = document.getElementById('event-link');
    if (mode === 'Virtual') {
        if (label) label.textContent = 'Enlace de Reunión (Teams/Zoom)';
        if (input) input.placeholder = 'https://teams.microsoft.com/...';
    } else {
        if (label) label.textContent = 'Lugar / Dirección';
        if (input) input.placeholder = 'Auditorio Principal, Bogotá...';
    }
}

function saveEvent(e) {
    e.preventDefault();
    const id = document.getElementById('event-id').value;
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const mode = document.getElementById('event-mode').value;
    const link = document.getElementById('event-link').value;
    const desc = document.getElementById('event-desc').value;

    if (id) {
        const index = events.findIndex(e => e.id === id);
        if (index !== -1) events[index] = { ...events[index], name, date, time, mode, link, desc };
    } else {
        events.push({ id: 'evt-' + Date.now(), name, date, time, mode, link, desc });
    }

    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    saveToSupabase('events', events);
    renderEvents();
    renderKPIs();
    closeEventModal();
}

function editEvent(id) {
    const evt = events.find(e => e.id === id);
    if (evt) openEventModal(evt);
}

function deleteEvent(id) {
    if (confirm('¿Estás seguro de que deseas cancelar este evento?')) {
        events = events.filter(e => e.id !== id);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
        saveToSupabase('events', events);
        renderEvents();
        renderKPIs();
    }
}

// =============================================
// CRUD: NEWS
// =============================================
function openNewsModal(newsToEdit = null) {
    const modal = document.getElementById('modal-noticia');
    const titleEl = document.getElementById('news-modal-title');

    if (newsToEdit) {
        titleEl.textContent = 'Editar Noticia';
        document.getElementById('news-id').value = newsToEdit.id;
        document.getElementById('news-title').value = newsToEdit.title;
        document.getElementById('news-tag').value = newsToEdit.tag;
        document.getElementById('news-date').value = newsToEdit.date;
        document.getElementById('news-img').value = newsToEdit.img;
        document.getElementById('news-content').value = newsToEdit.content;
    } else {
        titleEl.textContent = 'Publicar Noticia';
        document.getElementById('news-id').value = '';
        document.getElementById('news-title').value = '';
        document.getElementById('news-tag').value = 'Innovación';
        document.getElementById('news-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('news-img').value = '';
        document.getElementById('news-content').value = '';
    }

    modal.classList.add('active');
}

function closeNewsModal() {
    document.getElementById('modal-noticia').classList.remove('active');
}

function saveNews(e) {
    e.preventDefault();
    const id = document.getElementById('news-id').value;
    const title = document.getElementById('news-title').value;
    const tag = document.getElementById('news-tag').value;
    const date = document.getElementById('news-date').value;
    const img = document.getElementById('news-img').value || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800';
    const content = document.getElementById('news-content').value;

    if (id) {
        const index = news.findIndex(n => n.id === id);
        if (index !== -1) news[index] = { ...news[index], title, tag, date, img, content };
    } else {
        news.push({ id: 'nws-' + Date.now(), title, tag, date, img, content });
    }

    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    saveToSupabase('news', news);
    renderNews();
    closeNewsModal();
}

function editNews(id) {
    const n = news.find(n => n.id === id);
    if (n) openNewsModal(n);
}

function deleteNews(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
        news = news.filter(n => n.id !== id);
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
        saveToSupabase('news', news);
        renderNews();
    }
}

function readNewsDetail(id) {
    const n = news.find(n => n.id === id);
    if (n) {
        alert(`${n.title.toUpperCase()}\n\nPublicado el: ${n.date} — Categoría: ${n.tag}\n\n${n.content}`);
    }
}

// =============================================
// UTILITIES
// =============================================
function animateNumber(elementId, targetValue, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    let currentValue = 0;
    const duration = 800;
    const stepTime = 16;
    const step = targetValue / (duration / stepTime);
    const timer = setInterval(() => {
        currentValue += step;
        if (currentValue >= targetValue) {
            el.textContent = Math.round(targetValue) + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.round(currentValue) + suffix;
        }
    }, stepTime);
}

function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }
}

// =============================================
// EXCEL IMPORT (for Ejecutados update via Excel)
// =============================================
function openImportModal() {
    document.getElementById('modal-import').classList.add('active');
    const successEl = document.getElementById('import-success');
    if (successEl) successEl.classList.add('hidden');
    resetDropzone();
}

function closeImportModal() {
    document.getElementById('modal-import').classList.remove('active');
}

function resetDropzone() {
    const icon = document.getElementById('dropzone-icon');
    const text = document.getElementById('dropzone-text');
    const input = document.getElementById('excel-file-input');
    if (icon) icon.className = 'fa-solid fa-cloud-arrow-up text-3xl text-slate-400';
    if (text) text.textContent = 'Arrastra tu archivo aquí o haz clic para buscar';
    if (input) input.value = '';
}
function normalizeText(text) {
    if (!text) return '';
    return text.toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function longestCommonSubstringLength(str1, str2) {
    let longest = 0;
    const num = Array(str1.length + 1).fill(0).map(() => Array(str2.length + 1).fill(0));
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                num[i][j] = num[i - 1][j - 1] + 1;
                if (num[i][j] > longest) {
                    longest = num[i][j];
                }
            }
        }
    }
    return longest;
}

function findMatchingAction(excelName, actionList) {
    const normExcel = normalizeText(excelName);
    if (!normExcel) return null;
    
    // 1. Try exact normalized match
    let match = actionList.find(a => normalizeText(a.name) === normExcel);
    if (match) return match;
    
    // 2. Try prefix match (first 20 characters)
    match = actionList.find(a => {
        const normA = normalizeText(a.name);
        return normA.startsWith(normExcel.substring(0, 20)) || normExcel.startsWith(normA.substring(0, 20));
    });
    if (match) return match;
    
    // 3. Try partial substring match (first 15 characters)
    match = actionList.find(a => {
        const normA = normalizeText(a.name);
        return normA.includes(normExcel.substring(0, 15)) || normExcel.includes(normA.substring(0, 15));
    });
    if (match) return match;
    
    // 4. Overlap match using Longest Common Substring
    let bestMatch = null;
    let maxOverlap = 0;
    actionList.forEach(a => {
        const normA = normalizeText(a.name);
        const overlap = longestCommonSubstringLength(normExcel, normA);
        if (overlap > maxOverlap && overlap >= 10) {
            maxOverlap = overlap;
            bestMatch = a;
        }
    });
    return bestMatch;
}

function handleExcelFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const icon = document.getElementById('dropzone-icon');
    const text = document.getElementById('dropzone-text');
    if (icon) icon.className = 'fa-solid fa-spinner fa-spin text-3xl text-brand-500';
    if (text) text.textContent = 'Procesando archivo Excel...';

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // Leemos el Excel saltando la primera fila de título (usamos range: 1 para empezar en la fila 2)
            const rows = XLSX.utils.sheet_to_json(worksheet, { range: 1 });

            if (rows.length === 0) {
                alert('El archivo Excel parece estar vacío o el formato no es el correcto.');
                resetDropzone();
                return;
            }

            let importCount = 0;
            rows.forEach(row => {
                const nameKey = Object.keys(row).find(k => k.toLowerCase().includes('actividad') || k.toLowerCase().includes('acción') || k.toLowerCase().includes('accion') || k.toLowerCase().includes('nombre'));
                const name = nameKey ? String(row[nameKey]) : null;
                if (!name) return;

                const act = findMatchingAction(name, actions);
                if (!act) return;

                // Limpiamos los ejecutados anteriores de esta acción para una importación limpia
                MONTHS.forEach(m => {
                    act.executedMonths[m] = 0;
                });

                MONTHS.forEach((m, idx) => {
                    const monthNames = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
                    const key = Object.keys(row).find(k => k.toUpperCase().trim() === monthNames[idx] || k.toUpperCase().trim() === m.toUpperCase());
                    if (key && row[key] !== undefined && row[key] !== '') {
                        const val = parseInt(row[key]) || 0;
                        if (val >= 0) act.executedMonths[m] = val;
                    }
                });
                importCount++;
            });

            if (importCount > 0) {
                saveActions();
                if (icon) icon.className = 'fa-solid fa-circle-check text-3xl text-emerald-500';
                if (text) text.textContent = '¡Importado exitosamente!';
                const successEl = document.getElementById('import-success');
                const successTxt = document.getElementById('import-success-text');
                if (successEl) successEl.classList.remove('hidden');
                if (successTxt) successTxt.textContent = `¡Datos de ejecución importados para ${importCount} acción(es)!`;
                renderAllData();
                if (currentSubTab !== 'resumen') renderActionDetail(currentSubTab);
            } else {
                alert('No se pudo hacer corresponder ninguna acción con el archivo. Verifica que los nombres de las actividades coincidan.');
                resetDropzone();
            }
        } catch (err) {
            console.error(err);
            alert('Error al procesar el archivo. Asegúrate de que sea un .xlsx o .xls válido.');
            resetDropzone();
        }
    };
    reader.readAsArrayBuffer(file);
}

function exportData() {
    const backup = {
        actions: actions.map(a => ({ id: a.id, name: a.name, executedMonths: a.executedMonths, progress: computeActionProgress(a) })),
        indicators: indicators.map(i => ({ id: i.id, executedMonths: i.executedMonths })),
        events: events,
        news: news,
        strategies: strategies,
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TPA_Respaldo_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// =============================================
// STRATEGIES RENDERING
// =============================================
function renderStrategies() {
    const grid = document.getElementById('strategies-grid');
    if (!grid) return;

    if (strategies.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-slate-400"><i class="fa-solid fa-chess-knight text-4xl mb-3 block"></i>No hay estrategias publicadas.</div>`;
        return;
    }

    let cardsHTML = '';
    strategies.forEach(strat => {
        const objectivesListHTML = strat.objectives.map(obj => `
            <li class="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400">
                <i class="fa-solid fa-circle-check text-brand-500 mt-0.5 flex-shrink-0 text-[10px]"></i>
                <span>${obj}</span>
            </li>
        `).join('');

        const statusBadge = strat.status === 'En Ejecución'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50'
            : 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50';

        cardsHTML += `
            <div class="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
                <div class="space-y-5">
                    <div class="flex justify-between items-start">
                        <div class="p-3.5 bg-gradient-to-tr ${strat.color} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <i class="fa-solid ${strat.icon} text-lg w-5 h-5 flex items-center justify-center"></i>
                        </div>
                        <div class="flex flex-col items-end space-y-1.5">
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">${strat.tag}</span>
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${statusBadge}">${strat.status}</span>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="font-extrabold text-slate-800 dark:text-slate-100 text-base leading-snug tracking-tight group-hover:text-brand-500 transition-colors duration-200">${strat.name}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${strat.desc}</p>
                    </div>
                    <div class="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Objetivos Clave</span>
                        <ul class="space-y-1.5">
                            ${objectivesListHTML}
                        </ul>
                    </div>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end" style="${isAdmin ? 'display: flex;' : 'display: none;'}">
                    <div class="flex items-center space-x-1">
                        <button onclick="editEstrategia('${strat.id}')" class="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all" title="Editar"><i class="fa-solid fa-pen text-xs"></i></button>
                        <button onclick="deleteEstrategia('${strat.id}')" class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all" title="Eliminar"><i class="fa-solid fa-trash text-xs"></i></button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = cardsHTML;
}

// =============================================
// CRUD: ESTRATEGIAS
// =============================================
function openEstrategiaModal(stratToEdit = null) {
    const modal = document.getElementById('modal-estrategia');
    const titleEl = document.getElementById('strategy-modal-title');

    if (stratToEdit) {
        titleEl.textContent = 'Editar Estrategia';
        document.getElementById('strategy-id').value = stratToEdit.id;
        document.getElementById('strategy-name').value = stratToEdit.name;
        document.getElementById('strategy-tag').value = stratToEdit.tag;
        document.getElementById('strategy-status').value = stratToEdit.status;
        document.getElementById('strategy-color').value = stratToEdit.color;
        document.getElementById('strategy-desc').value = stratToEdit.desc;
        document.getElementById('strategy-objectives').value = stratToEdit.objectives.join('\n');
        selectStrategyIcon(stratToEdit.icon);
    } else {
        titleEl.textContent = 'Nueva Estrategia';
        document.getElementById('strategy-id').value = '';
        document.getElementById('strategy-name').value = '';
        document.getElementById('strategy-tag').value = 'Innovación';
        document.getElementById('strategy-status').value = 'En Ejecución';
        document.getElementById('strategy-color').value = 'from-purple-500 to-indigo-600';
        document.getElementById('strategy-desc').value = '';
        document.getElementById('strategy-objectives').value = '';
        selectStrategyIcon('fa-rocket');
    }

    modal.classList.add('active');
}

function closeEstrategiaModal() {
    document.getElementById('modal-estrategia').classList.remove('active');
}

function saveEstrategia(e) {
    e.preventDefault();
    const id = document.getElementById('strategy-id').value;
    const name = document.getElementById('strategy-name').value;
    const tag = document.getElementById('strategy-tag').value;
    const status = document.getElementById('strategy-status').value;
    const icon = document.getElementById('strategy-icon').value;
    const color = document.getElementById('strategy-color').value;
    const desc = document.getElementById('strategy-desc').value;
    const objectives = document.getElementById('strategy-objectives').value
        .split('\n')
        .map(o => o.trim())
        .filter(o => o.length > 0);

    if (id) {
        const index = strategies.findIndex(s => s.id === id);
        if (index !== -1) {
            strategies[index] = { ...strategies[index], name, tag, status, icon, color, desc, objectives };
        }
    } else {
        strategies.push({ id: 'strat-' + Date.now(), name, tag, status, icon, color, desc, objectives });
    }

    localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies));
    saveToSupabase('strategies', strategies);
    renderStrategies();
    closeEstrategiaModal();
}

function editEstrategia(id) {
    const strat = strategies.find(s => s.id === id);
    if (strat) openEstrategiaModal(strat);
}

function deleteEstrategia(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta estrategia?')) {
        strategies = strategies.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies));
        saveToSupabase('strategies', strategies);
        renderStrategies();
    }
}

function selectStrategyIcon(iconName) {
    // Actualizar el valor del input oculto
    const input = document.getElementById('strategy-icon');
    if (input) input.value = iconName;
    
    // Resaltar el botón correspondiente en la grilla visual
    const buttons = document.querySelectorAll('#icon-selector-grid button');
    buttons.forEach(btn => {
        const btnIconAttr = btn.getAttribute('data-icon');
        if (btnIconAttr === iconName) {
            // Estilo seleccionado (Premium y alineado con btn-active)
            btn.className = 'p-2 rounded-lg border flex items-center justify-center text-xs transition-all active:scale-95 bg-brand-600 text-white border-brand-600';
        } else {
            // Estilo no seleccionado
            btn.className = 'p-2 rounded-lg border flex items-center justify-center text-xs transition-all active:scale-95 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-350';
        }
    });
}

// =============================================
// INDICATORS RENDERING AND ENGINE
// =============================================

function renderIndicatorsTable() {
    const tableBody = document.getElementById('indicators-table-body');
    if (!tableBody) return;

    if (indicators.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-400"><i class="fa-solid fa-folder-open text-3xl mb-2 block"></i>No se encontraron indicadores.</td></tr>`;
        return;
    }

    let rowsHTML = '';
    indicators.forEach(ind => {
        const progress = computeIndicatorProgress(ind);
        const status = computeIndicatorStatus(ind);

        let statusBadge = '';
        if (status === 'Planeado') statusBadge = 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
        else if (status === 'En Curso') statusBadge = 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 animate-pulse';
        else if (status === 'Completado') statusBadge = 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50';

        const displayExec = ind.executedMonths['Dic'] || 0;
        const goalText = `${displayExec}% / ${ind.goal}%`;

        rowsHTML += `
            <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group cursor-pointer" onclick="switchIndicatorSubTab('${ind.id}')">
                <td class="py-4 px-4 max-w-sm">
                    <h5 class="font-semibold text-slate-800 dark:text-slate-100 tracking-tight leading-snug truncate group-hover:text-brand-500 transition-colors" title="${ind.name}">${ind.name}</h5>
                    <span class="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50">${ind.frequency}</span>
                </td>
                <td class="py-4 px-4 w-40">
                    <div class="flex items-center space-x-2">
                        <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-brand-500 rounded-full transition-all duration-700" style="width: ${progress}%"></div>
                        </div>
                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[32px] text-right">${progress}%</span>
                    </div>
                </td>
                <td class="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-300" title="${goalText}">${goalText}</td>
                <td class="py-4 px-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${statusBadge}">${status}</span>
                </td>
                <td class="py-4 px-4 text-right whitespace-nowrap">
                    <button onclick="event.stopPropagation(); switchIndicatorSubTab('${ind.id}')" class="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:hover:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-lg transition-all">
                        Ver ficha <i class="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rowsHTML;
}

function switchIndicatorSubTab(subTabId) {
    currentIndicatorTab = subTabId;

    const resumenContainer = document.getElementById('indicadores-resumen');
    const detailContainer = document.getElementById('indicator-detail');

    if (subTabId === 'resumen') {
        resumenContainer.classList.remove('hidden');
        detailContainer.classList.add('hidden');
        document.getElementById('header-title').textContent = 'Indicadores de Gestión 2026';
    } else {
        resumenContainer.classList.add('hidden');
        detailContainer.classList.remove('hidden');
        renderIndicatorDetail(subTabId);
        const ind = indicators.find(i => i.id === subTabId);
        if (ind) document.getElementById('header-title').textContent = `Ficha Técnica — ${ind.code}`;
    }
}

function renderIndicatorDetail(indicatorId) {
    const ind = indicators.find(i => i.id === indicatorId);
    const container = document.getElementById('indicator-detail');
    if (!ind || !container) return;

    const progress = computeIndicatorProgress(ind);
    const status = computeIndicatorStatus(ind);

    const statusColors = {
        'Planeado': 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        'En Curso': 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 animate-pulse',
        'Completado': 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
    };
    const statusBadge = statusColors[status] || statusColors['Planeado'];

    // Progress ring math (r=36 → circumference = 226.2)
    const circ = 226.2;
    const progressOffset = circ - (circ * progress / 100);
    const progressColor = progress === 100 ? '#10b981' : progress > 50 ? '#6366f1' : '#f59e0b';

    // Team members
    const names = (ind.responsibleName || '').split(/\n|\//).map(n => n.trim()).filter(n => n.length > 0);
    const roles = (ind.responsibleRole || '').split(/\n|\//).map(r => r.trim()).filter(r => r.length > 0);
    const avatarColors = ['from-brand-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600', 'from-pink-500 to-rose-600', 'from-cyan-500 to-blue-600'];

    let teamHTML = names.map((name, i) => {
        const initials = name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
        const colorGrad = avatarColors[i % avatarColors.length];
        const role = roles[i] || roles[roles.length - 1] || 'Responsable';
        return `
            <div class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${colorGrad} text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-md">${initials}</div>
                <div class="overflow-hidden">
                    <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">${name.trim()}</p>
                    <p class="text-[10px] text-slate-400 truncate">${role}</p>
                </div>
            </div>
        `;
    }).join('');
    if (!teamHTML) {
        teamHTML = `<p class="text-xs text-slate-400 col-span-full">No se registraron responsables para este indicador.</p>`;
    }

    // Monthly grid html builder for indicator
    const monthlyGridHTML = buildIndicatorMonthlyGrid(ind, isAdmin);

    const displayExec = ind.executedMonths['Dic'] || 0;

    container.innerHTML = `
        <div class="space-y-6 animate-fadeIn">

            <!-- BACK BUTTON -->
            <button onclick="switchIndicatorSubTab('resumen')" class="flex items-center space-x-2 text-sm text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors font-medium group">
                <i class="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200"></i>
                <span>Volver al Listado de Indicadores</span>
            </button>

            <!-- HEADER DE LA FICHA -->
            <div class="glass-card p-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                    <div class="space-y-2 flex-1">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">${ind.code} (${ind.proceso})</span>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                                <i class="fa-solid fa-chart-line mr-1"></i>${ind.type}
                            </span>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${statusBadge}">${status}</span>
                        </div>
                        <h2 class="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">${ind.name}</h2>
                    </div>
                </div>
            </div>

            <!-- KPI CARDS ROW -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">

                <!-- META ANUAL -->
                <div class="glass-card p-6 flex flex-col justify-between sm:col-span-1 relative overflow-hidden group">
                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Meta Anual</span>
                    <div class="flex-1 flex flex-col items-center justify-center py-4">
                        <span class="text-5xl md:text-6xl font-black bg-gradient-to-br from-brand-500 to-indigo-400 bg-clip-text text-transparent tracking-tighter leading-none">${ind.goal}%</span>
                        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 text-center leading-tight">Control de Acumulación: ${ind.control}</span>
                    </div>
                    <div class="absolute -right-3 -bottom-3 text-brand-500/[0.05] dark:text-brand-400/[0.06] text-8xl font-black pointer-events-none select-none">%</div>
                </div>

                <!-- PROGRESO CIRCULAR -->
                <div class="glass-card p-6 flex flex-col items-center justify-center sm:col-span-1 relative">
                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Avance del Indicador</span>
                    <div class="relative w-28 h-28">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="36" fill="transparent" stroke="rgba(226,232,240,0.15)" stroke-width="7"/>
                            <circle cx="40" cy="40" r="36" fill="transparent" stroke="${progressColor}" stroke-width="7"
                                stroke-dasharray="${circ}" stroke-dashoffset="${progressOffset}"
                                stroke-linecap="round" class="transition-all duration-1000 ease-out"/>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-2xl font-black text-slate-800 dark:text-slate-100">${progress}%</span>
                        </div>
                    </div>
                    <div class="mt-3 text-center">
                        <p class="text-xs text-slate-500">Ejecutado: <span class="font-bold text-slate-700 dark:text-slate-200">${displayExec}%</span> (Meta: ${ind.goal}%)</p>
                    </div>
                </div>

                <!-- SOPORTE REQUERIDO -->
                <div class="glass-card p-6 flex flex-col justify-between sm:col-span-1">
                    <div class="flex items-x-2 mb-3">
                        <div class="p-2 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 rounded-lg mr-2">
                            <i class="fa-solid fa-file-circle-check text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Soporte Requerido</span>
                    </div>
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed flex-1">${ind.support}</p>
                    <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                        <p class="text-[10px] text-slate-400">Medio de verificación para el cumplimiento de la meta.</p>
                    </div>
                </div>
            </div>

            <!-- FICHA DETALLADA: DESCRIPCIÓN Y FÓRMULA -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass-card p-6">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="p-2.5 bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 rounded-xl">
                            <i class="fa-solid fa-file-lines text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Definición y Objetivo</h3>
                    </div>
                    <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${ind.description}</p>
                </div>
                <div class="glass-card p-6">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="p-2.5 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 rounded-xl">
                            <i class="fa-solid fa-calculator text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Fórmula de Cálculo</h3>
                    </div>
                    <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-center">
                        <code class="text-xs font-semibold text-brand-600 dark:text-brand-400 font-mono block break-words">${ind.formula}</code>
                    </div>
                </div>
            </div>

            <!-- GRILLA MENSUAL PLANIFICADO VS EJECUTADO -->
            <div class="glass-card p-6" id="indicator-monthly-grid-card-${ind.id}">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="p-2.5 bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-500 rounded-xl">
                            <i class="fa-solid fa-calendar-check text-lg"></i>
                        </div>
                        <div>
                            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Planificación y Avance Mensual</h3>
                            <p class="text-[10px] text-slate-400 mt-0.5">Meta mensual frente a avance registrado</p>
                        </div>
                    </div>
                    ${isAdmin ? `
                    <button onclick="saveIndicatorMonthlyExecution('${ind.id}')"
                        class="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex-shrink-0">
                        <i class="fa-solid fa-floppy-disk text-xs"></i>
                        <span>Guardar Ejecución</span>
                    </button>` : ''}
                </div>
                ${monthlyGridHTML}
                ${isAdmin ? `
                <p class="mt-3 text-[10px] text-slate-400 flex items-center space-x-1">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>Modo Administrador: edita los valores de la fila "Ejecutado" y haz clic en "Guardar Ejecución".</span>
                </p>` : `
                <p class="mt-3 text-[10px] text-slate-400 flex items-center space-x-1">
                    <i class="fa-solid fa-lock"></i>
                    <span>Inicia sesión como Administrador para registrar los logros mensuales.</span>
                </p>`}
            </div>

            <!-- EQUIPO RESPONSABLE -->
            <div class="glass-card p-6">
                <div class="flex items-center space-x-3 mb-5">
                    <div class="p-2.5 bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 rounded-xl">
                        <i class="fa-solid fa-users text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Equipo Responsable</h3>
                        <p class="text-[10px] text-slate-400 mt-0.5">${ind.responsibleRole}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${teamHTML}
                </div>
            </div>

        </div>
    `;
}

function buildIndicatorMonthlyGrid(ind, adminMode) {
    const months = MONTHS;
    const fullMonths = MONTHS_FULL;

    let headersHTML = `<th class="py-2 px-1 text-left text-[10px] font-bold tracking-wider text-slate-400 uppercase w-24 sticky left-0 bg-white dark:bg-slate-900">Indicador</th>`;
    months.forEach((m, i) => {
        headersHTML += `<th class="py-2 px-1 text-center text-[10px] font-bold tracking-wider text-slate-400 uppercase min-w-[60px]" title="${fullMonths[i]}">${m}</th>`;
    });
    headersHTML += `<th class="py-2 px-1 text-center text-[10px] font-bold tracking-wider text-slate-400 uppercase min-w-[60px]">Meta Final</th>`;

    // Planned row
    let plannedHTML = `<td class="py-3 px-2 text-xs font-bold text-slate-600 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900">
        <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
            <span>Meta Planificada</span>
        </div>
    </td>`;
    months.forEach(m => {
        const val = ind.plannedMonths[m] || 0;
        const hasPlan = val > 0;
        plannedHTML += `<td class="py-3 px-1 text-center">
            <span class="inline-block px-2 py-1 rounded-lg text-xs font-bold ${hasPlan ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300' : 'text-slate-300 dark:text-slate-600'}">
                ${hasPlan ? `${val}%` : '—'}
            </span>
        </td>`;
    });
    plannedHTML += `<td class="py-3 px-1 text-center"><span class="inline-block px-2 py-1 rounded-lg text-xs font-bold bg-brand-500 text-white">${ind.goal}%</span></td>`;

    // Executed row
    let executedHTML = `<td class="py-3 px-2 text-xs font-bold text-slate-600 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900">
        <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
            <span>Ejecutado</span>
        </div>
    </td>`;
    months.forEach(m => {
        const val = Number(ind.executedMonths[m]) || 0;
        const planned = ind.plannedMonths[m] || 0;
        const metOrExceeded = val >= planned && planned > 0;
        const hasExec = val > 0;

        if (adminMode) {
            executedHTML += `<td class="py-2 px-1 text-center">
                <input type="number" id="exec-ind-${ind.id}-${m}" value="${val}" min="0" max="100"
                    class="w-14 text-center text-xs font-bold py-1.5 px-1 rounded-lg border-2 ${metOrExceeded ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}
                    focus:outline-none focus:border-brand-500 transition-colors">%
            </td>`;
        } else {
            const cellClass = hasExec
                ? (metOrExceeded ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300')
                : 'text-slate-300 dark:text-slate-600';
            executedHTML += `<td class="py-3 px-1 text-center">
                <span class="inline-block px-2 py-1 rounded-lg text-xs font-bold ${cellClass}">
                    ${hasExec ? `${val}%` : '—'}
                </span>
            </td>`;
        }
    });

    const displayExec = ind.executedMonths['Dic'] || 0;
    const execTotalClass = displayExec >= ind.goal ? 'bg-emerald-500' : displayExec > 0 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600';
    executedHTML += `<td class="py-3 px-1 text-center"><span class="inline-block px-2 py-1 rounded-lg text-xs font-bold ${execTotalClass} text-white">${displayExec}%</span></td>`;

    return `
        <div class="overflow-x-auto -mx-2 px-2">
            <table class="w-full border-collapse min-w-max">
                <thead>
                    <tr class="border-b border-slate-150 dark:border-slate-700/50">${headersHTML}</tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
                    <tr>${plannedHTML}</tr>
                    <tr>${executedHTML}</tr>
                </tbody>
            </table>
        </div>
    `;
}

function saveIndicatorMonthlyExecution(indicatorId) {
    const ind = indicators.find(i => i.id === indicatorId);
    if (!ind) return;

    let changed = false;
    MONTHS.forEach(m => {
        const input = document.getElementById(`exec-ind-${indicatorId}-${m}`);
        if (input) {
            const newVal = Math.min(100, Math.max(0, parseInt(input.value) || 0));
            if (newVal !== ind.executedMonths[m]) {
                ind.executedMonths[m] = newVal;
                changed = true;
            }
        }
    });

    if (changed) {
        saveIndicators();
        showSaveFeedback(indicatorId);
        renderIndicatorsTable();
        renderIndicatorDetail(indicatorId);
    }
}

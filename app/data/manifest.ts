import type { Article, Example, SdkVersion, Localized } from '../types/docs'
export const tr = (en: string, ru: string, es: string): Localized => ({ en, ru, es })
export const versions: SdkVersion[] = [
  { id: 'v5', label: 'v5.10.1', latest: true, archived: false },
  { id: 'v4', label: 'v4 · Archive', latest: false, archived: true },
]
const start = tr('THE ESSENTIALS', 'ОСНОВЫ', 'LO ESENCIAL')
const build = tr('BUILD YOUR FIRST MOD', 'СОЗДАЙТЕ ПЕРВЫЙ МОД', 'CREA TU PRIMER MOD')
const concepts = tr('CORE CONCEPTS', 'ОСНОВНЫЕ КОНЦЕПЦИИ', 'CONCEPTOS CLAVE')
export const sections = [
  {
    id: 'get-started',
    title: tr('Get Started', 'Начало', 'Primeros pasos'),
    slug: 'get-started/introduction',
  },
  {
    id: 'structure',
    title: tr('Architecture', 'Архитектура', 'Arquitectura'),
    slug: 'structure/project',
  },
  {
    id: 'tutorials',
    title: tr('Modding Tutorials', 'Уроки моддинга', 'Tutoriales de modding'),
    slug: 'tutorials/buttons',
  },
  { id: 'guide', title: tr('Guide', 'Руководство', 'Guía'), slug: 'guide/hooks' },
  { id: 'api', title: tr('API', 'API', 'API'), slug: 'api/classes' },
  {
    id: 'publishing',
    title: tr('Publishing', 'Публикация', 'Publicación'),
    slug: 'publishing/checklist',
  },
  { id: 'examples', title: tr('Examples', 'Примеры', 'Ejemplos'), slug: 'examples/library' },
] as const
const projectFiles: Article[] = [
  {
    path: 'src/',
    slug: 'src',
    description: tr(
      'Organize the C++ source of your mod.',
      'Организация исходного кода мода на C++.',
      'Organiza el código C++ de tu mod.',
    ),
  },
  {
    path: 'src/main.cpp',
    slug: 'src/main-cpp',
    description: tr(
      'Where the first hook lives and how the game calls it.',
      'Где находится первый hook и как игра вызывает его.',
      'Dónde vive el primer hook y cómo lo llama el juego.',
    ),
  },
  {
    path: 'resources/',
    slug: 'resources',
    description: tr(
      'Include images, fonts, and other mod assets.',
      'Изображения, шрифты и другие ресурсы мода.',
      'Imágenes, fuentes y otros recursos del mod.',
    ),
  },
  {
    path: 'mod.json',
    slug: 'mod-json',
    description: tr(
      'Describe identity, compatibility, and dependencies.',
      'ID, совместимость и зависимости мода.',
      'Identidad, compatibilidad y dependencias del mod.',
    ),
  },
  {
    path: 'CMakeLists.txt',
    slug: 'cmake',
    description: tr(
      'Connect source files, the compiler, and the SDK.',
      'Связь исходников, компилятора и SDK.',
      'Conecta código, compilador y SDK.',
    ),
  },
  {
    path: 'about.md',
    slug: 'about',
    description: tr(
      'Write the description players read in Geode.',
      'Описание, которое игроки читают в Geode.',
      'La descripción que leen los jugadores en Geode.',
    ),
  },
  {
    path: 'changelog.md',
    slug: 'changelog',
    description: tr(
      'Explain what changed in each release.',
      'Изменения в каждой версии мода.',
      'Explica los cambios de cada versión.',
    ),
  },
  {
    path: 'build/',
    slug: 'build',
    description: tr(
      'Understand generated binaries, caches, and packages.',
      'Сгенерированные бинарные файлы, кеши и пакеты.',
      'Binarios, cachés y paquetes generados.',
    ),
  },
].map((file) => ({
  slug: 'structure/' + file.slug,
  section: 'structure',
  title: tr(file.path, file.path, file.path),
  description: file.description,
  projectPath: file.path,
  minutes: 5,
  group: tr('PROJECT FILES', 'ФАЙЛЫ ПРОЕКТА', 'ARCHIVOS DEL PROYECTO'),
  icon: file.path.endsWith('/') ? 'folder' : 'file',
  versions: ['v5'],
}))
export const articles: Article[] = [
  {
    slug: 'get-started/introduction',
    section: 'get-started',
    title: tr('What is Geode?', 'Что такое Geode?', '¿Qué es Geode?'),
    description: tr(
      'Understand the loader, the SDK, and where your mod fits.',
      'Загрузчик, SDK и место вашего мода.',
      'Entiende el cargador, el SDK y el papel de tu mod.',
    ),
    minutes: 4,
    group: start,
    icon: 'compass',
    versions: ['v5'],
  },
  {
    slug: 'get-started/installation',
    section: 'get-started',
    title: tr('Set up your environment', 'Настройка окружения', 'Configura tu entorno'),
    description: tr(
      'Install the tools you need to build with confidence.',
      'Установите инструменты для сборки.',
      'Instala las herramientas para compilar.',
    ),
    minutes: 12,
    group: start,
    icon: 'terminal',
    versions: ['v5'],
  },
  {
    slug: 'get-started/cpp-primer',
    section: 'get-started',
    title: tr(
      'A little C++ goes a long way',
      'Необходимый минимум C++',
      'Un poco de C++ es suficiente',
    ),
    description: tr(
      'The C++ you need, explained through modding.',
      'Нужный C++ на примерах моддинга.',
      'El C++ que necesitas, con ejemplos de mods.',
    ),
    minutes: 10,
    group: start,
    icon: 'code',
    versions: ['v5'],
  },
  {
    slug: 'get-started/first-mod',
    section: 'get-started',
    title: tr('Create your first mod', 'Создайте первый мод', 'Crea tu primer mod'),
    description: tr(
      'Add a real button to Geometry Dash, one step at a time.',
      'Добавьте работающую кнопку в Geometry Dash.',
      'Añade un botón real a Geometry Dash, paso a paso.',
    ),
    minutes: 20,
    group: build,
    icon: 'box',
    versions: ['v5'],
  },
  {
    slug: 'structure/project',
    section: 'structure',
    title: tr('Inside a Geode project', 'Устройство проекта Geode', 'Dentro de un proyecto Geode'),
    description: tr(
      'From source files to a loadable .geode package.',
      'От исходников до пакета .geode.',
      'Del código fuente a un paquete .geode.',
    ),
    minutes: 8,
    group: build,
    icon: 'folder',
    versions: ['v5'],
  },
  ...projectFiles,
  ...(['buttons', 'popup', 'scroll-layer', 'label'] as const).map((topic, index): Article => ({
    slug: 'tutorials/' + topic,
    section: 'tutorials',
    title: [
      tr('Create a Button', 'Как создать Button', 'Crear un Button'),
      tr('Build your own Popup', 'Как сделать свой Popup', 'Crear tu propio Popup'),
      tr('Create a ScrollLayer', 'Как сделать ScrollLayer', 'Crear un ScrollLayer'),
      tr('Create a geode::Label', 'Как создать geode::Label', 'Crear un geode::Label'),
    ][index]!,
    description: [
      tr(
        'A clickable menu button with a callback.',
        'Кнопка в меню и обработчик нажатия.',
        'Un botón del menú con una acción.',
      ),
      tr(
        'A custom window with content and a close button.',
        'Собственное окно с содержимым и кнопкой закрытия.',
        'Una ventana propia con contenido y cierre.',
      ),
      tr(
        'A standalone scrolling list in the main menu.',
        'Самостоятельный список с прокруткой в главном меню.',
        'Una lista desplazable independiente en el menú principal.',
      ),
      tr(
        'Add readable text to a Geode UI layer.',
        'Добавьте текст в UI-слой Geode.',
        'Añade texto legible a una capa UI de Geode.',
      ),
    ][index]!,
    keywords: [
      tr(
        'how to make create button buttons CCMenuItemSpriteExtra callback',
        'как сделать создать кнопку кнопки Button buttons CCMenuItemSpriteExtra обработчик нажатия',
        'cómo hacer crear botón botones Button CCMenuItemSpriteExtra',
      ),
      tr(
        'how to make create custom Popup window dialog',
        'как сделать создать свой кастомный Popup окно диалог',
        'cómo hacer crear propio Popup ventana diálogo',
      ),
      tr(
        'how to make create ScrollLayer scroll layer scrolling list',
        'как сделать создать ScrollLayer Scroll Layer скролл прокрутка список',
        'cómo hacer crear ScrollLayer scroll lista desplazamiento',
      ),
      tr(
        'geode Label geode::Label Label::create rich text color tags cr cg cb c-hex text label UI',
        'geode Label geode::Label Label::create rich text цветовые теги cr cg cb c-hex текст надпись label UI',
        'geode Label geode::Label Label::create rich text etiquetas de color cr cg cb c-hex texto etiqueta UI',
      ),
    ][index]!,
    minutes: index === 0 ? 10 : index === 3 ? 12 : 15,
    group: tr('MODDING TUTORIALS', 'УРОКИ МОДДИНГА', 'TUTORIALES'),
    icon: ['code', 'layout', 'list', 'file'][index]!,
    versions: ['v5'],
  })),
  ...(
    [
      {
        slug: 'notifications',
        title: tr('Show a Notification', 'Как показать Notification', 'Mostrar una Notification'),
        description: tr(
          'Display a short status message over the game.',
          'Короткое уведомление поверх игры.',
          'Muestra un mensaje breve sobre el juego.',
        ),
        keywords: tr(
          'toast alert message Notification success error',
          'уведомление тост сообщение Notification успех ошибка',
          'aviso mensaje Notification éxito error',
        ),
        icon: 'sparkles',
      },
      {
        slug: 'settings',
        title: tr('Add Mod Settings', 'Как добавить настройки', 'Añadir ajustes del mod'),
        description: tr(
          'Declare settings in mod.json and read changes in C++.',
          'Настройки в mod.json и обработка изменений в C++.',
          'Declara ajustes en mod.json y lee cambios en C++.',
        ),
        keywords: tr(
          'settings option toggle bool mod.json getSettingValue listenForSettingChanges',
          'настройки опции переключатель bool mod.json getSettingValue',
          'ajustes opciones interruptor bool mod.json getSettingValue',
        ),
        icon: 'filter',
      },
      {
        slug: 'saved-data',
        title: tr('Save Mod Data', 'Как сохранять данные', 'Guardar datos del mod'),
        description: tr(
          'Persist a counter between game sessions.',
          'Счётчик, который сохраняется между запусками.',
          'Un contador persistente entre sesiones.',
        ),
        keywords: tr(
          'save saved data persistence getSavedValue setSavedValue counter',
          'сохранить данные прогресс getSavedValue setSavedValue счётчик',
          'guardar datos persistencia getSavedValue setSavedValue contador',
        ),
        icon: 'database',
      },
      {
        slug: 'node-ids',
        title: tr('Find Nodes by ID', 'Как находить узлы по ID', 'Buscar nodos por ID'),
        description: tr(
          'Safely locate existing UI without child indexes.',
          'Безопасный поиск UI без индексов дочерних узлов.',
          'Encuentra la UI sin índices de hijos.',
        ),
        keywords: tr(
          'node ids getChildByID bottom-menu node-ids dependency',
          'ID узла найти getChildByID bottom-menu node-ids зависимость',
          'ID nodo buscar getChildByID bottom-menu node-ids dependencia',
        ),
        icon: 'network',
      },
      {
        slug: 'layouts',
        title: tr(
          'Arrange Nodes with Layouts',
          'Как использовать Layout',
          'Organizar nodos con Layout',
        ),
        description: tr(
          'Build a responsive row without manual coordinates.',
          'Адаптивный ряд без ручных координат.',
          'Una fila adaptable sin coordenadas manuales.',
        ),
        keywords: tr(
          'layout RowLayout ColumnLayout spacing position updateLayout',
          'layout компоновка RowLayout ColumnLayout расположение updateLayout',
          'layout diseño RowLayout ColumnLayout posición updateLayout',
        ),
        icon: 'layout',
      },
      {
        slug: 'resources',
        title: tr('Add a Custom Sprite', 'Как добавить свой спрайт', 'Añadir un sprite propio'),
        description: tr(
          'Package a PNG and show it in the game.',
          'Упакуйте PNG и покажите его в игре.',
          'Empaqueta un PNG y muéstralo en el juego.',
        ),
        keywords: tr(
          'resource asset image PNG sprite _spr mod.json',
          'ресурс картинка PNG спрайт _spr mod.json',
          'recurso imagen PNG sprite _spr mod.json',
        ),
        icon: 'file',
      },
      {
        slug: 'logging',
        title: tr('Debug with Logs', 'Как отлаживать через логи', 'Depurar con registros'),
        description: tr(
          'Use log levels and formatted values effectively.',
          'Уровни логов и форматированный вывод.',
          'Usa niveles de registro y valores formateados.',
        ),
        keywords: tr(
          'log logging debug info warn error console troubleshoot',
          'лог логи отладка debug info warn error консоль',
          'log registro depuración debug info warn error consola',
        ),
        icon: 'terminal',
      },
    ] as const
  ).map((tutorial): Article => ({
    slug: 'tutorials/' + tutorial.slug,
    section: 'tutorials',
    title: tutorial.title,
    description: tutorial.description,
    keywords: tutorial.keywords,
    minutes: tutorial.slug === 'settings' || tutorial.slug === 'resources' ? 12 : 8,
    group: tr('MODDING TUTORIALS', 'УРОКИ МОДДИНГА', 'TUTORIALES'),
    icon: tutorial.icon,
    versions: ['v5'],
  })),
  {
    slug: 'guide/hooks',
    section: 'guide',
    title: tr('Hooks, without the mystery', 'Понятно о hooks', 'Hooks sin misterios'),
    description: tr(
      'Extend game behavior safely with $modify.',
      'Безопасно расширяйте игру с $modify.',
      'Amplía el juego de forma segura con $modify.',
    ),
    minutes: 8,
    group: concepts,
    icon: 'workflow',
    versions: ['v5'],
  },
  {
    slug: 'guide/ui',
    section: 'guide',
    title: tr('Build game interfaces', 'Создание интерфейса', 'Crea interfaces del juego'),
    description: tr(
      'Nodes, buttons, anchors, and layouts.',
      'Nodes, кнопки, anchors и layouts.',
      'Nodos, botones, anclajes y layouts.',
    ),
    minutes: 10,
    group: concepts,
    icon: 'layout',
    versions: ['v5'],
  },
  {
    slug: 'guide/data',
    section: 'guide',
    title: tr('Settings & saved data', 'Настройки и данные', 'Ajustes y datos guardados'),
    description: tr(
      'Separate configuration from persistent state.',
      'Отделяйте настройки от сохранённого состояния.',
      'Separa la configuración del estado persistente.',
    ),
    minutes: 7,
    group: concepts,
    icon: 'database',
    versions: ['v5'],
  },
  {
    slug: 'guide/async',
    section: 'guide',
    title: tr('Async & networking', 'Асинхронность и сеть', 'Asincronía y red'),
    description: tr(
      'Understand v5 futures and operation lifetimes.',
      'Futures v5 и время жизни операций.',
      'Futures de v5 y la vida de las operaciones.',
    ),
    minutes: 9,
    group: concepts,
    icon: 'network',
    versions: ['v5'],
  },
  {
    slug: 'guide/migration',
    section: 'guide',
    title: tr('Migrate from v4 to v5', 'Миграция с v4 на v5', 'Migra de v4 a v5'),
    description: tr(
      'A deliberate upgrade path for existing mods.',
      'Пошаговое обновление существующих модов.',
      'Una ruta de actualización para tus mods.',
    ),
    minutes: 6,
    group: concepts,
    icon: 'git',
    versions: ['v5', 'v4'],
  },
  {
    slug: 'api/classes',
    section: 'api',
    title: tr('API reference', 'Справочник API', 'Referencia API'),
    description: tr(
      'A focused, source-backed symbol browser.',
      'Проверенные символы со ссылками на исходники.',
      'Símbolos verificados con enlaces al código.',
    ),
    minutes: 5,
    group: concepts,
    icon: 'braces',
    versions: ['v5'],
  },
  {
    slug: 'publishing/checklist',
    section: 'publishing',
    title: tr('Ship something great', 'Опубликуйте свой мод', 'Publica algo genial'),
    description: tr(
      'Prepare, test, and submit your mod to the index.',
      'Подготовьте, проверьте и отправьте мод в каталог.',
      'Prepara, prueba y envía tu mod al índice.',
    ),
    minutes: 12,
    group: tr('SHARE YOUR WORK', 'ПОДЕЛИТЕСЬ РАБОТОЙ', 'COMPARTE TU TRABAJO'),
    icon: 'rocket',
    versions: ['v5'],
  },
  {
    slug: 'examples/library',
    section: 'examples',
    title: tr('Learn by building', 'Учитесь на практике', 'Aprende creando'),
    description: tr(
      'Small, complete examples with a clear next step.',
      'Законченные примеры и понятный следующий шаг.',
      'Ejemplos completos con un siguiente paso claro.',
    ),
    minutes: 5,
    group: concepts,
    icon: 'blocks',
    versions: ['v5'],
  },
]
export const examples: Example[] = [
  {
    id: 'button',
    title: tr('Your first menu button', 'Первая кнопка в меню', 'Tu primer botón'),
    description: tr(
      'A complete hook, button, and working popup.',
      'Hook, кнопка и работающее окно.',
      'Un hook, un botón y un popup funcional.',
    ),
    difficulty: 'beginner',
    topic: 'UI',
    platforms: ['Windows', 'macOS', 'Android', 'iOS'],
    versions: ['v5'],
    slug: 'get-started/first-mod',
  },
  {
    id: 'hook',
    title: tr(
      'A minimal MenuLayer hook',
      'Минимальный hook MenuLayer',
      'Un hook mínimo de MenuLayer',
    ),
    description: tr(
      'Call the original and understand the result.',
      'Вызовите оригинал и проверьте результат.',
      'Llama al original y verifica el resultado.',
    ),
    difficulty: 'beginner',
    topic: 'Hooks',
    platforms: ['Windows', 'macOS', 'Android', 'iOS'],
    versions: ['v5'],
    slug: 'guide/hooks',
  },
  {
    id: 'saved',
    title: tr('Remember a preference', 'Сохраните выбор', 'Recuerda una preferencia'),
    description: tr(
      'Persist a boolean using the Mod API.',
      'Сохраните boolean через Mod API.',
      'Guarda un boolean con Mod API.',
    ),
    difficulty: 'beginner',
    topic: 'Data',
    platforms: ['Windows', 'macOS', 'Android', 'iOS'],
    versions: ['v5'],
    slug: 'guide/data',
  },
  {
    id: 'async',
    title: tr('Own an async operation', 'Жизненный цикл async', 'Controla una operación async'),
    description: tr(
      'Learn cancellation through TaskHolder.',
      'Отмена операции через TaskHolder.',
      'Cancelación con TaskHolder.',
    ),
    difficulty: 'intermediate',
    topic: 'Networking',
    platforms: ['Windows', 'macOS', 'Android', 'iOS'],
    versions: ['v5'],
    slug: 'guide/async',
  },
]

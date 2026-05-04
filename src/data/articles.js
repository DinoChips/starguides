// ============================================================
//  STARGUIDES — ARCHIVO DE CONTENIDO
// ============================================================
//
//  ¿CÓMO AGREGAR UN NUEVO ARTÍCULO?
//  1. Copia el bloque de ejemplo de abajo
//  2. Pégalo al final del array "articles"
//  3. Cambia el "id" (número siguiente)
//  4. Llena title, category, excerpt, date, readTime, tags, image
//  5. Escribe el contenido en "content" usando Markdown simple:
//       # Título grande
//       ## Subtítulo
//       ### Sección pequeña
//       - Item de lista
//       ```bash
//       código aquí
//       ```
//  6. Guarda el archivo → la página se actualiza automáticamente
//
//  CATEGORÍAS DISPONIBLES:
//    "minecraft" | "it" | "web-dev" | "humanos"
//
// ============================================================

export const articles = [

  // ── ARTÍCULO COMPLETO DE EJEMPLO ──────────────────────────
  {
    id: 1,
    title: "Cómo crear un servidor Paper desde cero",
    category: "minecraft",
    excerpt: "Guía completa y actualizada para levantar un servidor Paper 1.21.",
    date: "2026-05-4",
    readTime: "12 minutos",
    tags: ["Paper", "Java", "Pterodactyl"],
    image: "🖥️",
    content: `
# Cómo montar un servidor Paper desde cero

Paper es el fork de Minecraft más utilizado para servidores de comunidad. Ofrece mejor rendimiento que Spigot y una API más completa. Esta guía parte desde cero, sin experiencia previa necesaria.
Paper no es el único Fork que existe, existen muchos más tales como: Spigot, Purpur, Pufferfish, Forge, etc... Los forks dependen del uso que quieras darle a tu servidor, el más amigable y global es Paper, el que usaremos en este caso.

## Requisitos previos

Antes de empezar, necesitas:

- Un servidor o VPS
- Al menos 2GB de RAM (recomendado 4GB para plugins)
- Java 21 instalado en el servidor

## Paso 1: Obtener el servidor o VPS

¿Cómo puedo obtener un servidor o VPS, y cuáles son sus diferencias?

Un servidor para Minecraft puedes obtenerlo en muchísimas partes, muchos Host están dedicados especialmente a distribuir servidores para Minecraft, no todos son iguales, trata de buscar lo que más se ajuste a tu gusto y presupuesto.

Mis Host para servidores son:

- [Bloom Host](https://bloom.host/)
- [Holy Nodes](https://holynodes.com/minecraft)
- [Tect Host](https://tect.host/)

Puedes elegir cualquiera de estas 3 opciones, a opinión propia, están acomodadas por calidad. Si eres alguien nuevo, ve por Tect Host, si eres un poco más avanzado puedes considerar las otras 2 opciones.

## Paso 2: Descargar Paper.

Para descargar paper no hace falta otra cosa más que buscar en Google "PaperMC" y encontrarás la página. Por si no la encuentras, este es el link: https://papermc.io/downloads/paper
Cuando entres a la página encontrarás SIEMPRE la versión más actualizada, si quieres otra versión que no sea la última puedes ir a este link: https://gist.github.com/osipxd/6119732e30059241c2192c4a8d2218d9

En este caso, usaré la versión 1.21.10. Puedes usar la que sea de tu preferencia o compatibilidad.

## Paso 3: Instalar Paper en el servidor.

Una vez hayas descargado el .jar de Paper, procederemos a instalarlo en tu servidor. 
Debes de ir a los archivos de tu servidor, borrar todo lo que exista e instalar el .jar en los archivos. (Solo arrastralo o subelo allí)
Una vez hayas subido el archivo a tu servidor, asegurate de que en el apartado "Starup" se mire de esta forma:

SERVER JAR FILE
\`\`\`bash
tunombredejar.jar
\`\`\`

Por ejemplo:

SERVER JAR FILE:
\`\`\`bash
paper-1.21.10.jar
\`\`\`

## Paso 4: Iniciar el arranque del servidor

Si ya cumpliste con todos los pasos anteriores; felicidades, tienes Paper en tu servidor. Solo inicia el arranque de tu servidor haciendo click en el botón de inicio (generalmente, el botón verde)
Esto lo encuentras en la consola de tu servidor.

Cuando inicies tu servidor, te saldrá un enunciado de "EULA", tienes que aceptarlo. El EULA son los términos de Mojang y tienes que aceptarlos para iniciar el servidor. Cuando lo aceptes, puede que tu servidor se apague, solo vuelve a iniciarlo.

## Paso 5: Instalar plugins, configuraciones importantes & permisos (opcional)

Una vez el servidor está corriendo, instala estos plugins base. 

¿Dónde instalo los plugins y dónde los descargo? ¡MUY FÁCIL! Los plugins los instalas yendo a tus archivos y entrando a la carpeta plugins, allí los instalarás. Para descargarlos puedes ir a sitios como Spigot, Modrith, Bukkit. Cuando busques un plugin puedes buscarlo como "Pepito plugin minecraft" o "Pepito spigot"

### LuckPerms (permisos)
El estándar para gestión de permisos. Descarga desde luckperms.net.

### EssentialsX (comandos básicos)
Agrega /home, /warp, /tpa y 200 comandos más. Descarga desde essentialsx.net.

### WorldGuard (protección de zonas)
Imprescindible para proteger el spawn y zonas importantes. Descarga desde https://modrinth.com/plugin/worldguard/versions

## Configuración importante

Edita \`server.properties\` para los ajustes básicos:

\`\`\`bash
# Cambiar nombre del servidor
motd=Mi servidor de Minecraft
# Modo de juego por defecto
gamemode=survival
# Máximo de jugadores
max-players=50
# Modo online (false = no premium, true = premium) Recomendado que esté en false para que entren usuarios premium y no premium, pero si haces esto, asegurate de usar un plugin de seguridad como nLogin.
online-mode=true
# Perfil seguro
enforce-secure-profile=false
# Distancias de renderizado
simulation-distance=5 (Esta es la distancia de simulación)
view-distance=8 (Esta es la distancia de renderizado, lo que mira el JUGADOR)
\`\`\`

Y en \`config/paper-world-defaults.yml\` ajusta el rendimiento:

\`\`\`yaml
chunks:
  auto-save-interval: 6000
  max-auto-save-chunks-per-tick: 24
entities:
  spawning:
    spawn-limits:
      ambient: 20
      axolotls: 5
      creature: 10
      monster: 30
      underground_water_creature: 5
      water_ambient: 10
      water_creature: 5
    ticks-per-spawn:
      ambient: 100
      axolotls: 400
      creature: 400
      monster: 20
      underground_water_creature: 400
      water_ambient: 400
      water_creature: 400

# Permisos

Para ajustar los permisos, usaremos el plugin LuckPerms, esto permitirá ajustar permisos hacia jugadores y otros rangos. Los siguientes comandos se usan dentro del juego, asegurate de tener OP antes de usarlos.
"OP" significa tener TODOS los permisos, si crearás un servidor, tienes que tenerlo solo TÚ porque eres el dueño, no des este permiso a otros a menos que confies MUCHO en esta persona (ejemplo, otro owner). Date este permiso desde la consola poniendo \`op tunombre\`

Para crear un rango usa el comando \`/lp creategroup nombredelrango\`, esto te servirá por si quieres crear rangos como Owner, Mod, Vip..
Para editar permisos usa el comando \`/lp group nombredelgrupo permission set/unset nombredelpermiso\`, por ejemplo (EssentialsX) \`lp group default permission set essentials.msg\`
Para editar el color del grupo usa el comando \`lp group nombredelgrupo meta setprefix "&e&lnombredelgrupo ". Nota que tiene que ir entre comillas y con un espacio al final.\`
Para grandes cambios, recomiendo usar el comando \`lp editor\` que abre una interfaz web.

Esto es una muy pequeña guía de LuckPerms, si quieres entrar más a detalle puedes esperar la guía de LuckPerms.
\`\`\`

## Conclusión

Con esto tienes un servidor Paper funcional con plugins básicos. Cualquier duda, el Discord de StarGuides está disponible para abrir un ticket.
    `
  },

  // ── ARTÍCULOS CON CONTENIDO BÁSICO (por completar) ────────
  {
    id: 2,
    title: "Subnetting en Linux paso a paso",
    category: "it",
    excerpt: "Aprende a dividir redes, calcular máscaras y configurar subnetting en Linux con ejemplos prácticos.",
    date: "2026-04-27",
    readTime: "10 minutos",
    tags: ["Networking", "Linux", "Subnetting"],
    image: "🔗",
    content: `
# Subnetting en Linux paso a paso

## ¿Qué es el subnetting?

Subnetting es la técnica de dividir una red IP en subredes más pequeñas para mejorar el rendimiento, la seguridad y la organización.

## Conceptos clave

- Dirección de red: identifica la subred
- Máscara de subred: define qué parte es red y qué parte es host
- Broadcast: dirección final de cada subred
- Hosts útiles: direcciones disponibles para dispositivos

## Ejemplo práctico

Dividir la red 192.168.1.0/24 en 4 subredes iguales:

\`\`\`
Red original:  192.168.1.0/24  → 256 direcciones
Nueva máscara: /26             → 64 direcciones por subred

Subred 1: 192.168.1.0/26    (hosts: .1 a .62)
Subred 2: 192.168.1.64/26   (hosts: .65 a .126)
Subred 3: 192.168.1.128/26  (hosts: .129 a .190)
Subred 4: 192.168.1.192/26  (hosts: .193 a .254)
\`\`\`

## Configurar en Ubuntu con Netplan

\`\`\`yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses:
        - 192.168.1.10/26
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
\`\`\`

Aplicar cambios:

\`\`\`bash
sudo netplan apply
ip addr show eth0
ip route show
\`\`\`

## Verificar conectividad

\`\`\`bash
# Ping dentro de la misma subred
ping 192.168.1.5

# Verificar ruta hacia internet
traceroute 8.8.8.8

# Ver tabla de rutas completa
ip route show table all
\`\`\`
    `
  },

  {
    id: 3,
    title: "Crear una API REST con Node.js y Express",
    category: "web-dev",
    excerpt: "Construye una API REST profesional con Node.js, Express, middleware de autenticación y buenas prácticas.",
    date: "2026-04-26",
    readTime: "12 minutos",
    tags: ["Node.js", "Express", "Backend", "API"],
    image: "⚙️",
    content: `
# Crear una API REST con Node.js y Express

## Setup inicial

\`\`\`bash
mkdir mi-api && cd mi-api
npm init -y
npm install express dotenv cors helmet morgan
npm install -D nodemon
\`\`\`

## Estructura del proyecto

\`\`\`
mi-api/
├── src/
│   ├── routes/
│   │   └── api.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── .env
└── package.json
\`\`\`

## Servidor base

\`\`\`javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor en puerto', PORT));
\`\`\`

## Middleware de autenticación básico

\`\`\`javascript
// middleware/auth.js
export const requireAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  // Aquí validarías el JWT
  next();
};
\`\`\`

## Variables de entorno

\`\`\`bash
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_secreto_seguro_aqui
\`\`\`
    `
  },

  {
    id: 4,
    title: "Optimizar el rendimiento de tu servidor Paper",
    category: "minecraft",
    excerpt: "Técnicas avanzadas para mejorar el TPS, reducir el lag y hacer que tu servidor corra como seda.",
    date: "2026-04-25",
    readTime: "9 minutos",
    tags: ["Performance", "TPS", "Optimization", "Paper"],
    image: "⚡",
    content: `
# Optimizar el rendimiento de tu servidor Paper

## Diagnóstico previo

Antes de optimizar, hay que saber qué está causando el problema:

\`\`\`bash
# Ver TPS en tiempo real (20 = perfecto, < 18 = problema)
/tps

# Generar reporte de rendimiento
/timings report

# Ver entidades en el mundo actual
/paper entity list
\`\`\`

## paper-world-defaults.yml

Este archivo controla la mayor parte del rendimiento:

\`\`\`yaml
chunks:
  max-auto-save-chunks-per-tick: 24
  prevent-moving-into-unloaded-chunks: true

entities:
  spawning:
    spawn-limits:
      monsters: 70
      animals: 10
      water-animals: 5
    despawn-ranges:
      ambient:
        hard: 128
        soft: 32
      monsters:
        hard: 128
        soft: 32

tick-rates:
  grass-spread: 4
  container-update: 1
  sensor:
    villager:
      secondarypoisensor: 40
      nearestbedsensor: 80
\`\`\`

## Flags JVM recomendadas

\`\`\`bash
java -Xmx4G -Xms4G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -jar paper.jar nogui
\`\`\`

## Plugins que mejoran el rendimiento

- ClearLag: limpia entidades automáticamente
- Chunky: pre-genera chunks para evitar lag al explorar
- FarmControl: limita farms de mobs abusivas
    `
  },

  {
    id: 5,
    title: "Automatización con Bash Scripts en Linux",
    category: "it",
    excerpt: "Aprende a escribir scripts Bash profesionales para automatizar backups, monitoreo y tareas repetitivas.",
    date: "2026-04-24",
    readTime: "9 minutos",
    tags: ["Bash", "Automation", "Linux", "Cron"],
    image: "🤖",
    content: `
# Automatización con Bash Scripts en Linux

## Fundamentos de Bash

\`\`\`bash
#!/bin/bash
# Siempre empieza con el shebang

# Variables
NOMBRE="StarGuides"
FECHA=$(date +%Y-%m-%d)

# Condicional
if [ -f "/ruta/archivo.txt" ]; then
  echo "El archivo existe"
else
  echo "No existe"
fi

# Bucle
for i in {1..5}; do
  echo "Iteración $i"
done
\`\`\`

## Script de backup automático

\`\`\`bash
#!/bin/bash
# backup.sh — Backup automático del servidor Minecraft

SERVIDOR="/home/minecraft/server"
DESTINO="/home/minecraft/backups"
FECHA=$(date +%Y%m%d_%H%M%S)
ARCHIVO="backup_$FECHA.tar.gz"
MAXIMO_BACKUPS=7

mkdir -p "$DESTINO"

echo "Iniciando backup: $ARCHIVO"
tar -czf "$DESTINO/$ARCHIVO" "$SERVIDOR" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "Backup completado exitosamente"
else
  echo "ERROR: El backup falló"
  exit 1
fi

# Eliminar backups viejos (más de 7 días)
find "$DESTINO" -name "backup_*.tar.gz" -mtime +$MAXIMO_BACKUPS -delete
echo "Limpieza completada. Backups actuales:"
ls -lh "$DESTINO"
\`\`\`

## Programar con Cron

\`\`\`bash
# Editar crontab
crontab -e

# Formato: minuto hora día mes día_semana comando
# Backup cada día a las 3:00 AM
0 3 * * * /home/minecraft/backup.sh >> /home/minecraft/backup.log 2>&1

# Reiniciar servidor cada lunes a las 4:00 AM
0 4 * * 1 systemctl restart minecraft

# Ver crons activos
crontab -l
\`\`\`

## Script de monitoreo de recursos

\`\`\`bash
#!/bin/bash
# monitor.sh — Alerta si CPU o RAM superan el límite

CPU_LIMITE=80
RAM_LIMITE=90

CPU=\$(top -bn1 | grep "Cpu(s)" | awk '{print int(\$2)}')
RAM=\$(free | awk '/Mem/ {printf "%.0f", \$3/\$2*100}')

if [ "$CPU" -gt "$CPU_LIMITE" ]; then
  echo "ALERTA: CPU al \${CPU}% — \$(date)" >> /var/log/monitor.log
fi

if [ "$RAM" -gt "$RAM_LIMITE" ]; then
  echo "ALERTA: RAM al \${RAM}% — \$(date)" >> /var/log/monitor.log
fi
\`\`\`
    `
  },

  {
    id: 6,
    title: "React con Tailwind: componentes que escalan",
    category: "web-dev",
    excerpt: "Guía práctica para construir un sistema de componentes reutilizables con React 18 y Tailwind CSS.",
    date: "2026-04-23",
    readTime: "11 minutos",
    tags: ["React", "Tailwind", "Componentes", "Frontend"],
    image: "🎨",
    content: `
# React con Tailwind: componentes que escalan

## Setup con Vite

\`\`\`bash
npm create vite@latest mi-app -- --template react
cd mi-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configura tailwind.config.js:

\`\`\`javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#ffd060', dark: '#c8941a' }
      }
    }
  },
  plugins: []
}
\`\`\`

## Componente Button reutilizable

\`\`\`jsx
const variants = {
  primary: 'bg-brand text-black font-bold hover:shadow-brand/40 hover:shadow-lg',
  secondary: 'border border-brand/40 text-brand hover:bg-brand/10',
  ghost: 'text-white/60 hover:text-white',
};

export function Button({ children, variant = 'primary', size = 'md', ...props }) {
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5', lg: 'px-8 py-4 text-lg' };
  return (
    <button
      className={\`inline-flex items-center gap-2 rounded transition-all \${variants[variant]} \${sizes[size]}\`}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## Custom Hook para fetch

\`\`\`jsx
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Estructura de proyecto escalable

\`\`\`
src/
├── components/     # Componentes reutilizables
├── pages/          # Páginas completas
├── hooks/          # Custom hooks
├── utils/          # Funciones helpers
├── data/           # Datos estáticos o mocks
└── styles/         # CSS global
\`\`\`
    `
  },

  {
    id: 7,
    title: "Construir hábitos que realmente duran",
    category: "humanos",
    excerpt: "La ciencia detrás de los hábitos: cómo el cerebro los forma, cómo romper los malos y cómo instalar los buenos.",
    date: "2026-04-22",
    readTime: "8 minutos",
    tags: ["Hábitos", "Neurociencia", "Productividad"],
    image: "🧠",
    content: `
# Construir hábitos que realmente duran

## Por qué los hábitos son tan poderosos

El cerebro automatiza todo lo que repites con frecuencia. Cuando algo se vuelve hábito, el córtex prefrontal (la parte que piensa) delega el control a los ganglios basales. Resultado: lo haces sin esfuerzo consciente.

Esto puede trabajar a tu favor o en tu contra.

## El loop del hábito

Todo hábito sigue el mismo patrón de 3 pasos:

- Señal: el disparador que activa el comportamiento
- Rutina: la acción que realizas
- Recompensa: el beneficio que refuerza el ciclo

Para instalar un nuevo hábito, necesitas diseñar los tres elementos deliberadamente.

## Regla del 2 por ciento

James Clear habla del concepto de reducir el hábito hasta que sea absurdamente fácil:

- Quieres leer más → empieza con 2 páginas por día
- Quieres hacer ejercicio → empieza con 5 minutos
- Quieres meditar → empieza con 2 respiraciones profundas

El objetivo no es el desempeño del día uno. Es aparecer todos los días.

## Apilar hábitos (Habit Stacking)

Conecta el nuevo hábito a uno que ya tienes automatizado:

\`\`\`
"Después de [HÁBITO EXISTENTE], haré [NUEVO HÁBITO]"

Ejemplos:
- Después de servir mi café, leeré 5 minutos
- Después de abrir mi laptop, escribiré mis 3 prioridades del día
- Después de ducharme, haré 10 flexiones
\`\`\`

## Diseñar el entorno

La mayoría de decisiones no las toma tu fuerza de voluntad. Las toma tu entorno.

- Si el libro está en tu mesita de noche, lo leerás más
- Si el teléfono no está en tu cuarto, dormirás mejor
- Si la comida chatarra no está a la vista, la comerás menos

Rediseña tu entorno antes de depender de la disciplina.

## Seguimiento

Marcar un calendario físico es sorprendentemente efectivo. El objetivo es "no romper la racha". Un simple punto por día activa el mismo sistema de recompensa en el cerebro que más complejo.

No importa si el día fue imperfecto. Lo importante es no saltarse dos días seguidos.
    `
  },

  {
    id: 8,
    title: "Cómo recuperar el enfoque en la era de la distracción",
    category: "humanos",
    excerpt: "El multitasking destruye tu productividad. Aquí están las técnicas respaldadas por neurociencia para recuperar tu concentración.",
    date: "2026-04-21",
    readTime: "6 minutos",
    tags: ["Enfoque", "Deep Work", "Productividad"],
    image: "🎯",
    content: `
# Cómo recuperar el enfoque en la era de la distracción

## El costo real del multitasking

Cada vez que cambias de tarea, el cerebro necesita tiempo para "recargar" el contexto anterior. Esto se llama attention residue y puede costar entre 15 y 25 minutos de concentración real.

Si revisas el teléfono 30 veces al día mientras trabajas, técnicamente nunca entraste en modo de trabajo profundo.

## Deep Work (Trabajo Profundo)

Cal Newport define el trabajo profundo como: esfuerzo cognitivo intenso en un estado libre de distracciones, llevado al límite de tus capacidades.

Es la habilidad más valiosa de la economía moderna. Y se está volviendo más escasa.

## Bloques de enfoque

En vez de intentar concentrarte "todo el día", trabaja en bloques:

- Bloque de 90 minutos de trabajo profundo
- 15-20 minutos de descanso activo (caminar, no pantalla)
- Repetir 2-3 veces por día

Empieza con 45 minutos si 90 te parece mucho. Lo importante es la consistencia.

## Protocolo de inicio de sesión

El cerebro necesita señales para cambiar de modo. Crea un ritual de arranque:

- Cierra todas las pestañas no relacionadas
- Activa modo avión o silencia notificaciones
- Pon música sin letra o ruido blanco
- Define en papel: "En este bloque voy a hacer X"

Cuando haces esto mismo cada vez, el cerebro aprende a entrar en modo concentración más rápido.

## Gestionar el teléfono

El teléfono no es el problema. Las notificaciones son el problema.

- Desactiva todas las notificaciones excepto llamadas
- Usa el teléfono de forma intencional, no reactiva
- Carga el teléfono fuera de tu habitación por las noches

## La regla de los 2 minutos para el enfoque

Si tu mente divaga hacia algo que "tienes que hacer", escríbelo en papel y vuelve. No lo hagas en ese momento. La lista existe para que tu cerebro suelte la tarea sin perderla.
    `
  }

];

// ── CATEGORÍAS ─────────────────────────────────────────────
export const categories = [
  { id: 'minecraft', name: 'Minecraft Servers', icon: '🖥️', description: 'Paper, plugins, troubleshooting y optimización', color: 'cyan' },
  { id: 'it',        name: 'IT & Networking',   icon: '🔗', description: 'Subnetting, protocolos, Linux y automatización', color: 'magenta' },
  { id: 'web-dev',   name: 'Web Development',   icon: '⚙️', description: 'Frontend, backend, APIs y arquitectura web',    color: 'lime' },
  { id: 'humanos',   name: 'HumanOS',           icon: '🧠', description: 'Desarrollo personal, hábitos, mente y cuerpo', color: 'purple' },
];

// ── BLOG POSTS ─────────────────────────────────────────────
export const blogPosts = [
  { id: 1, title: "Cómo empecé a administrar servidores desde cero",        excerpt: "Mi historia real: Paper, Pterodactyl, Wings en Ubuntu. Lo que nadie te cuenta al principio.",       date: "2026-04-28", readTime: "5 minutos", tags: ["Personal", "Minecraft", "Historia"],  image: "📖" },
  { id: 2, title: "3 errores que cometí aprendiendo networking",             excerpt: "Confesiones reales de un estudiante de IT. Estos errores me costaron horas de frustración.",          date: "2026-04-25", readTime: "4 minutos", tags: ["Networking", "Errores", "Aprendizaje"], image: "⚠️" },
  { id: 3, title: "Por qué enseñar es la mejor forma de aprender",           excerpt: "Cuando le explicas algo a alguien, lo entiendes mejor tú mismo. La ciencia detrás de esto.",          date: "2026-04-22", readTime: "3 minutos", tags: ["Aprendizaje", "Enseñanza", "Personal"], image: "💡" },
  { id: 4, title: "Herramientas que uso todos los días como admin",          excerpt: "Mi stack diario: desde monitoreo hasta automatización. Todo lo que simplifica mi vida.",             date: "2026-04-19", readTime: "6 minutos", tags: ["Tools", "Productividad", "Admin"],     image: "🛠️" },
];

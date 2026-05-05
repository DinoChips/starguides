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

> **Esta guía asume que usas un host con panel Pterodactyl.** Si usas otro panel (Multicraft, AMP, etc.), los nombres de las secciones pueden variar, pero los pasos son equivalentes.

Paper es el fork de Minecraft más utilizado para servidores de comunidad. Ofrece mejor rendimiento que Spigot y una API más completa. Esta guía está pensada para quienes parten desde cero, sin experiencia previa necesaria.

Paper no es el único fork disponible; existen otros como Spigot, Purpur, Pufferfish y Forge. La elección depende del uso que quieras darle a tu servidor. El más versátil y recomendado para la mayoría de casos es Paper, que es el que usaremos aquí.

## Requisitos previos

Antes de comenzar, asegúrate de contar con lo siguiente:

- Un servidor o VPS con panel Pterodactyl
- Al menos 2 GB de RAM (se recomiendan 4 GB si planeas usar plugins)
- Java 21 configurado en el panel de tu servidor (la mayoría de hosts lo ofrecen como opción al crear el servidor)

## Paso 1: Obtener el servidor o VPS

Un servidor para Minecraft puede contratarse en muchos lugares. Hay hosts especializados en Minecraft con distintos precios y características, así que busca el que mejor se adapte a tus necesidades y presupuesto.

Mis recomendaciones personales son:

- [Bloom Host](https://bloom.host/)
- [Holy Nodes](https://holynodes.com/minecraft)
- [Tect Host](https://tect.host/)

Están ordenadas por calidad según mi experiencia. Si estás empezando, **Tect Host** es la opción más accesible. Si ya tienes algo de experiencia, puedes considerar las otras dos.

## Paso 2: Descargar Paper

Para descargar Paper, basta con buscar "PaperMC" en Google. Si quieres ir directo, aquí tienes el enlace: https://papermc.io/downloads/paper

En esta guía utilizaremos la versión **1.21.4**. Puedes usar la que prefieras o la que mejor se adapte a tus necesidades.

## Paso 3: Instalar Paper en el servidor

Una vez descargado el \`.jar\` de Paper, el siguiente paso es instalarlo en tu servidor.

Ve al gestor de archivos de tu servidor. Si es un servidor nuevo, la carpeta debería estar vacía. Sube el \`.jar\` que descargaste (puedes arrastrarlo directamente).

Una vez subido, dirígete al apartado **Startup** y verifica que el campo **SERVER JAR FILE** coincida exactamente con el nombre del archivo que subiste. Por ejemplo:

\`\`\`
paper-1.21.4.jar
\`\`\`

## Paso 4: Iniciar el servidor

Con el \`.jar\` configurado, inicia el servidor haciendo clic en el botón de arranque (el botón verde en la consola de tu panel).

La primera vez aparecerá un aviso del **EULA**, los términos de uso de Mojang que debes aceptar para poder arrancar el servidor. Es posible que tras aceptarlos el servidor se detenga; simplemente vuelve a iniciarlo.

## Paso 5: Instalar plugins esenciales (opcional)

Con el servidor funcionando, puedes instalar plugins desde la carpeta **plugins** en el gestor de archivos. Para descargarlos, busca en plataformas como [Modrinth](https://modrinth.com), [SpigotMC](https://www.spigotmc.org) o [Bukkit](https://dev.bukkit.org). Una búsqueda como "NombreDelPlugin spigot" o "NombreDelPlugin plugin minecraft" suele ser suficiente.

### LuckPerms (permisos)
El estándar para la gestión de permisos en servidores de Minecraft. Descárgalo desde https://luckperms.net/

### EssentialsX (comandos básicos)
Añade /home, /warp, /tpa y más de 200 comandos adicionales. Descárgalo desde https://essentialsx.net/downloads — asegúrate de instalar la versión **Stable Release**, no la *Development Build*.

### WorldGuard (protección de zonas)
Indispensable para proteger el spawn y otras zonas importantes. Descárgalo desde https://modrinth.com/plugin/worldguard/versions

## Paso 6: Configuración básica del servidor

Edita el archivo \`server.properties\` desde el gestor de archivos para ajustar los valores básicos:

\`\`\`properties
# Nombre del servidor (aparece en la lista de servidores)
motd=Mi servidor de Minecraft

# Modo de juego por defecto
gamemode=survival

# Máximo de jugadores simultáneos
max-players=50

# true = solo cuentas premium (Mojang). false = permite cuentas no premium también.
# Si pones false, instala un plugin de seguridad como nLogin.
online-mode=true

# Desactiva el requisito de chat firmado (recomendado)
enforce-secure-profile=false

# Distancia de simulación: cuántos chunks procesa el servidor alrededor de cada jugador
simulation-distance=5

# Distancia de renderizado: cuántos chunks ve el jugador
view-distance=8
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
\`\`\`

## Paso 7: Configurar permisos con LuckPerms

Los siguientes comandos se ejecutan dentro del juego. Antes de usarlos, asegúrate de tener OP.

Para darte OP, ejecuta este comando desde la **consola** de tu panel (no desde el juego):

\`\`\`
op tunombre
\`\`\`

> El OP otorga todos los permisos del servidor. Otórgalo solo a personas de absoluta confianza.

Comandos principales de LuckPerms:

- Crear un rango: \`/lp creategroup nombredelrango\`
- Añadir un permiso a un rango: \`/lp group nombredelgrupo permission set nombredelpermiso\`
- Quitar un permiso: \`/lp group nombredelgrupo permission unset nombredelpermiso\`
- Cambiar el prefijo de un rango: \`/lp group nombredelgrupo meta setprefix "&e&lnombredelgrupo "\` (entre comillas y con un espacio al final)
- Abrir el editor web: \`/lp editor\`

Esta es una introducción básica a LuckPerms. Si quieres profundizar más, puedes esperar la guía completa dedicada a este plugin.

## Conclusión

Con esto tienes un servidor Paper completamente funcional con los plugins esenciales configurados. Si tienes alguna duda, el Discord de StarGuides está disponible para abrir un ticket.

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

## ¿Qué problema resuelve el subnetting?

Cuando una red es muy grande:
- hay más tráfico
- es difícil de organizar
- es menos segura

Solución:
👉 dividir la red en subredes más pequeñas

## Cómo funciona una IP

Una dirección IP tiene dos partes:

- Red → identifica la subred
- Host → identifica el dispositivo

Ejemplo:

IP: 192.168.1.10  
Máscara: /24  

👉 Los primeros 24 bits son la red  
👉 El resto son hosts  

## Qué significa /24, /26, etc.

No es magia.

- /24 → 256 direcciones
- /26 → 64 direcciones

👉 Más bits para red = menos hosts disponibles

## Cómo dividir una red (proceso mental)

Red base:
192.168.1.0/24

Quieres:
4 subredes

Paso 1: cuántas subredes necesitas → 4  
Paso 2: cuántos bits necesitas → 2 (2² = 4)  
Paso 3: nueva máscara → /26  

## Resultado

\`\`\`
192.168.1.0/26    (hosts: .1 a .62)
192.168.1.64/26   (hosts: .65 a .126)
192.168.1.128/26  (hosts: .129 a .190)
192.168.1.192/26  (hosts: .193 a .254)
\`\`\`

## Cómo saber dónde empieza cada subred

👉 salto = tamaño de subred

64 → 0, 64, 128, 192

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
// AÍ REST
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

# La opción MÁS recomendable, usa el plugin Spark
/spark profiler start --timeout 600 (600s = 10m)
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

- ClearLag: limpia entidades automáticamente. (También existe una función de eliminar entidades en spigot.yml-item-despawn-rate)
- Chunky: pre-genera chunks para evitar lag al explorar
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
  {
    id: 1,
    title: "Cómo empecé a administrar servidores desde cero",
    excerpt: "Mi historia real: Paper, Pterodactyl, Wings en Ubuntu. Lo que nadie te cuenta al principio.",
    date: "2026-04-28",
    readTime: "5 minutos",
    tags: ["Personal", "Minecraft", "Historia"],
    image: "📖",
    content: `
# Cómo pasé de no entender nada a montar servidores funcionales

No empecé por curiosidad ni por dinero.

Empecé porque el primer servidor de Minecraft en el que jugué empezó a morir.

Cada vez entraba menos gente, todo se sentía abandonado, y eventualmente cerró. En ese punto no quise buscar otro. Quise hacer el mío.

Sin saber absolutamente nada.

## El inicio: copiar sin entender

Mi primer “servidor” fue en Aternos, en 2020.

Y como la mayoría, empecé haciendo lo peor que puedes hacer: instalar plugins sin entenderlos.

Entraba a páginas de Spigot, Bukkit, Discords… y todo parecía otro idioma. Cada cambio era abrir Google. Cada error era copiar y pegar soluciones sin saber qué hacían.

Un ejemplo claro: tardé casi un mes en crear mi primera región con WorldGuard.

Mientras tanto, protegía todo con ProtectionStones sin tener claro por qué funcionaba o qué estaba haciendo realmente.

El servidor tenía de todo:
- Lag constante  
- Caídas  
- Errores raros  
- Mundos corruptos  

Y lo peor: no entendía el motivo.

Estuve así unos cinco meses sin avanzar realmente.

## El punto donde deja de ser un juego

El cambio no vino por aprender más comandos.

Vino cuando la gente empezó a entrar… y a irse.

El servidor se veía mal, funcionaba peor, y no había razón para quedarse.

Ahí fue donde dejó de ser “probar cosas” y empezó a ser un problema que tenía que entender.

Fue la primera vez que me di cuenta de algo importante:

Configurar un plugin no es programación avanzada.  
Pero si no lo entiendes, lo parece.

## Dejar tutoriales y empezar a entender

Hubo un punto donde dejé de seguir tutoriales ciegamente.

No porque fueran inútiles, sino porque no estaban hechos para lo que yo quería.

Ahí empecé a hacer algo que cambia todo: leer documentación.

Las wikis de los plugins, las configuraciones completas, qué hacía cada opción.

Eso fue lo que realmente marcó diferencia.

No es lo más entretenido, pero es lo único que te saca del nivel básico.

## El salto: entender qué hay detrás

Mi segundo servidor fue el primero que consideré “serio”.

Ahí fue donde entré al mundo de los VPS y herramientas como Pterodactyl y Wings.

Y ese cambio no fue solo técnico, fue mental.

Hasta ese momento, todo lo reducía a:
“más RAM = mejor servidor”

Cuando pasas a un VPS, eso deja de tener sentido.

Empiezas a entender:
- Qué consume realmente recursos  
- Cómo afecta el entorno completo  
- Por qué el rendimiento no depende solo de números  

Es la primera vez que ves que Minecraft no es solo Minecraft. Hay todo un sistema detrás que normalmente un host oculta.

## Lo que nadie te dice al empezar

Hay dos cosas que marcan la diferencia y casi nadie menciona:

La primera es simple:  
Leer documentación vale más que ver diez tutoriales.

La segunda es incómoda:  
La mayoría de problemas no se arreglan comprando más potencia.

Un host premium o 32GB de RAM no arreglan una mala configuración.

Si no entiendes lo que estás haciendo, solo estás escalando errores.

## Después de eso

Con el tiempo, pasé de no entender nada a poder montar servidores funcionales, optimizados y vendibles.

No porque aprendiera “trucos”, sino porque empecé a entender cómo funciona todo en conjunto.

Y eso cambia completamente la forma en la que construyes.

## Lo que nadie te dice

**Vas a romper cosas.** Y está bien. Cada servidor que se cae por algo que hiciste mal es una lección que no se te olvida.

**La documentación es tu mejor amigo.** PaperMC, Pterodactyl, Ubuntu — todos tienen documentación buena. Úsala antes de preguntar en Discord.

**La comunidad ayuda, pero aprende a buscar primero.** El 80% de tus dudas ya las tuvo alguien antes.

## ¿Por qué sigo?

Porque cada vez que alguien entra a un servidor que yo mantuve y tiene una buena experiencia, eso vale. No es glamuroso, pero es real.

Si estás empezando: no te rindas. El primer mes es el más duro.
    `
  },
  {
    id: 2,
    title: "3 errores que cometí aprendiendo networking",
    excerpt: "Confesiones reales de un estudiante de IT. Estos errores me costaron horas de frustración.",
    date: "2026-04-25",
    readTime: "4 minutos",
    tags: ["Networking", "Errores", "Aprendizaje"],
    image: "⚠️",
    content: `
# 3 errores que cometí aprendiendo networking

Aprender networking es difícil. No porque sea imposible, sino porque es muy fácil memorizar sin entender. Estos son los tres errores que más me frenaron.

## Error 1: Memorizar subnetting sin entenderlo

Pasé semanas memorizando máscaras de subred. /24 = 255.255.255.0. /16 = 255.255.0.0. Lo sabía de memoria.

Pero si me preguntaban "¿cuántos hosts caben en una /26?", me bloqueaba.

**La solución:** aprender la lógica binaria detrás. Una vez que entiendes que /26 significa 6 bits para hosts = 2⁶ - 2 = 62 hosts, no necesitas memorizar nada.

## Error 2: Estudiar teoría sin practicar en Packet Tracer

Leía sobre OSPF, STP, VLANs. Entendía los conceptos. Pero cuando abrí Packet Tracer por primera vez y tuve que configurar algo real, no sabía ni por dónde empezar.

**La teoría sin práctica es inútil en networking.** Cada concepto que estudies, configúralo en el simulador el mismo día.

## Error 3: Ignorar la capa física

Me obsesioné con las capas 3 y 4. IP, TCP, rutas. Pero ignoré completamente la capa 1 y 2.

El resultado: cuando tuve que diagnosticar un problema real en una red, no entendía por qué fallaba la comunicación entre VLANs. El problema estaba en la configuración del trunk del switch — algo de capa 2 que había ignorado.

**Las capas bajas importan.** No las saltes.

## Conclusión

El aprendizaje de networking es iterativo. Vuelves a lo mismo varias veces, cada vez con más contexto, y cada vez lo entiendes mejor. No te frustres si al principio no encaja todo.
    `
  },
  {
    id: 3,
    title: "Por qué enseñar es la mejor forma de aprender",
    excerpt: "Cuando le explicas algo a alguien, lo entiendes mejor tú mismo. La ciencia detrás de esto.",
    date: "2026-04-22",
    readTime: "3 minutos",
    tags: ["Aprendizaje", "Enseñanza", "Personal"],
    image: "💡",
    content: `
# Por qué enseñar es la mejor forma de aprender

Existe una técnica de aprendizaje llamada la Técnica Feynman. La premisa es simple: si no puedes explicar algo con palabras sencillas, no lo entiendes de verdad.

## Cómo funciona en la práctica

Cuando estudias algo solo, puedes engañarte a ti mismo. Lees, asientes, piensas que entendiste. Pero cuando alguien te pregunta "¿y eso por qué funciona así?", te das cuenta de los agujeros en tu comprensión.

Enseñar fuerza esa honestidad.

## Mi experiencia personal

Empecé StarGuides justamente por esto. Escribir guías me obliga a entender cada paso antes de publicarlo. Si no soy capaz de explicarlo claramente, es porque yo mismo no lo tengo claro.

Cada guía que escribo me enseña más que estudiarla para mí solo.

## Cómo aplicarlo sin tener audiencia

No necesitas un blog o un canal de YouTube. Puedes:

- Explicarle algo a un amigo aunque no le interese
- Escribir notas como si se las explicaras a alguien más
- Grabarte en audio explicando un concepto

El punto es externalizar el conocimiento y forzarte a articularlo.

## La incomodidad es la señal

Si al intentar explicar algo te trabas, eso es información valiosa. Es exactamente lo que necesitas estudiar más.

No evites esa incomodidad. Es el motor del aprendizaje real.
    `
  }, 
];

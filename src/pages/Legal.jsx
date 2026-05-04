import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const TODAY = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

const TERMS = {
  slug: 'terminos',
  title: 'Términos y Condiciones',
  updated: TODAY,
  sections: [
    { n: '1', title: 'Aceptación de los Términos', body: 'Al acceder y utilizar este sitio web, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, debes dejar de usar el sitio inmediatamente.' },
    { n: '2', title: 'Descripción del Servicio', body: 'Este sitio proporciona contenido informativo, guías técnicas y acceso a una comunidad externa (Discord). Todo el contenido es de carácter general y educativo, y no constituye asesoramiento profesional de ningún tipo.' },
    { n: '3', title: 'Uso del Sitio', body: 'El usuario se compromete a:\n- No utilizar el sitio con fines ilegales o fraudulentos\n- No intentar vulnerar, hackear o comprometer la seguridad del sitio\n- No copiar, redistribuir ni comercializar el contenido sin autorización escrita previa\n- No realizar scraping masivo ni automatizado del sitio' },
    { n: '4', title: 'Contenido', body: 'Todo el contenido es proporcionado "tal cual", sin garantías de ningún tipo. No se garantiza que sea exacto, completo, actualizado ni libre de errores. El usuario es responsable de verificar la información antes de aplicarla.' },
    { n: '5', title: 'Limitación de Responsabilidad', body: 'El uso del contenido publicado en este sitio es bajo tu propio riesgo. El propietario del sitio no se hace responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la información proporcionada.' },
    { n: '6', title: 'Enlaces Externos', body: 'Este sitio puede contener enlaces a plataformas externas como Discord, GitHub o YouTube. No tenemos control sobre sus políticas, contenido ni disponibilidad. El acceso a sitios externos es bajo tu propia responsabilidad.' },
    { n: '7', title: 'Propiedad Intelectual', body: 'Todo el contenido original de este sitio (textos, guías, diseño) es propiedad de StarGuides. Queda prohibida su reproducción total o parcial sin autorización expresa.' },
    { n: '8', title: 'Modificaciones', body: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al ser publicados en esta página. El uso continuo del sitio implica la aceptación de los términos actualizados.' },
    { n: '9', title: 'Contacto', body: 'Para consultas relacionadas con estos términos, utiliza los canales disponibles en la sección de Contacto del sitio o accede al servidor de Discord.' },
  ]
};

const PRIVACY = {
  slug: 'privacidad',
  title: 'Política de Privacidad',
  updated: TODAY,
  sections: [
    { n: '1', title: 'Información que Recopilamos', body: 'Este sitio no solicita registro de usuario ni recopila datos personales directamente.\n\nSin embargo, como cualquier sitio web, pueden recopilarse datos de forma automática:\n- Dirección IP\n- Tipo de navegador y sistema operativo\n- Páginas visitadas y tiempo de visita\n- Datos técnicos de acceso\n\nEstos datos son manejados por el proveedor de hosting (Netlify) y no están bajo control directo de StarGuides.' },
    { n: '2', title: 'Uso de la Información', body: 'La información técnica recopilada automáticamente se utiliza únicamente para:\n- Mantener la seguridad y disponibilidad del sitio\n- Analizar el rendimiento general del sitio\n- Detectar y prevenir actividades maliciosas\n\nNo se comparten datos con terceros con fines comerciales.' },
    { n: '3', title: 'Cookies', body: 'Este sitio puede utilizar cookies técnicas estrictamente necesarias para su funcionamiento básico. No se utilizan cookies de rastreo publicitario ni de terceros con fines de marketing.' },
    { n: '4', title: 'Servicios de Terceros', body: 'El sitio incluye enlaces a servicios externos como Discord, YouTube y GitHub. Al acceder a estos servicios, estás sujeto a sus propias políticas de privacidad. No somos responsables por la recopilación de datos realizada por dichas plataformas.' },
    { n: '5', title: 'Seguridad', body: 'Se aplican medidas razonables para proteger la integridad del sitio. Sin embargo, ningún sistema en internet puede garantizar seguridad absoluta. Usamos HTTPS, headers de seguridad y controles de acceso para proteger la infraestructura.' },
    { n: '6', title: 'Derechos del Usuario', body: 'Dado que no recopilamos datos personales identificables directamente, no existe un perfil de usuario que gestionar. Puedes dejar de usar el sitio en cualquier momento si no estás de acuerdo con esta política.' },
    { n: '7', title: 'Cambios en esta Política', body: 'Esta política puede actualizarse en cualquier momento. Los cambios se publicarán en esta misma página con la fecha de actualización actualizada.' },
    { n: '8', title: 'Contacto', body: 'Para cualquier consulta sobre privacidad, puedes contactar a través del servidor de Discord de StarGuides o mediante el formulario de contacto del sitio.' },
  ]
};

export function Legal() {
  const { type } = useParams();
  const doc = type === 'terminos' ? TERMS : PRIVACY;
  useEffect(() => { window.scrollTo(0, 0); }, [type]);

  return (
    <div className="sg-page">
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '60px 5% 120px', position: 'relative', zIndex: 1 }}>

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,200,80,0.5)', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 48 }}
          onMouseEnter={e => e.currentTarget.style.color = '#ffd060'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,200,80,0.5)'}>
          ← VOLVER AL INICIO
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div className="label-mono" style={{ marginBottom: 20 }}>// LEGAL</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 20 }}>
            {doc.title}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(200,210,255,0.35)', fontFamily: 'var(--font-mono)' }}>
            Última actualización: {doc.updated}
          </p>
          <div className="gold-line" style={{ marginTop: 32 }} />
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {doc.sections.map(s => (
            <div key={s.n}>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: 'rgba(255,200,80,0.75)', letterSpacing: '0.06em', marginBottom: 14 }}>
                {s.n}. {s.title.toUpperCase()}
              </h2>
              <div style={{ fontSize: 15, color: 'rgba(200,210,255,0.6)', lineHeight: 1.85 }}>
                {s.body.split('\n').map((line, i) => {
                  if (!line.trim()) return null;
                  if (line.startsWith('- ')) return (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                      <span style={{ color: 'rgba(255,200,80,0.4)', marginTop: 2 }}>—</span>
                      <span>{line.replace('- ', '')}</span>
                    </div>
                  );
                  return <p key={i} style={{ marginBottom: 12 }}>{line}</p>;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Switch between docs */}
        <div style={{ marginTop: 80, padding: '32px', border: '1px solid rgba(255,200,80,0.1)', borderRadius: 8, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'rgba(200,210,255,0.4)', fontFamily: 'var(--font-mono)' }}>Ver también:</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/legal/terminos" style={{ fontSize: 13, color: type === 'terminos' ? '#ffd060' : 'rgba(200,210,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Términos y Condiciones
            </Link>
            <span style={{ color: 'rgba(255,200,80,0.2)' }}>·</span>
            <Link to="/legal/privacidad" style={{ fontSize: 13, color: type === 'privacidad' ? '#ffd060' : 'rgba(200,210,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Política de Privacidad
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

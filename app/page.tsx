'use client';

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type Scene = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  action: string;
  caption: string;
  imageHint: string;
  kind: string;
  photo?: string;
};

const scenes: Scene[] = [
  {
    eyebrow: 'Nuestra historia',
    title: 'Amorcito… vení.',
    paragraphs: [
      'Quiero que por unos minutos vuelvas conmigo al principio de todo.',
      'Porque antes de preguntarte algo importante… quiero recordarte cómo llegamos hasta acá.',
    ],
    action: 'Empezar ❤️',
    caption: 'El comienzo de todo',
    imageHint: 'Una foto que represente el comienzo',
    kind: 'cover',
  },
  {
    eyebrow: 'Capítulo 01 · El comienzo',
    title: 'Todo empezó en Blue',
    paragraphs: [
      'Quién iba a decir que una noche en un boliche llamado Blue iba a terminar cambiándome la vida.',
      'Entre música, gente y una noche que parecía ser una más… apareciste vos.',
      'Y desde que te conocí hubo algo diferente. No sabía explicar exactamente qué era. Solo sabía cómo me hacías sentir.',
    ],
    action: 'Seguir nuestra historia',
    caption: 'La noche en que cambió todo',
    imageHint: 'Una foto de aquella época o de Blue',
    kind: 'blue',
  },
  {
    eyebrow: 'Capítulo 02 · Algo empezó ahí',
    title: 'Cada vez quería un poquito más de vos',
    paragraphs: [
      'No me enamoré de una fecha, de un lugar ni de un momento perfecto.',
      'Me enamoré de cómo me sentía cuando estaba con vos. De esa tranquilidad. De esas ganas de seguir estando ahí.',
      'De sentir que había encontrado a alguien distinto. Y sin darme cuenta… cada vez quería un poquito más de vos.',
    ],
    action: 'Seguir',
    caption: 'Cuando empezó a sentirse distinto',
    imageHint: 'Una foto de los primeros meses juntos',
    kind: 'spark',
  },
  {
    eyebrow: 'Capítulo 03 · Tus ojos',
    title: 'Como si pudiera ver tu alma',
    paragraphs: [
      'Hay un momento que nunca voy a olvidar.',
      'Mirarte a los ojos y sentir algo que no sé explicar del todo. Fue como si por un instante pudiera mirar mucho más profundo.',
      'Y ahí sentí algo en todo el cuerpo. Algo que me decía que vos no ibas a ser simplemente una persona más en mi vida.',
    ],
    action: 'Continuar',
    caption: 'Esa mirada que nunca olvidé',
    imageHint: 'Un primer plano o una foto mirándose',
    kind: 'eyes',
  },
  {
    eyebrow: 'Capítulo 04 · Nuestro día',
    title: '13 de octubre de 2016',
    paragraphs: [
      'Y así empezó oficialmente nuestro camino.',
      'Una fecha que en ese momento era solamente nuestra. Y que hoy significa muchísimo más.',
      'Desde ese día nos reímos, nos enojamos, aprendimos, nos equivocamos, crecimos y, sobre todo… seguimos eligiéndonos.',
    ],
    action: 'Recordar todo lo que vino',
    caption: 'El día en que empezó nuestro camino',
    imageHint: 'Una foto de 2016 o de su primer aniversario',
    kind: 'date',
  },
  {
    eyebrow: 'Capítulo 05 · Nosotros contra todo',
    title: 'Elegimos agarrarnos más fuerte',
    paragraphs: [
      'No todo fue fácil. Pasamos momentos buenos y también momentos que nos pusieron a prueba.',
      'Pero cuando miro hacia atrás, no pienso solamente en lo difícil. Pienso en que lo atravesamos juntos.',
      'En todas las veces que podríamos habernos soltado… y elegimos agarrarnos un poquito más fuerte.',
    ],
    action: 'Seguir juntos',
    caption: 'Siempre del mismo lado',
    imageHint: 'Una foto que hable de compañerismo',
    kind: 'together',
  },
  {
    eyebrow: 'Capítulo 06 · Nuestro primer viaje',
    title: 'Nosotros dos y el mar',
    paragraphs: [
      'Lejos de todo. Compartiendo nuestros tiempos, nuestras pavadas, nuestros planes.',
      'Y creando uno de esos recuerdos que quedan guardados para siempre.',
      'Porque al final entendí algo: el lugar puede ser increíble… pero si estoy con vos, siempre termina siendo mejor.',
    ],
    action: 'Seguir viajando',
    caption: 'Nuestro primer viaje solos',
    imageHint: 'La foto favorita de ese viaje al mar',
    kind: 'ocean',
  },
  {
    eyebrow: 'Intermedio · Boludeo necesario 😏',
    title: 'Que el destino elija nuestra próxima cita',
    paragraphs: [
      'Después de tanta emoción… un pequeño recreo.',
      'Giramos la ruleta y lo que salga se cumple. No vale hacerse la boluda.',
    ],
    action: 'Guardar el plan y seguir',
    caption: 'Una nueva anécdota en camino',
    imageHint: 'La ruleta ya está lista',
    kind: 'play',
  },
  {
    eyebrow: 'Capítulo 07 · Lo que soñábamos',
    title: 'Un día dejó de ser un plan',
    paragraphs: [
      'Durante mucho tiempo hablamos de nuestro futuro. Teníamos sueños, planes, cosas que parecían estar lejos.',
      'Una de ellas era vivir juntos. Tener nuestro lugar. Nuestra casa. Nuestra vida.',
      'Y un día ese sueño dejó de ser un plan. Porque lo hicimos. Nos mudamos juntos.',
    ],
    action: 'Entrar a nuestra casa',
    caption: 'Nuestro lugar en el mundo',
    imageHint: 'Una foto de la mudanza o de su casa',
    kind: 'home',
  },
  {
    eyebrow: 'Capítulo 08 · Y después pasó esto…',
    title: 'Nuestro sueño viene en camino',
    paragraphs: [
      'Pero había otro sueño. Uno todavía más grande. Tener un bebé.',
      'Y ahora… mientras estás viendo esto… ese sueño ya viene en camino. ❤️',
      'Ya no somos solamente vos y yo. Estamos formando nuestra familia.',
    ],
    action: 'Seguir con el corazón lleno',
    caption: 'Ahora somos una familia',
    imageHint: 'La ecografía o una foto del bebé en camino',
    kind: 'baby',
  },
  {
    eyebrow: 'Capítulo 09 · Lo que amo de vos',
    title: 'Con vos entendí lo que es sentirse acompañado',
    paragraphs: [
      'Amo profundamente lo buena persona que sos. El amor que me das. La manera en la que siempre estás para mí.',
      'Cómo te convertiste en mi apoyo cuando las cosas pesan. Cómo sabés abrazarme incluso cuando no sé explicar lo que me pasa.',
      'Con vos entendí que amar también es eso: sentirse acompañado.',
    ],
    action: 'Acercarme un poquito más',
    caption: 'Mi compañera, siempre',
    imageHint: 'Una foto espontánea que muestre cómo es ella',
    kind: 'love',
  },
  {
    eyebrow: 'Capítulo 10 · Mi lugar favorito',
    title: 'Siempre termina siendo con vos',
    paragraphs: [
      'Hay algo tan simple que probablemente no sepas cuánto significa para mí.',
      'Cuando me abrazás y me decís: “Te amo mucho”, siento que no necesito estar en ningún otro lugar.',
      'Porque mi lugar favorito… siempre termina siendo con vos.',
    ],
    action: 'Quedarme un ratito acá',
    caption: 'Mi lugar favorito',
    imageHint: 'Una foto abrazados',
    kind: 'embrace',
  },
  {
    eyebrow: 'Capítulo 11 · Todo lo que todavía falta',
    title: 'Nos falta vivir muchísimo',
    paragraphs: [
      'Más viajes. Más abrazos. Más discusiones por alguna boludez. Más reconciliaciones.',
      'Más noches sin dormir. Probablemente pañales. Definitivamente muchos pañales. 😂',
      'Más sueños. Más nosotros.',
    ],
    action: 'Ir hacia todo lo que falta',
    caption: 'Todos nuestros próximos capítulos',
    imageHint: 'Una foto feliz y cotidiana de ustedes',
    kind: 'future',
  },
  {
    eyebrow: 'Capítulo 12 · Antes de preguntarte',
    title: 'Hay algo que nunca cambió',
    paragraphs: [
      'Desde aquella noche en Blue hasta este momento pasaron años. Pero nunca cambió cómo me hacés sentir.',
      'Sos mi amor. Mi compañera. Mi apoyo. La persona con la que construí mi hogar.',
      'Y ahora también… la persona con la que estoy formando una familia. Por eso hay algo que quiero preguntarte.',
    ],
    action: 'Estoy lista…',
    caption: 'Respirá hondo',
    imageHint: 'Una de las fotos más especiales de ustedes',
    kind: 'before',
  },
  {
    eyebrow: 'Nuestra próxima aventura',
    title: '¿Querés caminar conmigo toda la vida?',
    paragraphs: [
      'Amorcito… ya construimos tantos pedacitos de una vida juntos. Y yo quiero todos los que faltan.',
      'Los lindos. Los difíciles. Los inesperados. Los que todavía ni siquiera podemos imaginar.',
      '¿Querés seguir siendo la que me desarma… y caminar conmigo toda la vida?',
    ],
    action: '❤️ Sí, para siempre',
    caption: 'El comienzo de nuestro próximo capítulo',
    imageHint: 'La foto elegida para la propuesta',
    kind: 'proposal',
  },
  {
    eyebrow: 'Y esto recién empieza',
    title: 'Sabía que ibas a decir que sí. ❤️',
    paragraphs: [
      'De Blue… a nuestra casa. De nuestra casa… a nuestra familia.',
      'Y de nuestra historia hasta hoy… a todo lo que todavía nos queda por vivir.',
      'Te amo mucho, Amorcito.',
    ],
    action: 'Volver al comienzo',
    caption: 'Para siempre empieza acá',
    imageHint: 'La foto perfecta para cerrar la historia',
    kind: 'final',
  },
];

const musicVolumes = [0.18, 0.22, 0.3, 0.34, 0.46, 0.4, 0.5, 0.22, 0.5, 0.42, 0.38, 0.36, 0.42, 0.18, 0.58, 0.85];
const planOptions = [
  'Picnic improvisado',
  'Cena elegida por vos',
  'Noche de pelis y helado',
  'Escapada de un día',
  'Desayuno en la cama',
  'Cita sorpresa',
];
const heartSeeds = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 37) % 96}%`,
  delay: `${(index % 8) * 0.34}s`,
  duration: `${4.8 + (index % 5) * 0.55}s`,
  size: `${0.7 + (index % 4) * 0.22}rem`,
}));

const MUSIC_SRC = '/music.mp3';

export default function Home() {
  const [scene, setScene] = useState(0);
  const [musicAvailable, setMusicAvailable] = useState(false);
  const [musicStatus, setMusicStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 58, y: 12 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const wheelTimerRef = useRef<number | null>(null);

  const current = scenes[scene];
  const isWheel = scene === 7;
  const isProposal = scene === 14;
  const isFinal = scene === 15;

  const fadeTo = useCallback((target: number, duration = 1100) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
    const start = audio.volume;
    const steps = Math.max(1, Math.round(duration / 50));
    let step = 0;

    fadeTimerRef.current = window.setInterval(() => {
      step += 1;
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * (step / steps)));
      if (step >= steps && fadeTimerRef.current) {
        window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }, 50);
  }, []);

  const beginMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !musicAvailable) return;

    try {
      audio.volume = 0;
      await audio.play();
      setMusicStatus('playing');
      fadeTo(musicVolumes[scene]);
    } catch {
      setMusicStatus('idle');
    }
  }, [fadeTo, musicAvailable, scene]);

  const goNext = useCallback(() => {
    if (scene === 0) void beginMusic();
    if (scene < 14) setScene((currentScene) => currentScene + 1);
  }, [beginMusic, scene]);

  useEffect(() => {
    let active = true;
    fetch(MUSIC_SRC, { method: 'HEAD' })
      .then((response) => {
        if (active) setMusicAvailable(response.ok);
      })
      .catch(() => {
        if (active) setMusicAvailable(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (musicStatus === 'playing') fadeTo(musicVolumes[scene]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fadeTo, musicStatus, scene]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (window.innerWidth <= 760) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select')) return;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        goNext();
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setScene((currentScene) => Math.max(currentScene - 1, 0));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext]);

  useEffect(
    () => () => {
      if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
    },
    [],
  );

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !musicAvailable) return;

    if (musicStatus === 'playing') {
      audio.pause();
      setMusicStatus('paused');
      return;
    }

    try {
      await audio.play();
      setMusicStatus('playing');
      fadeTo(musicVolumes[scene], 500);
    } catch {
      setMusicStatus('idle');
    }
  };

  const spinWheel = () => {
    if (wheelSpinning) return;
    const selectedIndex = Math.floor(Math.random() * planOptions.length);
    const segment = 360 / planOptions.length;
    const target = 360 - (selectedIndex * segment + segment / 2);
    setWheelResult(null);
    setWheelSpinning(true);
    setWheelRotation((rotation) => rotation + 1440 + target);

    wheelTimerRef.current = window.setTimeout(() => {
      setWheelResult(planOptions[selectedIndex]);
      setWheelSpinning(false);
    }, 1900);
  };

  const moveNoButton = () => {
    setNoPosition({
      x: Math.round(4 + Math.random() * 52),
      y: Math.round(7 + Math.random() * 58),
    });
  };

  const acceptProposal = () => {
    setScene(15);
    if (musicStatus === 'playing') fadeTo(musicVolumes[15], 850);
  };

  const restart = () => {
    setScene(0);
    setWheelResult(null);
    setWheelRotation(0);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
    }
    setMusicStatus('idle');
  };

  const wheelStyle = {
    '--wheel-rotation': `${wheelRotation}deg`,
  } as CSSProperties;

  return (
    <main className={`story-shell scene-${current.kind}`}>
      {isFinal && (
        <div className="heart-rain" aria-hidden="true">
          {heartSeeds.map((heart, index) => (
            <span
              key={`${heart.left}-${index}`}
              style={
                {
                  '--heart-left': heart.left,
                  '--heart-delay': heart.delay,
                  '--heart-duration': heart.duration,
                  '--heart-size': heart.size,
                } as CSSProperties
              }
            >
              ♥
            </span>
          ))}
        </div>
      )}

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {musicAvailable && <audio ref={audioRef} src={MUSIC_SRC} preload="metadata" loop />}

      <header className="story-header">
        <span className="monogram" aria-label="Nuestra historia">
          N<span>♥</span>A
        </span>
        <div className="header-details">
          <span className="date-mark">13 · 10 · 2016</span>
          <button
            type="button"
            className="music-control"
            onClick={toggleMusic}
            disabled={!musicAvailable}
            title={musicAvailable ? 'Pausar o reproducir la música' : 'La música se agregará cuando compartas el archivo'}
          >
            <span aria-hidden="true">♫</span>
            {musicAvailable
              ? musicStatus === 'playing'
                ? 'Pausar'
                : 'Música'
              : 'Música pendiente'}
          </button>
        </div>
      </header>

      <section className={isFinal ? 'scene-card final-layout' : 'scene-card'} aria-live="polite">
        <div className="scene-copy" key={scene}>
          <p className="eyebrow">{current.eyebrow}</p>
          <h1>{current.title}</h1>
          <div className="gold-line" aria-hidden="true" />
          <div className="story-text">
            {current.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {isProposal ? (
            <div className="proposal-actions" aria-label="Elegí una respuesta">
              <button className="primary-action yes-action" type="button" onClick={acceptProposal}>
                ❤️ Sí, para siempre
              </button>
              <button
                className="no-action"
                type="button"
                style={{ left: `${noPosition.x}%`, top: `${noPosition.y}%` }}
                onPointerEnter={moveNoButton}
                onPointerDown={(event) => {
                  event.preventDefault();
                  moveNoButton();
                }}
                onFocus={moveNoButton}
                onClick={moveNoButton}
                aria-label="No, aunque este botón se va a escapar"
              >
                🙈 No
              </button>
              <button className="back-link" type="button" onClick={() => setScene(13)}>
                Volver un momento
              </button>
            </div>
          ) : isFinal ? (
            <button className="primary-action" type="button" onClick={restart}>
              Volver al comienzo
            </button>
          ) : (
            <div className="navigation-actions">
              {scene > 0 && (
                <button
                  className="secondary-action"
                  type="button"
                  onClick={() => setScene((currentScene) => Math.max(currentScene - 1, 0))}
                >
                  Atrás
                </button>
              )}
              <button
                className="primary-action"
                type="button"
                onClick={goNext}
                disabled={isWheel && !wheelResult}
              >
                {current.action}
              </button>
            </div>
          )}
        </div>

        {isWheel ? (
          <div className="wheel-panel">
            <div className="wheel-pointer" aria-hidden="true" />
            <div className={wheelSpinning ? 'plan-wheel spinning' : 'plan-wheel'} style={wheelStyle}>
              <span>Picnic</span>
              <span>Cena</span>
              <span>Pelis</span>
              <span>Escapada</span>
              <span>Desayuno</span>
              <span>Sorpresa</span>
            </div>
            <button className="spin-action" type="button" onClick={spinWheel} disabled={wheelSpinning}>
              {wheelSpinning ? 'Girando…' : 'Girar la ruleta'}
            </button>
            <div className="wheel-result" aria-live="polite">
              {wheelResult ? (
                <>
                  <strong>{wheelResult}</strong>
                  <p>Bueno… salió eso. Ahora hay que cumplirlo. No vale hacerse la boluda 😂❤️</p>
                </>
              ) : (
                <p>El destino todavía está pensando…</p>
              )}
            </div>
          </div>
        ) : (
          <div className={`memory-frame memory-${current.kind}`} aria-label={current.imageHint}>
            <div className="memory-glow" aria-hidden="true" />
            <span className="memory-number">{String(scene + 1).padStart(2, '0')}</span>
            {current.photo ? (
              <div
                className="memory-photo"
                role="img"
                aria-label={current.imageHint}
                style={{ backgroundImage: `url(${current.photo})` }}
              />
            ) : (
              <div className="memory-placeholder">
                <span className="tiny-heart">♥</span>
                <p>{current.imageHint}</p>
                <small>Espacio listo para su foto</small>
              </div>
            )}
            <p className="memory-caption">{current.caption}</p>
          </div>
        )}
      </section>

      <footer className="story-footer">
        <div className="progress" aria-label={`Escena ${scene + 1} de ${scenes.length}`}>
          {scenes.map((item, index) => (
            <span
              key={item.title}
              className={index === scene ? 'progress-dot active' : index < scene ? 'progress-dot visited' : 'progress-dot'}
              aria-hidden="true"
            />
          ))}
        </div>
        <p>{scene + 1} / {scenes.length} · En el celular, desplazate normalmente y usá los botones para avanzar</p>
      </footer>
    </main>
  );
}


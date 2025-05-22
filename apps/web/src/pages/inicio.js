import {
  accentColor,
  modoOscuroOff,
  backgroundColorButton,
  fontSizeh1,
  fontSizeh2
} from '../lib/constants';
import {animateSpring} from '../lib/animations';
import {Layout} from '../components/layout';
import {Button} from '../components/button';
import {getSession, signOut} from '../lib/auth';

const datosBtn = [
  {
    icono: 'imagenes/calendario.svg',
    texto: 'Calendario',
    iconoModoOscuro: 'imagenes/calendarioBlanco.svg',
    alt: '',
    titulo: '',
    slug: '/Calendario'
  },
  {
    icono: 'imagenes/galeria.svg',
    texto: 'Galería',
    iconoModoOscuro: 'imagenes/galeriaBlanco.svg',
    alt: '',
    titulo: '',
    slug: '/Galeria'
  },
  {
    icono: 'imagenes/buzon.svg',
    texto: 'Buzón de sugerencias',
    iconoModoOscuro: 'imagenes/buzonBlanco.svg',
    alt: '',
    titulo: '',
    slug: '/Buzon'
  },
  {
    icono: 'imagenes/documentos.svg',
    texto: 'Documentos',
    iconoModoOscuro: 'imagenes/documentosBlanco.svg',
    alt: '',
    titulo: '',
    slug: '/Documentos'
  }
];

export const Inicio = {
  session: null,
  name: 'Usuario',
  oncreate: async () => {
    Inicio.session = await getSession();
    if (Inicio?.session?.name) {
      Inicio.name =
        Inicio.session.name[0].toUpperCase() + Inicio.session.name.slice(1);
    }
    m.redraw();
  },
  view: () =>
    m(Layout, [
      m(
        'div',
        {
          style: {
            postion: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            boxSizing: 'border-box'
          }
        },
        [
          m(
            'h1',
            {
              style: {
                fontSize: '3em',
                textAlign: 'center',
                marginBottom: '3vh',
                color: modoOscuroOff ? 'black' : 'white'
              }
            },
            `Bienvenido ${Inicio.name}!`
          ),
          m(
            'main',
            {
              style: {
                padding: '15px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                margin: '0 auto',
                maxWidth: '850px',
                boxSizing: 'border-box',
                justifyContent: 'center'
              }
            },
            datosBtn.map(btn =>
              m(
                'button',
                {
                  style: {
                    backgroundColor: backgroundColorButton,
                    minHeight: '300px',
                    flex: window.innerWidth < 850 ? '0 0 300px' : '0 0 400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: fontSizeh2,
                    padding: '10px',
                    border: `2px solid 
                          ${modoOscuroOff ? 'transparent' : accentColor}`,
                    borderRadius: '30px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    transform: 'scale(1)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    gap: '20px'
                  },
                  onfocus: e => {
                    (e.target.style.backgroundColor = accentColor),
                      (e.target.style.outline = 'none'),
                      animateSpring(e.target, 'scale', 1.05, 1, {
                        stiffness: 1020,
                        damping: 10,
                        mass: 1.5,
                        threshold: 0.01
                      });
                  },
                  onblur: e => (
                    (e.target.style.backgroundColor = backgroundColorButton),
                    (e.target.style.transform = 'scale(1)')
                  ),
                  onmouseenter: e => {
                    e.target.style.backgroundColor = accentColor;
                    animateSpring(e.target, 'scale', 1.05, 1, {
                      stiffness: 1020,
                      damping: 10,
                      mass: 1.5,
                      threshold: 0.01
                    });
                  },
                  onmouseleave: function (e) {
                    (e.target.style.backgroundColor = backgroundColorButton),
                      (e.target.style.transform = 'scale(1)');
                  },
                  onclick: function () {
                    m.route.set(btn.slug);
                  }
                },
                m(
                  'span',
                  {
                    style: {
                      width: '50%',
                      height: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  },
                  m('img', {
                    src: modoOscuroOff ? btn.icono : btn.iconoModoOscuro,
                    alt: 'Ir a ' + btn.texto,
                    style: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }
                  })
                ),
                m(
                  'span',
                  {
                    style: {
                      fontSize: fontSizeh1,
                      color: modoOscuroOff ? 'black' : 'white'
                    }
                  },
                  btn.texto
                )
              )
            )
          ),
          m(Button, {onclick: signOut}, 'Cerrar Sesión')
        ]
      )
    ])
};

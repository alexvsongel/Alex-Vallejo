import {
  backgroundColorButton,
  accentColor,
  modoOscuroOff,
  updateModoOscuro
} from '../lib/constants';

function botonModoOscuro() {
  return {
    view: () => {
      return m(
        'button',
        {
          role: 'switch',
          ariaLabel: modoOscuroOff
            ? 'Activar modo oscuro'
            : 'Desactivar modo oscuro',
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(3rem, 6vw, 5rem)',
            height: 'clamp(3rem, 6vw, 5rem)',
            cursor: 'pointer',
            transition: 'all 0.1s ease'
          },
          onclick: () => {
            localStorage.setItem('modoOscuro', !modoOscuroOff);
            updateModoOscuro();
            m.redraw();
          },
          onfocus: e => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: e => {
            e.target.style.outline = 'none';
            e.target.style.backgroundColor = 'transparent';
          },
          onmouseenter: e => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.outline = 'none';
          }
        },
        m('img', {
          src: modoOscuroOff
            ? 'imagenes/luna2.svg'
            : 'imagenes/modoOscuroBlanco.svg',
          style: {
            width: '70%',
            height: '70%',
            objectFit: 'contain'
          },
          alt: modoOscuroOff ? 'Activar modo oscuro' : 'Desactivar modo oscuro'
        })
      );
    }
  };
}

function botonInicio() {
  return {
    view: () => {
      return m(
        'button',
        {
          role: 'switch',
          ariaLabel: modoOscuroOff
            ? 'Activar modo oscuro'
            : 'Desactivar modo oscuro',
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(3rem, 6vw, 5rem)',
            height: 'clamp(3rem, 6vw, 5rem)',
            cursor: 'pointer',
            alt: 'Volver al inicio'
          },
          onclick: () => {
            m.route.set('/Inicio');
          },
          onfocus: e => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: e => {
            e.target.style.outline = 'none';
            e.target.style.backgroundColor = 'transparent';
          },
          onmouseenter: e => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.outline = 'none';
          }
        },
        m('img', {
          src: modoOscuroOff
            ? 'imagenes/inicio.svg'
            : 'imagenes/inicioBlanco.svg',
          style: {
            width: '70%',
            height: '70%',
            objectFit: 'contain'
          }
        })
      );
    }
  };
}

function botonAtras() {
  return {
    view: () => {
      return m(
        'button',
        {
          role: 'switch',
          ariaLabel: modoOscuroOff
            ? 'Activar modo oscuro'
            : 'Desactivar modo oscuro',
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(3rem, 6vw, 5rem)',
            height: 'clamp(3rem, 6vw, 5rem)',
            cursor: 'pointer',
            alt: 'Volver al inicio'
          },
          onclick: () => {
            window.history.back();
          },
          onfocus: e => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: e => {
            e.target.style.outline = 'none';
            e.target.style.backgroundColor = 'transparent';
          },
          onmouseenter: e => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.outline = 'none';
          }
        },
        m('img', {
          src: modoOscuroOff
            ? 'imagenes/volver.svg'
            : 'imagenes/volverBlanco.svg',
          style: {
            width: '70%',
            height: '70%',
            objectFit: 'contain'
          }
        })
      );
    }
  };
}

export function Header() {
  return {
    view: function () {
      const currentRoute = m.route.get();
      const enInicio = currentRoute === '/Inicio' || currentRoute === '/Login';
      return m(
        'header',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 5vw 1rem 5vw',
            boxSizing: 'border-box'
          }
        },
        [
          [
            !enInicio
              ? m(botonAtras)
              : m('.elementoInvisible', {style: {visibility: 'hidden'}}), //Evita que aparezca el botón de volver al atrás
            !enInicio
              ? m(botonInicio)
              : m('.elementoInvisible', {style: {visibility: 'hidden'}}), //Evita que aparezca el botón de volver al inicio
            m(botonModoOscuro)
          ].filter(Boolean)
        ]
      );
    }
  };
}

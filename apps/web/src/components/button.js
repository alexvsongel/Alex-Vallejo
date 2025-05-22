import {
  fontSizeh3,
  backgroundColorButton,
  accentColor,
  modoOscuroOff
} from '../lib/constants';
import {animateSpring} from '../lib/animations';

export const Button = {
  view: ({attrs, children}) =>
    m(
      'button',
      {
        style: {
          fontSize: fontSizeh3,
          color: 'white',
          border: 'none',
          padding: '0.8rem',
          margin: '2vh auto',
          borderRadius: '30px',
          backgroundColor: '#6a131b'
        },
        onfocus: e => {
          e.target.style.backgroundColor = backgroundColorButton;
          e.target.style.outline = `2px solid ${accentColor}`;
          e.target.style.color = modoOscuroOff ? 'black' : 'white';
          animateSpring(e.target, 'scale', 1.05, 1, {
            stiffness: 1020,
            damping: 10,
            mass: 1.5,
            threshold: 0.01
          });
        },
        onblur: e => {
          e.target.style.outline = 'none';
          e.target.style.backgroundColor = '#6a131b';
          e.target.style.color = 'white';
        },
        onmouseenter: e => {
          e.target.style.backgroundColor = backgroundColorButton;
          e.target.style.outline = `2px solid ${accentColor}`;
          e.target.style.color = modoOscuroOff ? 'black' : 'white';
          animateSpring(e.target, 'scale', 1.05, 1, {
            stiffness: 900,
            damping: 8,
            mass: 1.2,
            threshold: 0.01
          });
        },
        onmouseleave: e => {
          e.target.style.backgroundColor = '#6a131b';
          e.target.style.outline = 'none';
          e.target.style.color = 'white';
        },
        ...attrs
      },
      children
    )
};

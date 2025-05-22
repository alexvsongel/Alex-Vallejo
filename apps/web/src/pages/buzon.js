import {
  modoOscuroOff,
  fontSizeh3,
  backgroundColorButton,
  accentColor
} from '../lib/constants';
import {Layout} from '../components/layout';
import {Button} from '../components/button';

export const Buzon = {
  view: () =>
    m(Layout, [
      m(
        'h1',
        {
          style: {
            fontSize: '3em',
            color: modoOscuroOff ? 'black' : 'white',
            textAlign: 'center',
            margin: '20px 0'
          }
        },
        'Buzón de sugerencias'
      ),
      m(
        'p',
        {
          style: {
            fontSize: fontSizeh3,
            color: modoOscuroOff ? 'black' : 'white',
            textAlign: 'left',
            margin: '0 auto',
            maxWidth: '800px',
            width: '90%',
            lineHeight: '1.6'
          }
        },
        '¿Tienes una idea genial? ¡Compártela con nosotros!'
      ),
      m(
        'p',
        {
          style: {
            fontSize: fontSizeh3,
            color: modoOscuroOff ? 'black' : 'white',
            textAlign: 'left',
            margin: '0 auto',
            maxWidth: '800px',
            width: '90%',
            lineHeight: '1.6'
          }
        },
        'En esta sección puedes sugerir una actividad que te gustaría hacer rellenando el formulario o ver las sugerencias que tus compañer@s han compartido.'
      ),
      m(
        'div',
        {
          style: {
            width: '90%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
          }
        },
        m(
          Button,
          {onclick: () => m.route.set('/Sugerencias')},
          'Ver sugerencias'
        ),
        m(
          'form',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              gap: '15px'
            }
          },
          [
            m(
              'label',
              {
                for: 'Titulo',
                style: {
                  color: modoOscuroOff ? 'black' : 'white',
                  fontSize: fontSizeh3
                }
              },
              'Título'
            ),
            m('input', {
              type: 'text',
              placeholder: 'Escribe un nombre para tu actividad: ',
              ariaLabel: 'Escribe aquí un nombre para tu actividad: ',
              style: {
                width: '100%',
                padding: '0.8rem',
                borderRadius: '30px',
                border: '2px solid #ccc',
                boxSizing: 'border-box'
              },
              onfocus: e => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = 'none';
                e.target.style.color = modoOscuroOff ? 'black' : 'white';
                e.target.style.border = `2px solid ${accentColor}`;
              },
              onblur: e => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.outline = 'none';
                e.target.style.color = 'black';
                e.target.style.border = '2px solid #ccc';
              }
            }),
            m(
              'label',
              {
                for: 'ubicacion',
                style: {
                  color: modoOscuroOff ? 'black' : 'white',
                  fontSize: fontSizeh3
                }
              },
              'Ubicación'
            ),
            m('input', {
              type: 'text',
              placeholder: 'Escribe donde quieres hacer tu actividad: ',
              ariaLabel: 'Escribe aquí la ubicación de tu actividad: ',
              style: {
                width: '100%',
                padding: '0.8rem',
                borderRadius: '30px',
                border: '2px solid #ccc',
                boxSizing: 'border-box'
              },
              onfocus: e => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = 'none';
                e.target.style.color = modoOscuroOff ? 'black' : 'white';
                e.target.style.border = `2px solid ${accentColor}`;
              },
              onblur: e => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.outline = 'none';
                e.target.style.color = 'black';
                e.target.style.border = '2px solid #ccc';
              }
            }),
            m(
              'label',
              {
                for: 'fecha',
                style: {
                  color: modoOscuroOff ? 'black' : 'white',
                  fontSize: fontSizeh3
                }
              },
              'Fecha: '
            ),
            m('input', {
              id: 'ubicacion',
              type: 'date',
              placeholder: 'Escribe cuando quieres hacer tu actividad: ',
              ariaLabel:
                'Escribe aquí la fecha de tu actividad con formato día / número de mes / año',
              style: {
                width: '100%',
                padding: '0.8rem',
                borderRadius: '30px',
                border: '2px solid #ccc',
                boxSizing: 'border-box'
              },
              onfocus: e => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = 'none';
                e.target.style.color = modoOscuroOff ? 'black' : 'white';
                e.target.style.border = `2px solid ${accentColor}`;
              },
              onblur: e => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.outline = 'none';
                e.target.style.color = 'black';
                e.target.style.border = '2px solid #ccc';
              }
            }),
            //--------------------Horario
            m(
              'label',
              {
                for: 'horario',
                style: {
                  color: modoOscuroOff ? 'black' : 'white',
                  fontSize: fontSizeh3
                }
              },
              'Horario: '
            ),
            m('input', {
              id: 'horario',
              type: 'text',
              placeholder: 'Formato: 09:00-15:00',
              ariaLabel:
                'Escribe aquí qué horario va a tener la actividad con formato hora:minuto-hora:minuto',
              style: {
                width: '100%',
                padding: '0.8rem',
                borderRadius: '30px',
                border: '2px solid #ccc',
                boxSizing: 'border-box'
              },
              onfocus: e => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = 'none';
                e.target.style.color = modoOscuroOff ? 'black' : 'white';
                e.target.style.border = `2px solid ${accentColor}`;
              },
              onblur: e => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.outline = 'none';
                e.target.style.color = 'black';
                e.target.style.border = '2px solid #ccc';
              }
            }),
            //--------------------Descripción
            m(
              'label',
              {
                for: 'descripcion',
                style: {
                  color: modoOscuroOff ? 'black' : 'white',
                  fontSize: fontSizeh3
                }
              },
              'Descripción'
            ),
            m('textarea', {
              name: 'Describe tu actividad: ',
              ariaLabel: 'Describe aquí tu actividad',
              id: 'descripcion',
              style: {
                width: '100%',
                padding: '0.8rem',
                borderRadius: '30px',
                border: '2px solid #ccc',
                boxSizing: 'border-box',
                minHeight: '150px',
                resize: 'vertical'
              },
              onfocus: e => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = 'none';
                e.target.style.color = modoOscuroOff ? 'black' : 'white';
                e.target.style.border = `2px solid ${accentColor}`;
              },
              onblur: e => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.outline = 'none';
                e.target.style.color = 'black';
                e.target.style.border = '2px solid #ccc';
              }
            }),
            m(Button, {onclick: e => e.preventDefault()}, 'Enviar sugerencia')
          ]
        )
      )
    ])
};

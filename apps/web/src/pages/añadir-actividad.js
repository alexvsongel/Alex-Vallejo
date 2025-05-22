import {
  modoOscuroOff,
  fontSizeh3,
  accentColor,
  backgroundColorButton
} from '../lib/constants';
import {Layout} from '../components/layout';
import {Button} from '../components/button';

export function AñadirActividad() {
  let formData = {
    titulo: '',
    ubicacion: '',
    fecha: '',
    horario: '',
    descripcion: ''
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const actividad = {
        titulo: formData.titulo,
        ubicacion: formData.ubicacion,
        fecha: formData.fecha,
        horario: formData.horario,
        descripcion: formData.descripcion
      };

      const response = await m.request({
        method: 'POST',
        url: `${import.meta.env.API_URL}/calendario`,
        body: actividad
      });

      alert('Actividad añadido correctamente!');
      formData = {
        titulo: '',
        ubicacion: '',
        fecha: '',
        horario: '',
        descripcion: ''
      };
    } catch (error) {
      console.error('Error al añadir la actividad:', error);
      alert('Hubo un error al añadir la actividad');
    }
  };

  // Función para actualizar formData cuando cambian los inputs
  const handleInputChange = (key, value) => {
    formData[key] = value;
  };
  return {
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
          'Añade tu actividad'
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
            'form',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                gap: '15px'
              },
              onsubmit: handleSubmit
            },
            [
              //Titulo
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
                value: formData.titulo,
                oninput: e => handleInputChange('titulo', e.target.value),
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
              //Ubicación
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
                value: formData.ubicacion,
                oninput: e => handleInputChange('ubicacion', e.target.value),
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
              //Fecha
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
                id: 'fecha',
                type: 'date',
                ariaLabel:
                  'Escribe aquí la fecha de tu actividad con formato día / número de mes / año',
                value: formData.fecha,
                oninput: e => handleInputChange('fecha', e.target.value),
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
              //Horario
              m(
                'label',
                {
                  for: 'horario',
                  style: {
                    color: modoOscuroOff ? 'black' : 'white',
                    fontSize: fontSizeh3
                  }
                },
                'Hora: '
              ),
              m('input', {
                id: 'horario',
                type: 'text',
                placeholder: 'Formato: 09:00-15:00',
                ariaLabel:
                  'Escribe aquí qué horario va a tener la actividad con formato hora:minuto-hora:minuto',
                value: formData.horario,
                oninput: e => handleInputChange('horario', e.target.value),

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
              //Descripción
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
                id: 'descripcion',
                name: 'Describe tu actividad: ',
                value: formData.descripcion,

                ariaLabel: 'Describe aquí tu actividad',
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
              m(Button, 'Añadir actividad')
            ]
          )
        )
      ])
  };
}

import {
  modoOscuroOff,
  backgroundColorButton,
  accentColor,
  fontSizeh2,
  fontSizeh3
} from '../lib/constants';
import {Layout} from '../components/layout';

function getSugerencias() {
  return [
    {
      id: 1,
      user_id: 101,
      title: 'Taller de programación en Mithril',
      start_date: '2024-06-15',
      hour: '16:30',
      location: 'Aula 3, Edificio Principal',
      description:
        'Un taller práctico para aprender a construir aplicaciones web con Mithril.js y buenas prácticas de desarrollo.',
      created_at: '2024-05-07T10:00:00Z',
      updated_at: '2024-05-07T10:00:00Z'
    },
    {
      id: 2,
      user_id: 42,
      title: 'Charla sobre accesibilidad web',
      start_date: '2024-06-20',
      hour: '18:00',
      location: 'Sala de Conferencias Virtual',
      description: 'Cómo diseñar interfaces inclusivas y cumplir con WCAG 2.1.',
      created_at: '2024-05-07T11:30:00Z',
      updated_at: '2024-05-07T11:30:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    },
    {
      id: 3,
      user_id: 89,
      title: 'Meetup de desarrollo open-source',
      start_date: '2024-07-05',
      hour: '19:15',
      location: 'Cafetería TechHub',
      description:
        'Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.',
      created_at: '2024-05-07T12:45:00Z',
      updated_at: '2024-05-07T12:45:00Z'
    }
  ];
}

export function Sugerencias() {
  let sugerencias = getSugerencias().sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  let filtros = {
    nombre: '',
    fecha: '',
    titulo: ''
  };

  const filtrarSugerencias = () => {
    return sugerencias.filter(sugerencia => {
      const coincideNombre = sugerencia.user_id
        .toString()
        .includes(filtros.nombre);
      const coincideTitulo = sugerencia.title
        .toLowerCase()
        .includes(filtros.titulo.toLowerCase());
      const coincideFecha =
        filtros.fecha === '' ||
        new Date(sugerencia.created_at)
          .toLocaleDateString('es-ES')
          .includes(filtros.fecha);

      return coincideNombre && coincideTitulo && coincideFecha;
    });
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
          'Sugerencias'
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
              flexDirection: 'column',
              gap: '20px'
            }
          },
          [
            m(
              'div',
              {
                style: {
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '15px',
                  marginBottom: '20px'
                }
              },
              [
                m('input', {
                  type: 'text',
                  placeholder: 'Buscar por ID usuario',
                  value: filtros.nombre,
                  oninput: e => {
                    filtros.nombre = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: '1',
                    minWidth: '200px',
                    padding: '10px',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    color: modoOscuroOff ? 'black' : 'white'
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
                m('input', {
                  type: 'text',
                  placeholder: 'Buscar por título',
                  value: filtros.titulo,
                  oninput: e => {
                    filtros.titulo = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: '1',
                    minWidth: '200px',
                    padding: '10px',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    color: modoOscuroOff ? 'black' : 'white'
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
                m('input', {
                  type: 'date',
                  value: filtros.fecha,
                  oninput: e => {
                    filtros.fecha = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: '1',
                    minWidth: '200px',
                    padding: '10px',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    color: modoOscuroOff ? 'black' : 'white'
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
                })
              ]
            ),
            filtrarSugerencias().map(sugerencia =>
              m(
                'div',
                {
                  tabindex: '0',
                  role: 'article',
                  style: {
                    backgroundColor: backgroundColorButton,
                    padding: '20px',
                    borderRadius: '30px',
                    border: `2px solid ${
                      modoOscuroOff ? 'transparent' : accentColor
                    }`,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    outline: 'none'
                  },
                  onfocus: e => {
                    e.target.style.backgroundColor = accentColor;
                    e.target.style.outline = 'none';
                  },
                  onblur: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = 'scale(1)';
                  },
                  onmouseenter: e => {
                    e.target.style.backgroundColor = accentColor;
                  },
                  onmouseleave: e => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = 'scale(1)';
                  }
                },
                [
                  m(
                    'h2',
                    {
                      style: {
                        fontSize: fontSizeh2,
                        color: modoOscuroOff ? 'black' : 'white',
                        marginBottom: '10px'
                      }
                    },
                    sugerencia.title
                  ),
                  m(
                    'p',
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? 'black' : 'white',
                        marginBottom: '5px'
                      }
                    },
                    `ID Usuario: ${sugerencia.user_id}`
                  ),
                  m(
                    'p',
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? 'black' : 'white'
                      }
                    },
                    `Fecha: ${new Date(
                      sugerencia.created_at
                    ).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`
                  )
                ]
              )
            )
          ]
        )
      ])
  };
}

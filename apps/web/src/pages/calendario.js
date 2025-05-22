import {modoOscuroOff} from '../lib/constants';
import {Layout} from '../components/layout';
import {Button} from '../components/button';

function formatearFecha(fechaStr) {
  // Convertir la cadena a objeto Date
  const fecha = new Date(fechaStr);

  const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;

  // Formatear la cadena final
  return `${diaSemana} ${dia} de ${mes} a las ${horas}:${minutos}`;
}

async function getActividades() {
  try {
    const response = await fetch(`${import.meta.env.API_URL}/calendario`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const events = await response.json();
    console.log('Actividades recibidos:', events);
    return events;
  } catch (error) {
    console.error('Error fetching actividades:', error);
    return [];
  }
}

export function Calendario() {
  let calendar;
  return {
    oncreate: async () => {
      window.scrollTo(0, 0);
      const calendarEl = document.getElementById('calendar');
      if (calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
          locale: 'es',
          firstDay: 1,
          initialView: 'dayGridMonth',
          contentHeight: 'auto',
          aspectRatio: 1.5,
          buttonText: {
            today: 'Hoy'
          },
          headerToolbar: {left: '', center: 'title', right: ''},
          footerToolbar: {left: 'today', center: '', right: 'prev,next'},
          events: await getActividades(),
          eventClick: info =>
            console.log(
              `Actividad: ${info.event.title}\nFecha inicio: ${formatearFecha(
                info.event.start
              )}\nFecha fin: ${formatearFecha(info.event.end)}`
            ),
          dateClick: info => {
            const title = prompt('Nueva actividad:');
            if (title) calendar.addEvent({title, start: info.dateStr});
          }
        });
        calendar.render();
      }
    },
    onremove: () => {
      if (calendar) calendar.destroy();
    },

    view: () =>
      m(Layout, [
        m(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: modoOscuroOff ? 'black' : 'white'
            }
          },
          m(
            'h1',
            {
              style: {
                marginBottom: '1.5vh',
                fontSize: '3em'
              }
            },
            'Calendario'
          ),
          m('div', {
            id: 'calendar',
            style: {
              margin: '0 2%'
            }
          }),
          m(
            Button,
            {onclick: () => m.route.set('/AñadirActividad')},
            'Añadir actividad'
          )
        )
      ])
  };
}

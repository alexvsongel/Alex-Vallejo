import {modoOscuroOff, fontSizeh3} from '../lib/constants';
import {Layout} from '../components/layout';
import {Button} from '../components/button';
import {getSession} from '../lib/auth';

async function getActividades() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/calendar`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();

    return events;
  } catch (error) {
    console.error('Error fetching actividades:', error);
    return [];
  }
}

export function Calendario() {
  let calendar;
  let role = 'user';
  return {
    oninit: async () => {
      const session = await getSession();
      role = session.role ?? 'user';
      m.redraw();
    },
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
          events: await getActividades()
        });
        calendar.render();
      }
    },
    onremove: () => {
      if (calendar) {
        calendar.destroy();
      }
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
            {
              onclick: () => m.route.set('/AñadirActividad'),
              style: {
                fontSize: fontSizeh3,
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                margin: '2vh auto',
                borderRadius: '30px',
                visibility: role === 'admin' ? 'visible' : 'hidden',
                backgroundColor: '#6a131b'
              }
            },
            'Añadir actividad'
          )
        )
      ])
  };
}

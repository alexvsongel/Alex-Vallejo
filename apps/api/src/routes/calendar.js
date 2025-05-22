import {Hono} from 'hono';
import {auth} from '../lib/auth';

import {database} from '../lib/database';

const calendar = new Hono();

calendar.get('/', async c => {
  const authorized = await auth.api.getSession({
    headers: c.req.raw.headers
  });

  if (!authorized || !authorized.session || authorized.user) {
    return c.json({error: 'No estás logeado!!!! &miau)'}, 401);
  }

  const resultado = await database.query.calendar.findMany({});

  if (resultado.length === 0) {
    return c.json({error: 'NO HAY EVENTOS'});
  }

  return c.json(resultado);

  /*
  return c.json([
    {
      title: "Día de cine",
      start: "2025-04-21",
      end: "2025-04-25",
      ubicacion: "",
      descripcion: "",
    },
    {
      title: "Taller de cocina",
      start: "2025-04-19T14:30:00",
      end: "2025-04-19T17:30:00",
      ubicacion: "",
      descripcion: "",
    },
    {
      title: "Taller de cocina",
      start: "2025-04-19",
      ubicacion: "",
      descripcion: "",
    },
    {
      title: "Patinaje",
      start: "2025-04-20",
      ubicacion: "",
      descripcion: "",
    },
  ]);
  */
});

calendar.post('/', async c => {
  const nuevoEvento = await c.req.json();

  // aqui valida que los campos del object esten bien
  // IIMPORTANTE, SI NO VAS A MORIR !!!!

  // Aquí guardas en una base de datos
  database
    .insert(schema.calendar)
    .values(nuevoEvento)
    .then(data => console.log(data));

  return c.json({
    success: true,
    message: 'Evento añadido correctamente',
    data: nuevoEvento
  });
});

calendar.put('/', async c => {
  return c.json('Aqui podrias usar el put para editar el evento');
});

calendar.delete('/', async c => {
  return c.json('Aqui podrias usar el delete para borrar el evento');
});

export {calendar};

import {Hono} from 'hono';

const suggestions = new Hono();

suggestions.post('/upload', async c => {
  // Aqui gestionas el subir sugerencias

  return c.json({miau: 'miau'});
});

export {suggestions};

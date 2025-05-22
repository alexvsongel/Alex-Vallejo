import {Hono} from 'hono';

const documents = new Hono();

documents.post('/upload', async c => {
  // Aqui gestionas el subir documentos

  return c.json({miau: 'miau'});
});

export {documents};

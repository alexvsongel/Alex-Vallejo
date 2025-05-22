// Imports de hono
import {serve} from '@hono/node-server';
import {cors} from 'hono/cors';
import {auth} from './lib/auth';
import {Hono} from 'hono';

// Rutas
import {calendar} from './routes/calendar';
import {documents} from './routes/documents';
import {suggestions} from './routes/suggestions';

const app = new Hono();

app.use(
  '/api/auth/*',
  cors({
    origin: ['http://localhost:5174', 'https://alex-vallejo.vercel.app'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.options('/api/auth/*', c => c.status(204));

app.on(['GET', 'POST'], '/api/auth/*', c => {
  return auth.handler(c.req.raw);
});

app.get('/', c => c.text('Bienvenido a la api!!'));
app.route('/calendar', calendar);
app.route('/documents', documents);
app.route('/suggestions', suggestions);
// app.route("/authentication", authentication);

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  info => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);

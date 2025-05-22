import {auth} from '../lib/auth';
import {Hono} from 'hono';

const authentication = new Hono();

authentication.on(['POST', 'GET'], '**', c => auth.handler(c.req.raw));

export {authentication};

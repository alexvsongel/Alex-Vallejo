import {modoOscuroOff, blackColor} from '../lib/constants';
import {authClient} from '../lib/auth';
import {Header} from './header';

export const Layout = {
  oncreate: () => {
    // Modo oscuro
    document.body.style.backgroundColor = modoOscuroOff
      ? 'white'
      : blackColor;

      // Arreglar scroll
      window.scrollTo(0, 0);

    // Checkear session
    authClient.useSession.subscribe(session => {
      const {error, data, isPending} = session;
      let authenticated = false;

      if (!error && !isPending && data?.session) {
        authenticated = true;
      }

      const currentRoute = m.route.get();

      if (currentRoute === '/Login' && authenticated) {
        m.route.set('/Inicio');
        m.redraw();
      }

      if (currentRoute !== '/Login' && !authenticated) {
        m.route.set('/Login');
        m.redraw();
      }
    });
  },
  onupdate: () =>
    (document.body.style.backgroundColor = modoOscuroOff
      ? 'white'
      : blackColor),
  view: ({children}) => [m(Header), children]
};

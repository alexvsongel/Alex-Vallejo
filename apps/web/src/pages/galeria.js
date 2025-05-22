import {modoOscuroOff, fontSizeh3} from '../lib/constants';
import {Layout} from '../components/layout';

export const Galeria = {
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
        'Galería'
      ),
      m(
        'p',
        {
          style: {
            fontSize: fontSizeh3,
            color: modoOscuroOff ? 'black' : 'white',
            textAlign: 'left',
            margin: '0 auto',
            maxWidth: '800px',
            width: '90%',
            lineHeight: '1.6'
          }
        },
        'Aquí puedes ver las fotos de las actividades que hemos realizado.'
      )
    ])
};

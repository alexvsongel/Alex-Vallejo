import {
  accentColor,
  modoOscuroOff,
  fontSizeh3,
  backgroundColorButton
} from '../lib/constants';
import {Layout} from '../components/layout';
import {Button} from '../components/button';
import {authClient} from '../lib/auth';

export function Login() {
  const formData = {
    usuario: '',
    contraseña: ''
  };

  let loading = false;
  let error = '';

  const handleSubmit = async e => {
    e.preventDefault();
    /*
     * ESTO ES PARA CREAR LA CUENTA ADMIN
    await authClient.signUp.email({name: "admin", email: formData.usuario, password: formData.contraseña}, {
      onRequest: context => {
        // Mostrar un loader
      },
      onSuccess: context => {
        // Redirigir a la pagina de principal
        m.route.set("/Inicio");
      },
      onError: context => {
        // Mostrar error
        alert(context.error.message);
      }
    })
    /*
     * ESTE ES EL BUENO
     */
    await authClient.signIn.email(
      {email: formData.usuario, password: formData.contraseña},
      {
        onRequest: () => {
          loading = true;
          error = '';
          m.redraw();
        },
        onResponse: () => {
          loading = false;
          m.redraw();
        },
        onSuccess: () => m.route.set('/Inicio'),
        onError: context => {
          error = context.error.message;
        }
      }
    );
  };

  const handleInputChange = (key, value) => {
    //Falta implementar la funcionalidad
    formData[key] = value;
  };

  return {
    view: () =>
      m(Layout, [
        m(
          'div',
          {
            style: {
              width: '90%',
              maxWidth: '500px',
              margin: '0 auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }
          },
          [
            m('img', {
              src: 'imagenes/logoRecortado.webp',
              alt: 'Logo',
              style: {
                width: 'auto',
                height: '100px',
                transition: 'all 0.3s ease',
                ...(window.innerWidth <= 970 && {
                  width: '150px',
                  position: 'relative',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  margin: '0 auto'
                })
              }
            }),
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
              'Iniciar Sesión'
            ),
            m(
              'form',
              {
                style: {
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                },
                onsubmit: handleSubmit
              },
              [
                m(
                  'label',
                  {
                    for: 'usuario',
                    style: {
                      color: modoOscuroOff ? 'black' : 'white',
                      fontSize: fontSizeh3
                    }
                  },
                  'Usuario'
                ),
                m('input', {
                  type: 'text',
                  id: 'usuario',
                  placeholder: 'Introduce tu usuario',
                  value: formData.usuario,
                  oninput: e => handleInputChange('usuario', e.target.value),
                  style: {
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '30px',
                    border: '2px solid #ccc',
                    boxSizing: 'border-box'
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
                m(
                  'label',
                  {
                    for: 'contraseña',
                    style: {
                      color: modoOscuroOff ? 'black' : 'white',
                      fontSize: fontSizeh3
                    }
                  },
                  'Contraseña'
                ),
                m(
                  'div',
                  {
                    style: {
                      position: 'relative',
                      width: '100%'
                    }
                  },
                  [
                    m('input', {
                      type: 'password',
                      id: 'contraseña',
                      placeholder: 'Introduce tu contraseña',
                      value: formData.contraseña,
                      oninput: e =>
                        handleInputChange('contraseña', e.target.value),
                      style: {
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: '30px',
                        border: '2px solid #ccc',
                        boxSizing: 'border-box',
                        paddingRight: '3rem'
                      },
                      onfocus: e => {
                        e.target.style.backgroundColor = backgroundColorButton;
                        e.target.style.outline = 'none';
                        e.target.style.color = modoOscuroOff
                          ? 'black'
                          : 'white';
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
                m(Button, `${loading ? 'Cargando...' : 'Iniciar Sesión'}`),
                m('p', error)
              ]
            )
          ]
        )
      ])
  };
}

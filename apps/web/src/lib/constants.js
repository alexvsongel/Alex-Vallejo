export const alturaRelativaHeader = '10vh';
export const alturaRelativaBody = '85vh';
export const alturaRelativaFooter = '5vh';
export const fontSizeh1 = '35px';
export const fontSizeh2 = '24px';
export const fontSizeh3 = '20px';

export const backgroundColorButton = '#BF0F1E3D';
export const accentColor = '#D42635';
export const blackColor = '#1B1B1B';

export let modoOscuroOff =
  JSON.parse(localStorage.getItem('modoOscuro')) || false;

export const updateModoOscuro = () => {
  modoOscuroOff = JSON.parse(localStorage.getItem('modoOscuro')) || false;
};

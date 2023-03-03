
export default function colourPicker(colourIndex) {

  const blue = {
    primary: '#2196f3',
    secondary: '#90caf9',
    contrast: '#ffc413'
    }

  const purple = {
    primary: '#ba68c8',
    secondary: '#ce93d8',
    contrast: '#94ea30'
  }

  const teal = {
    primary: '#009688',
    secondary: '#80cbc4',
    contrast: '#eb0011'
  }

  const orange = {
    primary: '#ff9800',
    secondary: '#ffcc80',
    contrast: '#00d891'
  }

  const pink = {
    primary: '#e91e63',
    secondary: '#f48fb1',
    contrast: '#d8f920'
  }

  switch (colourIndex) {
    case 1:
      return pink
    case 2:
      return purple
    case 3:
      return teal
    case 4:
      return orange
    default:
      return blue
  }
};
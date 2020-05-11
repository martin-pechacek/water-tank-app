import { StyleSheet } from 'react-native';
import Color from './Colors.js';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  centered: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  transparentBg: {
    backgroundColor: '#00000000'
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
  },
  centeredContent: {
      alignItems: 'center',
      justifyContent: 'center'
  }
});

export default Styles;

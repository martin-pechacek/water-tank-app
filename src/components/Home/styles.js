import { StyleSheet } from 'react-native';
import Color from '../../helpers/Colors';
import {
  Constants,
} from 'react-native-unimodules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waterTankIcon: {
    alignItems: 'center',
    marginTop: 38,
    marginLeft: 10,
    transform: [
        {
          scale: 0.52
        }
    ]
  },
  centered: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 30,
    color: Color.textgray,
    top: 1,
  },
  loadingData: {
    top: 3,
    marginLeft: -5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastMeasurementDate: {
    position: 'absolute',
    color: Color.textgray,
    bottom: 0,
    right: 0,
  }
});

export default styles;

import { StyleSheet } from 'react-native';
import Color from '../../styles/Colors';
import {
  Constants,
} from 'react-native-unimodules';

const styles = StyleSheet.create({
  waterTankIcon: {
    left: 1,
    top: 2,
    transform: [
        {
          //scale: 0.73
          scale: 0.48
        }
    ],
  },
  percentageText: {
    fontSize: 55,
    color: Color.textgray,
    bottom: 5
  },
  activityIndicator: {
    right: 5,
  },
  lastMeasurementDate: {
    position: 'absolute',
    color: Color.textgray,
    bottom: 0,
    right: 0,
  }
});

export default styles;

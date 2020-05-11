import React, { useEffect, useState, useCallback } from "react";
import Moment from "moment-timezone";
import {
  View,
  Text,
  StatusBar,
  Button,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";

import { VictoryLine,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip
 } from "victory-native";

import ChartWrapper from './ChartWrapper.js';

import Styles from "../../styles/styles.js";
import Color from "../../styles/Colors.js";
import ChartStyles from "./styles.js";

import ChartButton from "../../components/ChartButton.js";
import UpperCharts from "../../components/UpperScreenCharts.js";

const filterButtons = [
  {title: "1T", bgColor: Color.white, textColor: Color.darkgray, active: false},
  {title: "1M", bgColor: Color.darkgray, textColor: Color.textgray, active: true},
  {title: "3M", bgColor: Color.white, textColor: Color.darkgray, active: false},
  {title: "6M", bgColor: Color.white, textColor: Color.darkgray, active: false},
  {title: "1R", bgColor: Color.white, textColor: Color.darkgray, active: false},
  {title: "VŠE", bgColor: Color.white, textColor: Color.darkgray, active: false}
]

const useComponentSize = () => {
  const [size, setSize] = useState({width: 0, height: 1});

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

const ChartScreen = ({ navigation }) => {
  const [size, onLayout] = useComponentSize();
  const [data, setData] = useState(navigation.state.params.data);
  const [dataInUse, setDataInUse] = useState(data);
  const [filterBtns, setFilterBtns] = useState(filterButtons)
  const [loadingData, setLoadingData] = useState(true)
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    var activeBtn = filterBtns.find(btn => btn.active)

    var today = new Date();
    var todayMinusPeriod = getTodayMinusPeriod(today, activeBtn.title)
    var filteredData = data.filter(x => todayMinusPeriod < new Date(x.createdAt) && new Date(x.createdAt) < today)

    setDataInUse(filteredData)
  }, [filterBtns])

  useEffect(() => {
    setLoadingData(false)
  }, [dataInUse])

  const getTodayMinusPeriod = (today, period) => {
    switch(period) {
      case "1T":
        return Moment(today).subtract(7, 'days');
        break;
      case "1M":
        return Moment(today).subtract(1, 'months');
        break;
      case "3M":
        return Moment(today).subtract(3, 'months');
        break;
      case "6M":
        return Moment(today).subtract(6, 'months');
        break;
      case "1R":
        return Moment(today).subtract(1, 'years');
        break;
      default:
        return new Date(1970,0,1)
        break;
    }
  }



  const handlePress = (period, button) => {
      var updatedBtns = filterBtns.map(x =>
                x.title == button.title
               ? ({title: x.title, bgColor: Color.darkgray, textColor: Color.textgray, active: true})
               : ({title: x.title, bgColor: Color.white, textColor: Color.darkgray, active: false}))

      setFilterBtns(updatedBtns)
  }

  return !size.width > 0
    ? (
      <View onLayout={onLayout} style={[Styles.centered, Styles.centeredContent]}>
        <ActivityIndicator
          style={Styles.centered}
          size={50}
          color={Color.blueactivity}
        />
      </View>)
    :(
    <SafeAreaView style={Styles.container} onLayout={onLayout}>
      <StatusBar barStyle="dark-content" />
      <View style={[Styles.centered, {backgroundColor: Color.white}]}>
        <View style={[Styles.centeredContent, {justifyContent: "flex-end"}]}>
          {size.width < size.height
            ? <UpperCharts data={data} size={size}/>
            : null}
        </View>

        <View style={[Styles.centeredContent, {flex: 1}]}>
          <View style={[Styles.centeredContent]}>
            <ChartWrapper loadingData={loadingData} data={dataInUse} width={size.width} height={size.height}/>
            <View style={[{flexDirection: 'row', marginBottom: 50}]}>
              {filterBtns.map(button =>
                        <ChartButton key={button.title}
                                   title={button.title}
                                   bgColor={button.bgColor}
                                   textColor={button.textColor}
                                   onPress={() => {
                                     setLoadingData(true),
                                     handlePress(button.title, button)
                                   }}/>
              )}
            </View>
       </View>


        </View>

      </View>
    </SafeAreaView>
  )
}


export default ChartScreen;

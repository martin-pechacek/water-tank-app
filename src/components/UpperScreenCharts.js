import React, { useState, useEffect } from 'react';
import Moment from "moment";
import {
    View,
    Text,
    Image
  } from "react-native";

import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip
 } from "victory-native";

import Styles from "../styles/styles.js";
import ChartStyles from "../screens/ChartScreen/styles.js";
import Color from "../styles/Colors.js";

import "moment/min/locales.min";

//TODO Refactor
const getBarChartData = (data) => {
  var today = new Date()
  var todayMinus3Months = Moment(today).subtract(3, 'months');
  var firstMonth = new Date(todayMinus3Months).getMonth()


  var filteredData = data.filter(measurement => todayMinus3Months < new Date(measurement.createdAt)
                                                && new Date(measurement.createdAt) < today)

  var firstMonthData = filteredData.filter(x => new Date(x.createdAt).getMonth() == firstMonth)
  var secondMonthData = filteredData.filter(x => new Date(x.createdAt).getMonth() == firstMonth + 1)
  var thirdMonthData = filteredData.filter(x => new Date(x.createdAt).getMonth() == firstMonth + 2)

  const firstMonthSum = firstMonthData.map(x => x.tankFullness).reduce(( p, c ) => p + c, 0 );
  const secondMonthSum = secondMonthData.map(x => x.tankFullness).reduce(( p, c ) => p + c, 0 );
  const thirdMonthSum = thirdMonthData.map(x => x.tankFullness).reduce(( p, c ) => p + c, 0 );

  const firstMonthAverage = firstMonthData.length > 0 ? Math.round(firstMonthSum / firstMonthData.length) : 0
  const secondMonthAverage = secondMonthData.length > 0 ? Math.round(secondMonthSum / secondMonthData.length) : 0
  const thirdMonthAverage = thirdMonthData.length > 0 ?  Math.round(thirdMonthSum / thirdMonthData.length) : 0

  Moment.locale("cs");

  return [{x: Moment(today).subtract(3, 'months').format("MMMM"), y: firstMonthAverage},
          {x: Moment(today).subtract(2, 'months').format("MMMM"), y: secondMonthAverage},
          {x: Moment(today).subtract(1, 'months').format("MMMM"), y: thirdMonthAverage}]
}

const getLastMonthDifference = (data) => {
  var currentMonth = new Date().getMonth()

  var lastMonthData = data.filter(x => new Date(x.createdAt).getMonth() == currentMonth)

  var firstInMonth = lastMonthData[0].tankFullness
  var lastInMonth = lastMonthData[lastMonthData.length-1].tankFullness

  return (lastInMonth - firstInMonth)
}

const UpperCharts = ({data, size}) => {
  const [lastMonthDifference, setLastMonthDifference] = useState(0)
  const [barChartData, setBarChartData] = useState([])

  useEffect(() => {
    setLastMonthDifference(getLastMonthDifference(data))
    setBarChartData(getBarChartData(data))
  }, [])

  return (
    <View>
      <View style={[Styles.inline, {height: 200, backgroundColor: 'white', width: size.width}]}>
        <View style={{backgroundColor: 'white'}}>
         <VictoryChart width={size.width / 1.65}
                       height={220}
                       theme={VictoryTheme.material}
                       domainPadding={{ x: 10 }}
                       containerComponent={
                         <VictoryVoronoiContainer voronoiDimension="x"
                           labels={({ datum }) => `${datum.y} %`}
                           labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
                         />
         }>

        <VictoryAxis standalone={false}
                     tickValues={barChartData.map(x => x.x)}
                     style={ChartStyles.barChartAxisX}
                     />

        <VictoryAxis dependentAxis
                     standalone={false}
                     domain={[0, 100]}
                     style={ChartStyles.barChartAxisY}/>

          <VictoryBar
            barWidth={18}
            style={ChartStyles.barStyle}
            data={barChartData} />

        </VictoryChart>
        </View>
        {/* This month status */}
        <View style={[Styles.centeredContent, {backgroundColor: 'white', marginLeft: -30}]}>
          <View style={Styles.inline} width={size.width / 2.0}>
            <Image style={ChartStyles.triangleIcon}
                   source={ lastMonthDifference > 0
                            ? require('@/../../assets/green-triangle.png')
                            : require('@/../../assets/red-triangle.png')}/>

                   <Text style={{fontSize: 27}}> {lastMonthDifference} %</Text>
          </View>
          <Text style={{fontSize: 23, color: '#868686'}}>Tento měsíc</Text>
        </View>
      </View>
      <View style={{backgroundColor: Color.gray, height: 30, width: size.width}}>
      {/*GRAY SPACE*/}
      </View>
      </View>
  )
}

export default UpperCharts

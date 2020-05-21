import React, { Component } from "react";
import Moment from "moment-timezone";
import Svg from 'react-native-svg';

import _ from 'lodash';

import { View, Text, ActivityIndicator } from "react-native";

import { VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip } from "victory-native";

import ChartStyles from './styles.js';
import Styles from '../../styles/styles.js';
import Color from '../../styles/Colors.js';

export default class CustomChart extends Component {

  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      currentData: [],
      chartWidth: 0,
      width: 0,
      height: 0,
      loadingData: true
    };
  }

  componentDidMount(){
    this.setState({
      currentData: this.props.data,
      isLoaded: true,
      width: this.props.width,
      height: this.props.height,
      loadingData: this.props.loadingData
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loadingData !== state.loadingData) {
      return {
        loadingData: props.loadingData,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidUpdate(){
    //changed screen orientation
    if (this.props.width !== this.state.width
      && this.props.height !== this.state.height) {
        this.setState({
          width: this.props.width,
          height: this.props.height
        })
      }

      //changed data
      if (this.props.data !== this.state.currentData) {
          this.setState({
            currentData: this.props.data
          })
      }

      //changed loadingData
      if (this.props.loadingData !== this.state.loadingData) {
        this.setState({
          loadingData: this.props.loadingData
        })
      }
  }

	render() {
    const { currentData, isLoaded, width, height } = this.state
    const { loadingData } = this.props
  	return (
      isLoaded ? (
      <View>
        <VictoryChart height={height > 516 ? 280 : 280}
                      width={width}
                      containerComponent={
                            <VictoryVoronoiContainer voronoiDimension="x"
                              labels={({ datum }) => `${Moment(datum.createdAt).format("DD. MM. YYYY HH:MM")} - ${datum.tankFullness} %`}
                              labelComponent={
                                <VictoryTooltip constrainToVisibleArea
                                                flyoutWidth={165}
                                                cornerRadius={0}
                                                flyoutStyle={{fill: "white"}}/>}
                            />
                      }>
            {!loadingData ? (
              <VictoryAxis standalone={false}
                           tickValues={currentData.map(x => x.createdAt)}
                           tickFormat={createdAt => Moment(createdAt).format("DD. MM. YYYY")}
                           tickCount={3}
                           style={ChartStyles.axisX}/>
              ) : (
                <VictoryAxis standalone={false}
                             style={ChartStyles.loadingAxisX}/>
              )
            }

              <VictoryAxis dependentAxis
                           standalone={false}
                           domain={[0, 100]}
                           style={ChartStyles.axisY}/>

            <VictoryLine data={!loadingData ? currentData : []}
                         x = {currentData => currentData.createdAt}
                         y = {currentData => currentData.tankFullness}
                         style={ChartStyles.line}/>

        </VictoryChart>
        {loadingData ? (
          <ActivityIndicator
            style={Styles.centered}
            size={50}
            color={Color.blueactivity}
          />
        ) : null}
      </View>
    ) : null
    );
  }
}

import React, { useState, useEffect, useCallback } from "react";
import DropdownAlert from "react-native-dropdownalert";
import Moment from "moment-timezone";
import CacheStore from "react-native-cache-store";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableOpacity
} from "react-native";

import WaterTankIcon from "../../assets/WaterTankIcon";
import ChartScreen from "../../screens/ChartScreen";
import HomeStyles from "./styles.js";
import Styles from "../../styles/styles.js";
import Color from "../../styles/Colors.js";
import Errors from "../../helpers/Errors.js";

import axios from "axios";
import api from "../../utils/Api.js";
import { apiTimeout } from "../../helpers/ApiHelper.js";


const useComponentSize = () => {
  const [size, setSize] = useState({width: 0, height: 1});

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

function HomeScreen({ navigation }){
  const [size, onLayout] = useComponentSize();
  // ready to render
  const [isReady, setReady] = useState(false);
  // data loading indicator
  const [loading, setLoading] = useState(true);
  const [measurements, setMeasurements] = useState();

  useEffect(() => {
    CacheStore.get("measurements").then((value) => {
      setMeasurements(value)
      setReady(true)
    });
  }, [])

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getData() {
      apiTimeout(source, 5000);
      await api
        .get("/measurements", {
          cancelToken: source.token
        })
        .then(res => {
          setMeasurements(res.data.map(x => ({
            id: x.id,
            createdAt: new Date(x.createdAt.substr(0,x.createdAt.length-5)),
            waterLevelDistance: x.waterLevelDistance,
            tankFullness: x.tankFullness
          })));
        })
        .catch(err => {
          CacheStore.get("measurements").then(value => {
            setMeasurements(value);
          });

          if (axios.isCancel(err)) {
            error = Errors.find(error => error.status === 408);
            this.dropDownAlertRef.alertWithType(
              "error",
              error.message,
              error.detail
            );
          } else {
            this.dropDownAlertRef.alertWithType(
              "error",
              Errors.find(error => err.request.status === error.status).message,
              Errors.find(error => err.request.status === error.status).detail
            );
          }
        });
      setLoading(false);
    }
    if (loading) getData();
  }, [loading]);

  useEffect(() => {
    if (isReady) {
      CacheStore.set("measurements", measurements);
    }
  }, [measurements]);

  const dailyMedian = (measurements) => {
    var medians = []

    for(var i=0; i <= measurements.length; i = i+11){
      medians.push(measurements[i])
    }

    //last measurement
    if(measurements.length % 11 != 0)
      medians.push(measurements[measurements.length-1])

    return medians
  }

  const waterTank = () => {
    return (
      <View style={Styles.centered}>
      <ScrollView
        contentContainerStyle={Styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={e => setLoading(true)}
          />
        }
      >

      <View>
        <TouchableOpacity style={HomeStyles.waterTankIcon}
                          activeOpacity={1}
                          onPress={() => navigation.navigate('ChartScreen', {
                            data: dailyMedian(measurements)
                          })}>

          <WaterTankIcon tankFullness={percentage} size={size} />
          <View style={[Styles.centeredContent,Styles.centered, Styles.transparentBg]}>
            {loading ? (
              <ActivityIndicator
                style={HomeStyles.activityIndicator}
                size={60}
                color={Color.blueactivity}
              />
            ) : (
              <Text style={HomeStyles.percentageText}>{percentage + " %"}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </ScrollView>
      <Text style={HomeStyles.lastMeasurementDate}>
        {measurements
          ? Moment(measurements[measurements.length-1].createdAt)
              .tz("Europe/Prague")
              .format("DD. MM. YYYY HH:mm:ss")
          : ""}
      </Text>
    </View>
    )
  }


  const percentage = measurements ? measurements[measurements.length-1].tankFullness : 0;

  return isReady ? (

    <SafeAreaView style={Styles.container} onLayout={onLayout}>
      {waterTank()}
    </SafeAreaView>

  ) : null;
}

export default HomeScreen;

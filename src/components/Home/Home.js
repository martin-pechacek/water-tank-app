import React, { useState, useEffect } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import CacheStore from 'react-native-cache-store';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  AppState
 } from 'react-native';

import WaterTankIcon from '../../assets/WaterTankIcon';

import api from '../../utils/Api.js';
import errors from '../../helpers/Errors.js';
import Color from '../../helpers/Colors.js';
import styles from './styles.js';
import Moment from 'moment-timezone';

import axios from 'axios';


function Home() {
  const [isReady, setReady] = useState(false);
  const [latestMeasurement, setLatestMeasurement] = useState();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      CacheStore.get("latestMeasurement").then((value) => {
        setLatestMeasurement(value)
        setReady(true)
      });

      async function getData() {
        await api.get('/measurements?numberOfLatestRecords=1')
                .then(res => {
                    CacheStore.set('latestMeasurement', res.data[0]);
                    setLatestMeasurement(res.data[0]);
                })
                .catch(err => {
                  this.dropDownAlertRef.alertWithType('error',
                                                      errors.find(error => err.request.status === error.status).message,
                                                      errors.find(error => err.request.status === error.status).detail);
                });
        setLoading(false)
      }

      getData()
    }, [loading]);

    const percentage = latestMeasurement ? latestMeasurement.tankFullness : 0

    const loadingData = (
        <View style={styles.loadingData}>
          <ActivityIndicator size="large" color={Color.blueactivity}/>
        </View>
    )

    const loadedData = (
      <Text style={styles.percentageText}>
        {percentage + ' %'}
      </Text>
    )

    const ready = (
      <View style={styles.container}>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        <ScrollView contentContainerStyle={styles.scrollView}
                    refreshControl={
                      <RefreshControl refreshing={false}
                                      onRefresh={e => setLoading(true)}/>
                                    }>
          <View style={styles.waterTankIcon}>
            <WaterTankIcon tankFullness={percentage}/>
          </View>
          <View style={styles.centered}>
            {loading ? loadingData : loadedData}
          </View>
        </ScrollView>
        <Text style={styles.lastMeasurementDate}>{loading ?
                                                   '' :
                                                   Moment(latestMeasurement.createdAt)
                                                   .tz("Europe/Prague")
                                                   .format('DD. MM. YYYY HH:mm:ss')
                                                   }
        </Text>
      </View>
    )

    const notReady = (
      <View style={styles.container}>
      </View>
    )

    return isReady ? ready : notReady

}

export default Home;

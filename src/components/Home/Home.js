import React, { useState, useEffect, useCallback } from "react";
import DropdownAlert from "react-native-dropdownalert";
import CacheStore from "react-native-cache-store";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar
} from "react-native";

import WaterTankIcon from "../../assets/WaterTankIcon";

import axios from "axios";
import api from "../../utils/Api.js";
import Errors from "../../helpers/Errors.js";
import { apiTimeout } from "../../helpers/ApiHelper.js";
import Color from "../../helpers/Colors.js";
import styles from "./styles.js";
import Moment from "moment-timezone";

function Home() {
  // ready to render
  const [isReady, setReady] = useState(false);
  // data loading indicator
  const [loading, setLoading] = useState(false);
  const [latestMeasurement, setLatestMeasurement] = useState();

  useEffect(() => {
    CacheStore.get("latestMeasurement").then(value => {
      if (!value) setLoading(true);

      setLatestMeasurement(value);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getData() {
      apiTimeout(source, 5000);
      await api
        .get("/measurements?numberOfLatestRecords=1", {
          cancelToken: source.token
        })
        .then(res => {
          setLatestMeasurement(res.data[0]);
        })
        .catch(err => {
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
      CacheStore.set("latestMeasurement", latestMeasurement);
    }
  }, [latestMeasurement]);

  const percentage = latestMeasurement ? latestMeasurement.tankFullness : 0;

  return isReady ? (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={e => setLoading(true)}
          />
        }
      >
        <View>
          <View style={styles.waterTankIcon}>
            <WaterTankIcon tankFullness={percentage} />
          </View>
          <View style={styles.centered}>
            {loading ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                size="large"
                color={Color.blueactivity}
              />
            ) : (
              <Text style={styles.percentageText}>{percentage + " %"}</Text>
            )}
          </View>
        </View>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </ScrollView>
      <Text style={styles.lastMeasurementDate}>
        {latestMeasurement
          ? Moment(latestMeasurement.createdAt)
              .tz("Europe/Prague")
              .format("DD. MM. YYYY HH:mm:ss")
          : ""}
      </Text>
    </SafeAreaView>
  ) : null;
}

export default Home;

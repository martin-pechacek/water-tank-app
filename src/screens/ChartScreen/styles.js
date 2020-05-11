import Color from '../../styles/Colors';

const ChartStyles = {
    line: {
      data: { stroke: Color.water, strokeWidth: 3 }
    },
    axisY: {
      grid: {
        strokeWidth: 1
      },
      axis: { stroke: Color.water, strokeWidth: 2 },
      ticks: { strokeWidth: 0 },
      tickLabels: {
        fill: Color.water,
        fontFamily: "inherit",
        fontSize: 15
      }
    },
    axisX: {
      grid: {
        stroke: Color.black,
        strokeWidth: 0.15,
//        strokeDasharray: 5.5
      },
      axis: {
        stroke: Color.black,
        strokeWidth: 1.5
      },
      ticks: {
        size: 5,
        stroke: Color.black,
        strokeWidth: 1
      },
      tickLabels: {
        fill: Color.black,
        fontFamily: "inherit",
        fontSize: 12
      }
    },
    loadingAxisX: {
      axis: {
        stroke: Color.black,
        strokeWidth: 2
      },
      tickLabels: {
        fill: Color.black,
        fontFamily: "inherit",
        fontSize: 0
      }
    },
    barChartAxisX: {
      grid: {
        strokeWidth: 0,
      },
      axis: {
        //stroke: Color.black,
        stroke: '#868686',
        strokeWidth: 1
      },
      ticks: {
        size: 0,
      },
      tickLabels: {
//        fill: Color.black,
        fill: '#626262',
        fontSize: 11
      }
    },
    barChartAxisY: {
      grid: {
        stroke: Color.water,
        strokeWidth: 0.25
      },
      axis: {
        stroke: Color.water,
        strokeWidth: 1
      },
      ticks: {
        strokeWidth: 0
      },
      tickLabels: {
        fill: Color.water,
        fontFamily: "inherit",
        fontSize: 13
      }
    },
    buttonStyle: {
      height: 35,
      width: 45,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginHorizontal: 5,
      borderWidth: 0,
      activeOpacity: 1,
      borderRadius: 5,
      backgroundColor: Color.red
    },
    buttonText: {
      fontSize: 15,
      fontWeight: "bold"
    },
    barStyle: {
      data: {
        fill: Color.water
      }
    },
    triangleIcon: {
      width: 25,
      height: 25
    }
};

export default ChartStyles;

import React, { useEffect, useState, setCount } from "react";
import { View } from 'react-native';
import Svg, { Defs,
  ClipPath,
  Path, Circle,
  G } from 'react-native-svg';

import Color from '../helpers/Colors.js';


const WaterTankIcon = ({ tankFullness }) => {
  //353 due to svg d parameters - it sets height and 353 is difference between max(410) and min height(57)
  const waterLevel = 410 - (353 * tankFullness / 100);

  return(
    <View>
        <Svg height="468px" width="710px">
          <Defs>
  <ClipPath id="tank-shape">
    <Path
      fill={Color.darkgray}
      fillRule="evenodd"
       d="M123.248,58.000 L584.751,58.000 C660.209,102.014 708.000,167.221 708.000,240.000 C708.000,305.919 668.790,365.625 605.332,409.000 L102.668,409.000 C39.210,365.625 -0.000,305.919 -0.000,240.000 C-0.000,167.221 47.791,102.014 123.248,58.000 Z"></Path>
  </ClipPath>
</Defs>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M123.248 58h461.503C660.209 102.014 708 167.221 708 240c0 65.919-39.21 125.625-102.668 169H102.668C39.21 365.625 0 305.919 0 240c0-72.779 47.791-137.986 123.248-182z"
></Path>
<Path
  fill="gray"
  fillRule="evenodd"
  d="M568 413c-31.52 0-57-79.57-57-178s25.48-178 57-178 57 79.57 57 178-25.48 178-57 178z"
  opacity="0.2"
></Path>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M610 233c0-96.77-25.48-175-57-175s-57 78.22-57 175c0 96.77 25.48 175 57 175s57-78.23 57-175z"
></Path>
<Path fill={Color.darkgray} fillRule="evenodd" d="M499 102h70V14h-70v88z"></Path>
<Path
  fill="gray"
  fillRule="evenodd"
  d="M493 413c-31.52 0-57-79.57-57-178s25.48-178 57-178 57 79.57 57 178-25.48 178-57 178z"
  opacity="0.2"
></Path>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M535 233c0-96.77-25.48-175-57-175s-57 78.22-57 175c0 96.77 25.48 175 57 175s57-78.23 57-175z"
></Path>
<Path
  fill="gray"
  fillRule="evenodd"
  d="M408 413c-31.52 0-57-79.57-57-178s25.48-178 57-178 57 79.57 57 178-25.48 178-57 178z"
  opacity="0.2"
></Path>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M450 233c0-96.77-25.48-175-57-175s-57 78.22-57 175c0 96.77 25.48 175 57 175s57-78.23 57-175z"
></Path>
<Path
  fill="gray"
  fillRule="evenodd"
  d="M128 413c-31.52 0-57-79.57-57-178S96.48 57 128 57s57 79.57 57 178-25.48 178-57 178z"
  opacity="0.2"
></Path>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M200 233c0-96.77-25.48-175-57-175s-57 78.22-57 175c0 96.77 25.48 175 57 175s57-78.23 57-175z"
></Path>
<Path
  fill="gray"
  fillRule="evenodd"
  d="M213 413c-31.52 0-57-79.57-57-178s25.48-178 57-178 57 79.57 57 178-25.48 178-57 178z"
  opacity="0.2"
></Path>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M285 233c0-96.78-25.48-175-57-175s-57 78.22-57 175 25.48 175 57 175 57-78.23 57-175z"
></Path>
<Path
  fill="gray"
  fillRule="evenodd"
  d="M288 413c-31.52 0-57-79.57-57-178s25.48-178 57-178 57 79.57 57 178-25.48 178-57 178z"
  opacity="0.2"
></Path>
<Path
  fill={Color.darkgray}
  fillRule="evenodd"
  d="M360 233c0-96.77-25.48-175-57-175s-57 78.22-57 175c0 96.77 25.48 175 57 175s57-78.23 57-175z"
></Path>
  <Path id="water"
        class="tank-scale"
        fill-rule="evenodd"
        opacity="0.8"
        fill={Color.water}
        d={`M-0.000,${waterLevel}L709.000,${waterLevel} L709.000,409.000 L-0.000,409.000
        L-0.000,57.000 Z`}
        clipPath="url(#tank-shape)">
  </Path>
<Path class="tank-scale"
     fill-rule="evenodd"
     stroke={Color.lightblue}
     strokeWidth="10"
     stroke-linecap="butt"
     stroke-linejoin="miter"
     fill="none"
     d="M348.000,140.000 C399.362,140.000 441.000,181.638 441.000,233.000 C441.000,284.362 399.362,326.000 348.000,326.000 C296.638,326.000 255.000,284.362 255.000,233.000 C255.000,181.638 296.638,140.000 348.000,140.000 Z">
</Path>
      </Svg>
    </View>
  )
}

export default WaterTankIcon;

import { StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import Lottie from "lottie-react-native";
const ActivityIndicatorComp = ({
  animation,
  color,
  hidesWhenStopped,
  size,
  style,
}) => {
  return (
    <>
      {/* <ActivityIndicator
        animating={animation}
        color={color}
        hidesWhenStopped={hidesWhenStopped}
        size={size}
        style={style}
      /> */}
      <Lottie source={require("../../assets/loader.json")} autoPlay loop />
    </>
  );
};

export default ActivityIndicatorComp;

const styles = StyleSheet.create({});

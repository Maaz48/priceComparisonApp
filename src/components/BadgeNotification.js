import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Badge, Appbar } from "react-native-paper";

const BadgeNotification = ({
  fontSize,
  style,
  notifyValue,
  badgeIcon,
  onPress,
  isVisible,
}) => {
  return (
    <View>
      <Badge visible={isVisible} size={fontSize} style={style}>
        {notifyValue}
      </Badge>
      <Appbar.Action icon={badgeIcon} onPress={onPress} />
    </View>
  );
};

export default BadgeNotification;

const styles = StyleSheet.create({});

import { StyleSheet } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";

const SearchBarComp = ({
  placeholder,
  onChangeText,
  value,
  loading,
  iconColor,
  customStyle,
}) => {
  return (
    <>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        loading={loading}
        iconColor={iconColor}
        style={customStyle}
      />
    </>
  );
};

export default SearchBarComp;

const styles = StyleSheet.create({});

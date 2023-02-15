import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import TextComp from "../components/TextComp";
import SwipeBtn from "../components/swipeBtn";

const FAQs = ({ navigation }) => {
  const screenData = Dimensions.get("screen");
  const [fontSize, setfontSize] = React.useState(16);

  React.useEffect(() => {
    if (screenData.width <= 360) {
      setfontSize(16);
    } else if (screenData.width > 360 && screenData.width <= 400) {
      setfontSize(18);
    } else if (screenData.width > 400 && screenData.width <= 600) {
      setfontSize(20);
    }
  }, []);

  const [activeSection, setActiveSection] = useState(null);
  const [activeClass, setActiveClass] = useState({});
  const sections = [
    {
      title: "Design your FAQ page.",
      content:
        "Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen",
    },
    {
      title: "Publish the FAQ page on your site.",
      content:
        "Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen",
    },
    {
      title: "Monitor the FAQ page's performance.",
      content:
        "Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen",
    },
    {
      title: "Include space for live support options.",
      content:
        "Dark vector background with gradient mesh.Wallpaper in trendy colors.Modern screen",
    },
  ];

  const handlePress = (index) => {
    if (activeSection === index) {
      setActiveSection(null);
    } else {
      setActiveSection(index);
    }
  };

  const renderHeader = (section, index) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(index)}
        style={
          activeSection == index
            ? {
                backgroundColor: "#FD0C63",
                minHeight: 60,
                maxHeight: 250,
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
                justifyContent: "center",
                paddingHorizontal: 10,
              }
            : styles.headerContainer
        }
      >
        <Text
          style={
            activeSection == index
              ? { fontWeight: "800", color: "white" }
              : { fontWeight: "800", color: "black" }
          }
        >
          {section.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderContent = (section, index) => {
    return (
      <ScrollView style={{ width: "100%" }}>
        <TextComp
          style={
            activeSection == index
              ? {
                  color: "white",
                  backgroundColor: "#FD0C63",
                  paddingHorizontal: 10,
                  paddingBottom: 20,
                }
              : styles.contentText
          }
          textValue={section.content}
        />
      </ScrollView>
    );
  };
  return (
    <>
      <View
        style={{
          minHeight: 100,
          maxHeight: 150,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <TextComp
          textValue="FAQ's"
          style={{ fontSize: fontSize + 5, fontWeight: "800" }}
        />
      </View>
      <ScrollView style={{ paddingHorizontal: 20, flex: 0.8 }}>
        <View style={styles.container}>
          {sections.map((section, index) => (
            <View
              key={index}
              style={{ position: "relative", top: -(index * 10) }}
            >
              {renderHeader(section, index)}
              {activeSection === index && renderContent(section, index)}
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
      >
        <SwipeBtn navigation={navigation} />
      </View>
    </>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  headerContainer: {
    minHeight: 60,
    maxHeight: 250,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",

    paddingHorizontal: 10,
  },
  container: {
    paddingHorizontal: 10,
  },
  contentText: {
    backgroundColor: "#FD0C63",
    minHeight: 70,
    paddingHorizontal: 10,
  },
});

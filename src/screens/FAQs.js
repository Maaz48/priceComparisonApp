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
      title: "What is price comparison using object detection application?",
      content:
        "Price comparison using object detection application is a tool that uses machine learning to identify products in images or videos, and compare their prices across different retailers or service providers..",
    },
    {
      title: "How does price comparison application work?",
      content:
        "Price comparison application works by collecting data from different retailers or service providers and displaying it in a format that is easy to compare. Users can enter a product or service they are interested in, and the application will provide a list of prices from various retailers or service providers, along with information about the product or service.",
    },
    {
      title:
        "Can I buy products or services through price comparison application?",
      content:
        "No! You cannot buy products through this application right now, but we will be adding a feature to buy products within the application in the near future. It will take you to the seller’s website to buy the particular item",
    },
    {
      title: "Can I compare prices for products or services in my local area?",
      content:
        "Yes! Our price comparison application offers users to search for products or services in their local area. This can be helpful for finding deals on items that may be available at nearby stores.",
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

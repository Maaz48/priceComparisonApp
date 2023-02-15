import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import TextComp from "../components/TextComp";
import SwipeBtn from "../components/swipeBtn";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

const AboutUs = ({ navigation }) => {
  const screenData = Dimensions.get("screen");
  const [fontSize, setfontSize] = React.useState(16);

  React.useEffect(() => {
    if (screenData.width <= 360) {
      setfontSize(16);
    } else if (screenData.width > 360 && screenData.width <= 400) {
      setfontSize(16);
    } else if (screenData.width > 400 && screenData.width <= 600) {
      setfontSize(19);
    }
  }, []);
  return (
    <SafeAreaProvider>
      <View
        style={{ flex: 0.15, justifyContent: "center", paddingHorizontal: 10 }}
      >
        <TextComp
          textValue="About Us"
          style={{ fontWeight: "800", fontSize: fontSize }}
        />
      </View>
      <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 10 }}>
        <View style={{ flex: 0.1, justifyContent: "center" }}>
          <TextComp
            textValue="Price Comparison App"
            style={{
              fontWeight: "800",
              fontSize: fontSize,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <TextComp
            textValue="About us: Price comparison app compares the grocery prices from various e-commerce websites. Price comparison app is extremely helpful for frequent online shoppers to check grocery prices on different online stores in one place.This app compares grocery prices from different online stores to show you where to buy the product at affordable price"
            style={{ fontSize: fontSize - 5, lineHeight: 17 }}
          />
        </View>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <View
            style={{
              height: 40,
              maxHeight: 60,
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: 10,
              paddingHorizontal: 10,
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <TextComp
              textValue="Team Members"
              style={{
                fontWeight: "800",
                fontSize: fontSize,
                marginVertical: 10,
              }}
            />
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "22%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                    borderStyle: "dotted",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="Syed Zohaib Hasan Zaidi"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="2019-CS-009"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "22%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                    borderStyle: "dotted",
                  }}
                ></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                    borderStyle: "dotted",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="Mujtaba Hasnain"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="2019-CS-010"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "22%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                    borderStyle: "dotted",
                  }}
                ></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                    borderStyle: "dotted",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="Furqan Muhammad Khan"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="2019-CS-016"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "22%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                    borderStyle: "dotted",
                  }}
                ></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="Muhammad Huzaifa"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="2019-CS-025"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
          </View>
          <View style={{ height: "12%" }}>
            <TextComp
              textValue="Supervised By: Miss Yusra Khalid"
              style={{
                fontWeight: "300",
                fontSize: fontSize - 4,
                textAlign: "center",
              }}
            />
          </View>
        </View>
        <View
          style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
        >
          <SwipeBtn navigation={navigation} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});

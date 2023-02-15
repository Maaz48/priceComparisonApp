import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import TextComp from "../components/TextComp";
import ContextRapper from "../helper/context";

const Notifications = ({ navigation }) => {
  const { allNotifications } = useContext(ContextRapper);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            width: 80,
            height: "70%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              width: 60,
              height: 40,
              backgroundColor: "#FD0C64",
              borderTopEndRadius: 15,
              borderBottomEndRadius: 15,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              icon="chevron-left"
              size={30}
              iconColor="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
        <View
          style={{
            width: 70,
            height: 60,
            backgroundColor: "white",
            borderTopStartRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton icon="bell-outline" size={20} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "flex-end",
          paddingTop: 50,
          paddingHorizontal: 10,
          borderTopStartRadius: 40,
        }}
      >
        <View style={{ width: "100%", height: "100%" }}>
          <ScrollView>
            {/* ////////////////////// EACH CARD start /////////////////////////// */}
            {allNotifications.map((data, index, array) => {
              return (
                <View
                  style={{
                    width: "100%",
                    minHeight: 30,
                    maxHeight: 150,
                    flexDirection: "row",
                  }}
                  key={index}
                >
                  <View
                    style={{
                      width: "4%",
                      height: "100%",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ height: "47%", alignItems: "center" }}>
                      <View
                        style={{
                          height: "100%",
                          width: "100%",
                          borderStartWidth: index == 0 ? 0 : 1,
                          borderColor: "#707070",
                        }}
                      ></View>
                    </View>
                    <View style={{ height: "6%" }}>
                      <Text
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 50,
                          backgroundColor: "#FD0C64",
                        }}
                      ></Text>
                    </View>
                    <View style={{ height: "47%", alignItems: "center" }}>
                      <View
                        style={{
                          height: "100%",
                          width: "100%",
                          borderStartWidth: array.length - 1 == index ? 0 : 1,
                          borderColor: "#707070",
                        }}
                      ></View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "96%",
                      height: "100%",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#F0F0F1",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        alignItems: "center",
                        borderRadius: 20,
                      }}
                    >
                      <ScrollView
                        contentContainerStyle={{
                          justifyContent: "center",
                          paddingVertical: 20,
                        }}
                      >
                        <TextComp textValue={`${data.description}`} />
                      </ScrollView>
                    </View>
                  </View>
                </View>
              );
            })}

            {/* ////////////////////// EACH CARD END /////////////////////////// */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Notifications;

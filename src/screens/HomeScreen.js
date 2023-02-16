import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Appbar,
  useTheme,
  Surface,
  Snackbar,
  IconButton,
} from "react-native-paper";
import ContextRapper from "../helper/context";
/////////////COMPONENTS ////////////
import Button from "../components/Button";
import TextComp from "../components/TextComp";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const { height, width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { location, errorMsg, locationCall, locationFunc } =
    useContext(ContextRapper);

  React.useEffect(() => {
    locationFunc();
  }, []);

  ///////////////////// SNACKBAR ................

  const [visible, setVisible] = React.useState(false);

  const url = "https://server-three-weld.vercel.app/";
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [allNotifications, setallNotifications] = useState([]);
  const [allCoupouns, setallCoupouns] = useState([]);
  const notificationListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    ////////////////////////////// GET ALL COUPOUNS //////////////////////
    fetch(`${url}copouns`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setallCoupouns(data);
      });
    ////////////////////////////// GET ALL COUPOUNS //////////////////////

    /////////////////////////////// GET ALL NOTIFICATIONS ///////////////////
    fetch(`${url}showNotifications`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setallNotifications(data);
      });
    /////////////////////////////////// GET TOKEN OF DEVICE ////////////////////
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .then(() => {
        fetch(`${url}tokenList`)
          .then((data) => {
            return data.json();
          })
          .then((res) => {
            ///////////// get all tokens //////////
            let eachToken = [];
            if (expoPushToken.length < 2) {
              registerForPushNotificationsAsync().then((token) =>
                setExpoPushToken(token)
              );
              return "";
            }
            res.map((values) => {
              if (values.pushToken == expoPushToken) {
                eachToken.push(values);
              }
            });

            if (eachToken.length >= 1) {
              return "";
            }

            if (eachToken.length < 1) {
              fetch(`${url}push-token`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ pushtoken: expoPushToken }),
              })
                .then((data) => {
                  return data.json();
                })
                .then((res) => {
                  console.log("notification token has been send...");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("...");
            }
          })
          .catch((err) => {
            console.log("can not fetch all tokens");
          });
      })
      .catch((err) => {
        console.log("token cant be generated....");
      });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    locationFunc();
  }, [expoPushToken, notification]);

  ///////////////////// REACT ANTIVE PAPER //////////////
  const theme = useTheme();

  ///////////////////////////////////// CARDS DATA///////////////////////
  const data = [
    {
      name: (
        <TextComp style={styles.cardText} textValue={`Object \nDetection`} />
      ),
      image: (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/images/objectDetection.png")}
        />
      ),
      gotoScreen: "ObjectDetection",
    },
    {
      name: <TextComp style={styles.cardText} textValue={`List \nSearch`} />,
      image: (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/images/list.png")}
        />
      ),
      gotoScreen: "ItemsLists",
    },
    {
      name: (
        <TextComp style={styles.cardText} textValue={`QR Code \nDetection`} />
      ),
      image: (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/images/qrCode.png")}
        />
      ),
      gotoScreen: "QrcodeScanner",
    },
  ];

  ///////////////////////// SCREEN SETUP **CONVERSION SCREENS ** //////////////
  const conversionScreen = (e) => {
    if (e == 0) {
      navigation.navigate("ObjectDetection");
    } else if (e == 1) {
      navigation.navigate("ItemsLists");
    } else if (e == 2) {
      navigation.navigate("QrcodeScanner");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#FEFEFD" }}>
        <Appbar.Action
          icon="menu"
          style={{ marginRight: "auto" }}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <IconButton
          fontSize={16}
          icon="bell-outline"
          onPress={() => {
            navigation.navigate("notifications");
          }}
          isVisible={true}
        />
      </Appbar.Header>
      <View style={styles.bodyContainer}>
        <View style={styles.textContainer}>
          <View>
            <Button
              buttonIcon="google-maps"
              buttonValue={location}
              extraStyleText={{
                fontSize: 11,
                fontFamily: "JakartaSans-Regular",
              }}
              onClick={() => {
                locationCall == false ? locationFunc() : "";
              }}
            />
          </View>
          <View style={styles.heading}>
            <Text>
              <Text style={styles.spanElement}>Select </Text>
              <Text style={styles.headingElement}>Your Method</Text>
            </Text>
          </View>
        </View>
        {/* ///////////////////// OPTIONS SELECTION CARDS //////////////// */}
        <View
          style={{
            justifyContent: "center",
          }}
        >
          {data.map((printCArds, index) => {
            return (
              <Pressable
                style={styles.buttonContainer}
                key={index}
                onPress={() => {
                  conversionScreen(index);
                }}
              >
                <Surface
                  elevation={2}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: "white",
                    borderRadius: 20,
                    height: height <= 600 ? "100%" : 120,
                    maxHeight: 150,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#FD0C63",
                        width: "40%",
                        // height: "100%",
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {printCArds.image}
                    </View>
                    <View
                      style={{
                        width: "70%",
                        paddingLeft: 30,
                        justifyContent: "center",
                      }}
                    >
                      {printCArds.name}
                    </View>
                  </View>
                </Surface>
              </Pressable>
            );
          })}
        </View>
        <View
          style={{
            height: "20%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "JakartaSans-Regular" }}>
            Price Comparison
          </Text>
        </View>
      </View>
      <Snackbar
        visible={!locationCall ? true : false}
        onDismiss={() => {
          console.log("");
        }}
        style={{ color: "white", backgroundColor: "#FD0C63" }}
      >
        {errorMsg}
      </Snackbar>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
  },

  bodyContainer: { height: "100%", justifyContent: "space-around" },
  heading: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    height: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spanElement: {
    color: "#080C15",
    fontSize: 16,
    fontFamily: "JakartaSans-Regular",
  },
  headingElement: {
    color: "#080C15",
    fontWeight: "800",
    fontSize: 16,
    fontFamily: "JakartaSans-Regular",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    paddingHorizontal: "10%",
    marginVertical: 10,
  },

  cardText: {
    color: "#080C15",
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "JakartaSans-Regular",
  },
});

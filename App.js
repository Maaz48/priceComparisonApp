import "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
///////////////// SCREENS ////////////
import SplashScreen from "./src/screens/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import DealsAndCoupons from "./src/screens/DealsAndCoupons";
import AboutUs from "./src/screens/AboutUs";
import FAQs from "./src/screens/FAQs";
import DrawerScreens from "./src/components/DrawerScreens";
import ItemsLists from "./src/screens/ItemsLists";
import QrcodeScanner from "./src/screens/QrcodeScanner";
import NotificationsComp from "./src/screens/Notifications";
// ................... NOT A CUSTOM Worker.apply.............

import ObjectDetection from "./src/screens/ObjectDetection";
import EachProductPrice from "./src/screens/EachProductPrice";

///////////////// CONTEXT API /////////////
import ContextRapper from "./src/helper/context";

/////////////////////// location//////////////
import * as Location from "expo-location";

////////////////// SETUP STACK AND DRAWER NAVIGATION
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
////////////////////////// WINDOW WIDTH AND HEIGHT /////////////
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

/////////////////////////// DRAWER FUNCTION //////////////////
function DrawerContent(props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "100%",
        },
        drawerActiveTintColor: "transparent",
        drawerLabelStyle: {
          color: "white",
          textAlign: "center",
          left: "5%",
          fontFamily: "JakartaSans-Regular",
        },
      }}
      initialRouteName="Home"
      drawerContent={(props) => {
        return <DrawerScreens {...props} />;
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Comparison" component={HomeScreen} />
      <Drawer.Screen name="Deals & Coupons" component={DealsAndCoupons} />
      <Drawer.Screen name="About Us" component={AboutUs} />
      <Drawer.Screen name="FAQs" component={FAQs} />
    </Drawer.Navigator>
  );
}
/////////////////////////// DRAWER FUNCTION END //////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [allNotifications, setallNotifications] = useState([]);
  const [allCoupouns, setallCoupouns] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  ////////////////////////////// LOCATION TRACE ////////////////////
  ////////////////////// GET COORDINATES ////////////////
  const [location, setLocation] = React.useState("Your Current, Location");
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [locationCall, setlocationCall] = React.useState(false);
  function locationFunc() {
    setErrorMsg("please enable location...");
    Location.requestForegroundPermissionsAsync()
      .then((data) => {
        if (data.status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 7000);
          setlocationCall(false);
          console.log("location nahi mili ha abhi tak.....");
          return;
        }
        Location.getCurrentPositionAsync({})
          .then((data) => {
            let { coords } = data;
            console.log(
              "coords mil gy hain mgr locatio nahi mili ha abhi tak...."
            );
            fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=5a68a33c974a402fb9dc5c29e15be722`
            )
              .then((data) => {
                return data.json();
              })
              .then((res) => {
                console.log("location and coords 2no mil gy hain.....");
                setLocation(res.results[0].formatted);
                setlocationCall(true);
              })
              .catch((err) => {
                console.log("cant fetch location...");
              });
          })
          .catch((err) => {
            console.log("location access denied....");
          });
      })
      .catch((err) => {
        console.log("location failed....");
      });
  }

  ///////////////////////////// THE BELOW COMMENT CODE IS USE WHEN YOU WANT TO SHOW THE NOTIFICATION DATA
  if (notification) {
    console.log("notification data", notification.request.content.data);
  }
  const url = "https://server-three-weld.vercel.app/";

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
              return console.log("token is null......");
            }
            res.map((values) => {
              if (values.pushToken == expoPushToken) {
                eachToken.push(values);
              }
            });
            console.log(
              "data...................",
              eachToken,
              "asdsadsadsadsad"
            );
            if (eachToken.length >= 1) {
              return console.log("token already registered");
            }

            if (eachToken.length < 1) {
              console.log("hello world.......................");
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
                  console.log(err);
                });
            } else {
              console.log("asdasdsadasdzxnbcbmnmxcbzmxcuasdka");
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////// CONTEXT DATA ////////
  const [contextData, setcontextData] = useState("");
  const [headingFontSize, setheadingFontSize] = useState(22);
  const [paragraphFontSize, setparagraphFontSize] = useState(16);
  const [allProduct, setallProduct] = useState([]);
  ///////////////// FONT SIZE FOR DIFFERENT DEVICES /////////////
  React.useEffect(() => {
    let products = fetch(`${url}/allproducts`);
    products
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setallProduct(data);
        console.log(data.length);
      });
    if (windowWidth < 400) {
      setheadingFontSize(22);
    } else if (windowWidth >= 400 && windowWidth <= 600) {
      setheadingFontSize(35);
    } else {
      setheadingFontSize(40);
    }
    if (windowWidth < 400) {
      setparagraphFontSize(13);
    } else if (windowWidth >= 400 && windowWidth <= 600) {
      setparagraphFontSize(16);
    } else {
      setparagraphFontSize(25);
    }
    return () => {};
  }, []);

  const [fontsLoaded] = useFonts({
    "JakartaSans-Regular": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: "#080C15",
      secondary: "#FE0D64",
      tertiary: "#a1b2c3",
    },
    fonts: { ...DefaultTheme.fonts, fontFamily: "JakartaSans-Regular" },
  };
  if (!fontsLoaded) {
    return;
  }

  const contextApiData = (value) => {
    setcontextData(value);
  };

  return (
    <ContextRapper.Provider
      value={{
        singleProduct: contextApiData,
        contextData: contextData,
        fontSize: {
          headingFont: headingFontSize,
          paragraphFont: paragraphFontSize,
        },
        allProduct,
        allNotifications,
        allCoupouns,
        location,
        errorMsg,
        locationCall,
        locationFunc,
      }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
            backBehavior="initialRoute"
          >
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ title: "none" }}
            />
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={() => {
                null;
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={DrawerContent}
              options={() => {
                null;
              }}
            />

            <Stack.Screen
              name="ObjectDetection"
              component={ObjectDetection}
              options={() => {
                null;
              }}
            />
            <Stack.Screen
              name="ItemsLists"
              component={ItemsLists}
              options={() => {
                null;
              }}
            />
            <Stack.Screen
              name="QrcodeScanner"
              component={QrcodeScanner}
              options={() => {
                null;
              }}
            />
            <Stack.Screen
              name="notifications"
              component={NotificationsComp}
              options={() => {
                null;
              }}
            />
            <Stack.Screen
              name="productPrice"
              component={EachProductPrice}
              options={() => {
                null;
              }}
            />
          </Stack.Navigator>
          <StatusBar backgroundColor="#FD0C63" style="light" />
        </NavigationContainer>
      </PaperProvider>
    </ContextRapper.Provider>
  );
}

export default App;

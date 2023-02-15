import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useContext } from "react";
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

const { height, width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { location, errorMsg, locationCall, locationFunc } =
    useContext(ContextRapper);

  React.useEffect(() => {
    locationFunc();
  }, []);

  ///////////////////// SNACKBAR ................
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

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

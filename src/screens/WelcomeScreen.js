import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  PixelRatio,
} from "react-native";
import { useTheme } from "react-native-paper";
import React, { useContext } from "react";
///////// COMPONENTS /////////////
import ButtonComp from "../components/Button";
import TextComp from "../components/TextComp";
import ContextRapper from "../helper/context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WelcomeScreen = ({ navigation }) => {
  //////////////// CONTEXt HOOK //////////
  const contextApi = useContext(ContextRapper);
  /////////////////// THEME HOOK //////////////////
  const theme = useTheme();
  //////////////////  LOGO ANIMATION FROM MID TO TOP ///////////////////
  const logoAnimation = React.useRef(
    new Animated.Value(windowHeight / 2)
  ).current;
  const logoWidth = React.useRef(new Animated.Value(238)).current;
  const logoHeight = React.useRef(new Animated.Value(50)).current;

  ////////////////////// ANIMATION TIMING SET ///////////////////
  const [isVisible, setisVisible] = React.useState(false);
  setTimeout(() => {
    setisVisible(true);
  }, 2500);

  React.useEffect(() => {
    Animated.timing(logoAnimation, {
      toValue: 70,
      duration: 2000,
      delay: 2000,
      useNativeDriver: false,
    }).start(() => {});
    Animated.timing(logoWidth, {
      toValue: windowHeight <= 600 ? 170 : 240,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {});
    Animated.timing(logoHeight, {
      toValue: windowHeight <= 600 ? 35 : 50,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {});
  }, []);

  ////////////////////////// BUTTON EVENT CALL /////////////////
  const btnEvent = () => {
    navigation.replace("HomeScreen");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Animated.View
        style={[
          styles.animatedLogoContainer,
          {
            position: "absolute",
            top: logoAnimation,
          },
        ]}
      >
        <Animated.Image
          style={[
            styles.animatedLogo,
            { width: logoWidth, height: logoHeight },
          ]}
          source={require("../../assets/images/logo.png")}
        />
      </Animated.View>
      <View style={{ flex: 0.2 }}></View>
      {isVisible ? (
        <View style={{ flex: 0.8 }}>
          <View style={[styles.groceryImgContainer, { alignItems: "center" }]}>
            <Image
              style={[
                styles.groceryImg,
                {
                  width: windowHeight < 700 ? "100%" : "70%",
                  height: "100%",
                  resizeMode: "contain",
                },
              ]}
              source={require("../../assets/images/Grocery.png")}
            />
          </View>
          <View style={styles.txtContainer}>
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextComp
                style={[
                  styles.headingTxt,
                  { fontSize: contextApi.fontSize.headingFont },
                ]}
                textValue="Welcome To Price Comparison"
              />
            </View>
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextComp
                style={[
                  styles.paraTxt,
                  { fontSize: contextApi.fontSize.paragraphFont },
                ]}
                textValue={`This price comparison app for products will help ${"\n"} to compare the price from various ${"\n"} e-commerce websites,`}
              />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <ButtonComp
              onClick={btnEvent}
              buttonType="contained"
              buttonIcon=""
              isDisable={false}
              textColor="white"
              extraStyle={[styles.btn, { backgroundColor: "#FE0D64" }]}
              buttonValue="Let's Start"
              extraStyleText={{
                fontSize: 20,
                fontWeight: "800",
                color: "white",
              }}
            />
          </View>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedLogoContainer: { zIndex: 1 },
  animatedLogo: { width: 238, height: 50 },
  groceryImgContainer: {
    flex: 0.6,
    display: "flex",
    justifyContent: "center",
  },
  groceryImg: {
    width: PixelRatio.get() <= 2 && windowHeight <= 600 ? 150 : 400,
    height: 500,
  },
  txtContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
  },
  headingTxt: {
    textAlign: "center",
    color: "white",
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
  },
  paraTxt: {
    textAlign: "center",
    color: "white",
    height: "100%",
    width: "100%",
    textAlignVertical: "center",
  },
  btnContainer: {
    width: windowWidth,
    // width: "100%",
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
  },
  btn: {
    width: "80%",
    margin: "auto",
    height: windowHeight <= 600 ? 50 : "40%",
    justifyContent: "center",
    borderRadius: 20,
  },
});

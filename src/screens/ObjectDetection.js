import { Camera } from "expo-camera";
import { useState, useRef, useEffect, useContext } from "react";
import { StyleSheet, View, Image, Dimensions, Alert } from "react-native";
import ButtonComp from "../components/Button";
import TextComp from "../components/TextComp";
import {
  Appbar,
  useTheme,
  Dialog,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import ActivityIndicatorComp from "../components/ActivityIndicatorComp";
import ContextRapper from "../helper/context";

const { width, height } = Dimensions.get("window");

export default function ObjectDetection({ navigation }) {
  const { allProduct } = useContext(ContextRapper);

  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isModelLoad, setisModelLoad] = useState(false);
  const cameraRef = useRef(null);
  if (!permission) {
    // Camera permissions are still loading
    return <ActivityIndicatorComp animation={true} color="#FE0D64" />;
  }

  const handleTakePicture = async () => {
    if (permission.granted) {
      if (cameraRef) {
        setisLoading(true);
        setisModelLoad(true);
        const data = cameraRef.current.takePictureAsync();
        data.then((data) => {
          sendImageToApi(data.uri);
        });
      }
    } else {
      setisLoading(false);
      setisModelLoad(false);
      requestPermission();
    }
  };

  ////////////////// SEND FORM DATA TO API /////////////////////
  const sendImageToApi = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageData,
        name: "image.jpg",
        type: "image/jpg",
      });
      const response = axios.post(
        "https://imageuploadapi.onrender.com/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      response
        .then((data) => {
          const image_url = `https://imageuploadapi.onrender.com/${data.data.image}`;
          console.log(image_url);
          return image_url;
        })
        .then((image) => {
          console.log(image);
          fetch(
            `https://web-production-eecc.up.railway.app/PredictProduct?image=${image}`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.message) {
                setisModelLoad(false);
                setisLoading(false);
                return Alert.alert("cannot identify image file");
              }
              allProduct.find((product) => {
                if (product.objectDetectionClass == data.predictions[0].class) {
                  setisModelLoad(false);
                  setisLoading(false);
                  navigation.navigate("productPrice", { product });
                }
              });
            })
            .catch((error) => {
              setisModelLoad(false);
              setisLoading(false);
              return Alert.alert(
                "Model is unable to show result please try again."
              );
            });
        })
        .catch((err) => {
          setisModelLoad(false);
          Alert.alert("Unable to click image please try again...");
          console.log("err");
        });
    } catch (error) {
      console.error("Error while sending image to API:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "#FEFEFD", height: 50 }}>
          <Appbar.Action
            icon="keyboard-backspace"
            style={{ marginRight: "auto" }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </Appbar.Header>
        <View style={{ flex: 1 }}>
          <View style={styles.sectionContainer}>
            <TextComp textValue="Starting" style={styles.headingStyle} />
            <TextComp
              textValue={"Object Detection \n"}
              nestedText={`Align the Object within the frame ${"\n"} to scan.`}
              nestedTextStyle={[styles.subtitleStyle, { fontWeight: "400" }]}
              style={[
                styles.subtitleStyle,
                { fontWeight: "600", fontSize: 15, color: "black" },
              ]}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 40,
            }}
          >
            {permission.granted === null || permission.granted === false ? (
              <View style={styles.qrcodeBox}>
                <Image
                  source={require("../../assets/object.png")}
                  style={{ height: 300, width: 300 }}
                />
              </View>
            ) : (
              <View style={styles.qrcodeBox}>
                <Camera style={{ height: 500, width: 500 }} ref={cameraRef} />
              </View>
            )}
          </View>
          <View style={styles.btnContainer}>
            <ButtonComp
              isloading={isLoading}
              onClick={handleTakePicture}
              buttonType="contained"
              extraStyle={{
                backgroundColor: theme.colors.secondary,
                width: "80%",
                margin: "auto",
                height: 60,
                justifyContent: "center",
                borderRadius: 20,
              }}
              btnTextColor="white"
              buttonValue={
                permission.granted == null || permission.granted == false
                  ? "Click to allow camera permission"
                  : "Let's start"
              }
            />
          </View>
        </View>
        <Dialog visible={isModelLoad}>
          <Dialog.Content>
            <Dialog.Title style={{ textAlign: "center" }}>
              Waiting...
            </Dialog.Title>
            <TextComp
              textValue={"Please wait While the model is processing your image"}
              style={{ textAlign: "center" }}
            />
            <View style={{ marginVertical: 20 }}>
              <ActivityIndicator
                animating={true}
                size={"small"}
                color={`red`}
              />
            </View>
          </Dialog.Content>
        </Dialog>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headingStyle: { fontSize: 18, marginVertical: 10, fontWeight: "700" },
  subtitleStyle: {
    textAlign: "center",
    color: "#707070",
    fontSize: 12,
  },
  btnContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "80%",
    margin: "auto",
    height: 60,
    justifyContent: "center",
    borderRadius: 20,
  },
  qrcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
});

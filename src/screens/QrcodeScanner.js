import { StyleSheet, View, Text, Button, Image } from "react-native";
import React, { useState, useContext } from "react";
import { useTheme, Appbar } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import TextComp from "../components/TextComp";
import ButtonComp from "../components/Button";
import ContextRapper from "../helper/context";

const QrcodeScanner = ({ navigation }) => {
  const { allProduct } = useContext(ContextRapper);

  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    allProduct.find((product) => {
      if (product.qrcode == data) {
        setHasPermission(null);
        setScanned(false);
        navigation.navigate("productPrice", { product });
      } else {
        console.log("NO MATCH FOUND");
      }
    });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const requestPermission = async (e) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (hasPermission == true) {
      setHasPermission(null);
      setScanned(false);
    }
  };
  return (
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
          <TextComp textValue="Scan QR Code" style={styles.headingStyle} />
          <TextComp
            textValue={`Align the QR Code within the frame ${"\n"} to scan.`}
            style={styles.subtitleStyle}
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
          {hasPermission === null || hasPermission === false ? (
            <View style={styles.qrcodeBox}>
              <Image
                source={require("../../assets/qrcode.png")}
                style={{ height: 300, width: 300 }}
              />
            </View>
          ) : (
            <View style={styles.qrcodeBox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 500, width: 500 }}
              />
            </View>
          )}
        </View>
        <View style={styles.btnContainer}>
          <ButtonComp
            onClick={requestPermission}
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
              hasPermission == null || hasPermission == false
                ? "Start Scanning"
                : "Stop Scanning"
            }
          />
        </View>
      </View>
    </View>
  );
};

export default QrcodeScanner;

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

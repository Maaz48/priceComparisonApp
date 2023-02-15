import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Appbar, Surface } from "react-native-paper";
import TextComp from "../components/TextComp";
import ContextRapper from "../helper/context";
import SwipeBtn from "../components/swipeBtn";
import ActivityIndicatorComp from "../components/ActivityIndicatorComp";
const { width, height } = Dimensions.get("window");

const EachProductPrice = ({ navigation, route }) => {
  const { product } = route.params;
  const [Loading, setLoading] = useState(true);
  ////////////////// CONTEXT API ////////////
  const { fontSize } = useContext(ContextRapper);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  ///////////////// FLATLIST ITEM VIEW ///////////////
  const itemView = (props) => {
    const { item, index } = props;

    return (
      <Surface
        elevation={2}
        style={{
          paddingHorizontal: 10,
          backgroundColor: "white",
          borderRadius: 20,
          maxHeight: 100,
          marginHorizontal: 20,
          position: "relative",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "50%",
            justifyContent: "center",
            paddingLeft: "10%",
            backgroundColor: "white",
            zIndex: 1,
            borderRadius: 20,
          }}
        >
          <TextComp
            textValue={item.storeName}
            style={{
              fontSize: fontSize.paragraphFont,
              color: "black",
              paddingLeft: 10,
              borderWidth: 3,
              borderColor: "#FD0C63",
              borderRadius: 10,
            }}
          />

          <TextComp
            nestedText={`${item.price}/-`}
            nestedTextStyle={{
              fontSize: fontSize.headingFont,
              fontWeight: "800",
            }}
            textValue="Rs. "
            style={{
              fontSize: fontSize.paragraphFont + 10,
              color: "black",
              fontWeight: "800",
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: width <= 400 ? 20 : 60,
            height: 50,
            width: 50,
          }}
        >
          <View style={{ position: "relative" }}>
            <View style={styles.baseBottom} />
            <View style={styles.baseTop} />

            <View
              style={{
                position: "absolute",
                top: 0,
                left: width <= 400 ? "15%" : 0,
                width: "100%",
              }}
            >
              <TextComp
                textValue={`0${index + 1}`}
                style={{
                  color: "black",
                }}
              />
            </View>
          </View>
        </View>

        {/* ///////////////// BACKGROUND VIEW PINK COLOR //////// */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 2,
            backgroundColor: "#FD0C63",
            width: "50%",
            height: "100%",
            zIndex: -1,
            borderRadius: 20,
          }}
        />
      </Surface>
    );
  };

  return (
    <>
      {Loading ? (
        <View
          style={{
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <ActivityIndicatorComp animation={true} color="#FE0D64" size={50} />
        </View>
      ) : (
        <View style={styles.container}>
          <Appbar.Header style={{ backgroundColor: "#FEFEFD" }}>
            <Appbar.Content
              style={{ width: "80%" }}
              title={`${product.productName} price`.toUpperCase()}
              titleStyle={{ fontSize: 16 }}
            />
          </Appbar.Header>

          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 0.4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: `https://images-rssh.onrender.com/${product.image}`,
                }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
            <FlatList
              style={{
                flex: 0.4,
              }}
              data={product.availableStore}
              keyExtractor={(item, index) => {
                return index;
              }}
              renderItem={itemView}
            />
            {!Loading && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <SwipeBtn navigation={navigation} />
              </View>
            )}
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default EachProductPrice;

const styles = StyleSheet.create({
  container: { flex: 1 },
  baseTop: {
    backgroundColor: "#FD0C63",
    height: 20,
    width: 30,
  },
  baseBottom: {
    borderTopWidth: 20,
    borderTopColor: "#FD0C63",
    borderLeftWidth: 15,
    borderLeftColor: "transparent",
    borderRightWidth: 15,
    borderRightColor: "transparent",
    height: 0,
    width: 0,
    left: 0,
    top: 20,
    position: "absolute",
  },
});

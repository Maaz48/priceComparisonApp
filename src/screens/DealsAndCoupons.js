import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Appbar } from "react-native-paper";
import TextComp from "../components/TextComp";
import ActivityIndicatorComp from "../components/ActivityIndicatorComp";
import SwipeBtn from "../components/swipeBtn";

///////////// CONTEXT API ///////////
import ContextRapper from "../helper/context";

const { height, width } = Dimensions.get("window");

const DealsAndCoupons = ({ navigation }) => {
  const { allCoupouns } = useContext(ContextRapper);
  const eachProductScreenData = useContext(ContextRapper);

  const [productList, setproductList] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [isProductsLoad, setisProductsLoad] = useState(false);
  useEffect(() => {
    setisProductsLoad(true);
    setproductList(allCoupouns);
    setmasterData(allCoupouns);
  }, []);

  const getPriceOFThisProduct = (product) => {
    eachProductScreenData.singleProduct(product);
    navigation.navigate("productPrice");
  };

  const itemView = (props) => {
    const { item } = props;
    return (
      <View
        style={{
          padding: 20,
          maxHeight: 350,
          height: 200,
          marginVertical: width < 400 ? 0 : 10,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => getPriceOFThisProduct(item)}
          style={{
            backgroundColor: item.isAvailable ? "#FE0D64" : "#F3F3F3",
            borderRadius: 30,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: "53%",
              left: -20,
              zIndex: 20,
              backgroundColor: "white",
              height: 40,
              width: 40,
              borderRadius: 50,
            }}
          ></View>
          <View
            style={{
              position: "absolute",
              top: "53%",
              right: -20,
              zIndex: 20,
              backgroundColor: "white",
              height: 40,
              width: 40,
              borderRadius: 50,
            }}
          ></View>

          <View
            style={{
              height: "65%",
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <TextComp
              textValue={`Deal ${item.dealNumber}`}
              style={{
                fontSize: width <= 600 ? 20 : 25,
                color: item.isAvailable ? "white" : "black",
                fontWeight: "800",
              }}
            />
            <TextComp
              textValue={item.description}
              style={{
                fontSize: width <= 600 ? 12 : 18,
                color: item.isAvailable ? "white" : "black",
              }}
            />
          </View>
          <View
            style={{
              height: "35%",
              borderTopWidth: 1.4,
              borderColor: item.isAvailable ? "white" : "#FE0D64",
              borderStyle: "dotted",
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: width < 400 ? "60%" : "70%" }}>
              <TextComp
                style={{
                  fontSize: width <= 600 ? 15 : 20,
                  color: item.isAvailable ? "white" : "#FE0D64",
                  fontWeight: "800",
                }}
                textValue={`Exclusive ${item.discount} Discount`}
              />
            </View>
            <View
              style={{
                width: width < 400 ? "40%" : "30%",
                paddingHorizontal: 20,
                height: 40,
                maxHeight: 60,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: item.isAvailable ? "white" : "#FE0D64",
                justifyContent: "center",
              }}
            >
              <TextComp
                style={{
                  fontSize: width <= 600 ? 10 : 14,
                  color: item.isAvailable ? "white" : "#FE0D64",
                }}
                textValue={`Code: ${item.copounCode}`}
              />
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 4, width: "100%", backgroundColor: "white" }} />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#FEFEFD", marginBottom: 0 }}>
        <Appbar.Action
          icon="keyboard-backspace"
          style={{ width: "20%" }}
          onPress={() => {
            navigation.replace("HomeScreen");
          }}
        />
        <Appbar.Content
          style={{ width: "80%" }}
          title="Deals & Coupons"
          titleStyle={{ fontSize: 16 }}
        />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {isProductsLoad ? (
            <FlatList
              data={productList}
              keyExtractor={(item, index) => {
                return index;
              }}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={itemView}
            />
          ) : (
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
              <ActivityIndicatorComp
                animation={true}
                color="#FE0D64"
                size={50}
              />
            </View>
          )}
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <SwipeBtn navigation={navigation} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DealsAndCoupons;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

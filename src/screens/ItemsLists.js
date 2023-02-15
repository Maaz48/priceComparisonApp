import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Appbar } from "react-native-paper";
import SearchBarComp from "../components/SearchBarComp";
import TextComp from "../components/TextComp";
import ActivityIndicatorComp from "../components/ActivityIndicatorComp";

///////////// CONTEXT API ///////////
import ContextRapper from "../helper/context";
import Flatlistallproducts from "./flatlistallproducts";

const { height, width } = Dimensions.get("window");

const ItemsLists = ({ navigation }) => {
  const eachProductScreenData = useContext(ContextRapper);
  const { allProduct } = eachProductScreenData;

  const [searchQuery, setsearchQuery] = useState("");
  const [productList, setproductList] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [isProductsLoad, setisProductsLoad] = useState(false);
  useEffect(() => {
    setisProductsLoad(true);
    setproductList(allProduct);
    setmasterData(allProduct);
  }, []);

  const searchFilter = (e) => {
    if (e) {
      const newData = masterData.filter((data) => {
        const itemData = data.productName
          ? data.productName.toUpperCase()
          : "".toUpperCase();
        const textData = e.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setproductList(newData);
      setsearchQuery(e);
    } else {
      setproductList(masterData);
      setsearchQuery(e);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#FEFEFD" }}>
        <Appbar.Action
          icon="keyboard-backspace"
          style={{ width: "20%" }}
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        />
        <Appbar.Content
          style={{ width: "80%" }}
          title="LIST ITEMS"
          titleStyle={{ fontSize: 16 }}
        />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <SearchBarComp
            placeholder="Search Your Products"
            onChangeText={(e) => {
              searchFilter(e);
            }}
            value={searchQuery}
            loading={false}
            iconColor="red"
            customStyle={{ fontSize: 10, height: 70 }}
          />
          {isProductsLoad ? (
            <Flatlistallproducts
              allproductList={productList}
              navigation={navigation}
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
      </SafeAreaView>
    </View>
  );
};

export default ItemsLists;

const styles = StyleSheet.create({ container: { flex: 1 } });

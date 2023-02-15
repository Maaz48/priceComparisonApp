import React, { memo } from "react";
import { FlatList, View, Animated, Pressable, Dimensions } from "react-native";
import TextComp from "../components/TextComp";

const Flatlistallproducts = ({ allproductList, navigation }) => {
  //////////////////// SHOW 10 PRODUCTS PER PAGE //////////////////////////
  const [productsQuantity, setproductsQuantity] = React.useState(1);
  const [products, setproducts] = React.useState([]);
  const perPage = 10;
  React.useEffect(() => {
    if (productsQuantity * perPage <= allproductList.length) {
      let data = allproductList.splice(0, perPage * productsQuantity);
      setproducts(data);
    }
  }, [allproductList]);

  ///////////////////// REDIRECT TO EACH PRODUCT PAGE //////////////
  const getPriceOFThisProduct = (product) => {
    navigation.navigate("productPrice", { product });
  };

  ////////////////////////// PRINT ALL DATA OF FLAT LIST /////////////
  const translateX = React.useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  });
  const itemView = (props) => {
    const { item } = props;
    return (
      <Animated.View style={{ transform: [{ translateY: translateX }] }}>
        <Pressable
          onPress={() => getPriceOFThisProduct(item)}
          style={{ padding: 20 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "80%" }}>
              <TextComp
                textValue={item.productName}
                style={{
                  fontSize: 20,
                  color: "#FE0D64",
                  fontFamily: "JakartaSans-Regular",
                }}
              />
              <TextComp
                textValue={item.category}
                style={{
                  fontSize: 15,
                  color: "#FE0D64",
                  fontFamily: "JakartaSans-Regular",
                }}
              />
            </View>

            {/* <Image
              style={{ height: 50, width: 50 }}
              resizeMode="cover"
              source={require("../../assets/images/bread.png")}
            /> */}
          </View>
        </Pressable>
      </Animated.View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 4, width: "100%", backgroundColor: "white" }} />
    );
  };
  return (
    <>
      <FlatList
        data={allproductList}
        keyExtractor={(item, index) => {
          return index;
        }}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={itemView}
        onEndReached={() => {
          setproductsQuantity(productsQuantity + 1);
        }}
      />
    </>
  );
};

export default memo(Flatlistallproducts);

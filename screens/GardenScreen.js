const { useState, useEffect } = require("react");
const ProductName = require("../components/productName");
const ProductCard = require("../components/ProductCard");
const ProductIcon = require("../components/productIcon");
const LikeIcon = require("../components/LikeIcon");
const AddIcon = require("../components/AddIcon");

import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function GardenScreen() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("garden started");
      const loadProductList = await fetch(
        "https://aqueous-shore-35402.herokuapp.com/productlist"
      );
      const response = await loadProductList.json();
      console.log("response", response.product);

      setProductList(response.product);
    })();
  }, []);

  console.log("liste", productList);

  const CardList = productList.map((product, i) => {
    return (
      <ProductCard
        key={i}
        name={product.name}
        species={product.species_name}
        label={product.label}
        kilo_price={product.kilo_price}
        date_harvest={product.date_harvest}
        producer={product.producer}
      />
    );
  });

  console.log("cardlist", CardList);

  return (
    <View
      style={{
        flex: 1,
        flexWrap: "wrap",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {CardList}
        </View>
      </View>
    </View>
  );
}

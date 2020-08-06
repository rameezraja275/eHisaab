import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { addItemToSale } from "../../store/actions/sale";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { createUniqueID } from "../../utils/helper";
import { getTranslation } from "../../utils/language";
import constants from "../../utils/constants";
import Picker from "../../Components/Picker";
import AutoComplete from "../../Components/AutoComplete";

const AddnonInventoryItem = (props) => {
  const [formData, setFormData] = useState({
    current_stock: 100,
    product_name: "",
    product_sale_price: null,
    product_cost_price: null,
    opening_stock: null,
  });

  console.log("in component", props.nonInventoryItems);
  const onSubmit = () => {
    let { product_name, product_sale_price, product_cost_price } = formData;

    const id = "noninv_" + createUniqueID();

    product_sale_price = Number(product_sale_price);
    product_cost_price = Number(product_cost_price);
    if (
      product_cost_price == null ||
      product_sale_price == null ||
      product_name == null ||
      product_cost_price == "" ||
      product_sale_price == "" ||
      product_name == ""
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else if (product_sale_price < product_cost_price) {
      ShowFlash("SALE_PRICE_SHOULD_BE_GREATER", "danger", props.language);
    } else {
      props.addItemToSale({ ...formData, id }, true);
      props.navigation.navigate("List");
      setFormData({
        product_name: null,
        product_sale_price: null,
        product_cost_price: null,
        current_stock: 100,
      });
    }
  };

  // const type = [
  //   {
  //     id: constants.PRODUCT,
  //     is_service: getTranslation("PRODUCT", props.language),
  //   },
  //   {
  //     id: constants.SERVICE,
  //     is_service: getTranslation("SERVICE", props.language),
  //   },
  // ];

  return (
    <KeyboardAvoidingView
      style={styles.MainContainer}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          keyboardDismissMode={"on-drag"}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.Form}>
            {/* <AutoComplete
              value={formData.product_name}
              data={props.nonInventoryItems}
              onChange={(text) =>
                setFormData({ ...formData, product_name: text })
              }
              placeholder="NAME"
              required
            /> */}
            <TextInput
              value={formData.product_name}
              onChange={(text) =>
                setFormData({ ...formData, product_name: text })
              }
              placeholder="NAME"
              required
              autoCapitalize="sentences"
            />
            {/* <Picker
              placeholder="TYPE"
              options={type}
              value={formData.is_service}
              type="is_service"
              required
              onChange={(text) =>
                setFormData({ ...formData, is_service: text })
              }
            /> */}
            <TextInput
              value={formData.product_cost_price}
              onChange={(text) =>
                setFormData({ ...formData, product_cost_price: text })
              }
              keyboardType={"number-pad"}
              placeholder="COST_PRICE"
              required
            />
            <TextInput
              value={formData.product_sale_price}
              onChange={(text) =>
                setFormData({ ...formData, product_sale_price: text })
              }
              keyboardType={"number-pad"}
              placeholder="SALE_PRICE"
              required
            />
          </View>
          <View style={styles.Button}>
            <View style={{ flex: 1 }}>
              <Button title={"ADD_TO_CART"} onClick={onSubmit} icon="save" />
            </View>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.lightColor,
  },
  Form: {
    margin: 15,
  },
  Button: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  margintop: {
    marginTop: 15,
    fontSize: 15,
  },
});

const mapStateToProps = ({ common, nonInventoryItems }) => {
  return {
    loading: common.loading,
    language: common.language,
    nonInventoryItems: nonInventoryItems.nonInventoryItems,
  };
};

export default connect(mapStateToProps, { addItemToSale })(AddnonInventoryItem);

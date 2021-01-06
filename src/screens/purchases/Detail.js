import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  delItemFromPurchase,
  updateItemFromPurchase,
  addDiscountPurchase,
  deletePurchase,
} from "../../store/actions/purchase";
import colors from "../../utils/colors";
import FloatingButton from "../../Components/FloatingButton";
import CheckOutListItem from "../../Components/CheckOutListItem";
import TextInput from "../../Components/TextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { FormatPrice } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import { showAlert } from "../../utils/helper";
import { getTranslation } from "../../utils/language";

const Details = (props) => {
  const [discountStatus, setDiscount] = useState(false);
  const { totalPrice, totalItem } = props.cartStatus;

  const [options, showOptions] = useState(false);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.deletePurchase(props.purchaseData.purchase_id);
      },
      props.language
    );
  };

  useEffect(() => {
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  const { discount } = props;
  return (
    <KeyboardAvoidingView
      style={styles.MainContainer}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      <OptionsAction
        status={options}
        close={showOptions}
        title="DELETE"
        onSelect={onDelete}
        danger={true}
      />

      <FlatList
        style={{ flex: 1, backgroundColor: colors.lightColor }}
        data={props.cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CheckOutListItem
            item={{ ...item, price: item.product_cost_price }}
            onDel={() => props.delItemFromPurchase(item)}
            onSubmit={props.updateItemFromPurchase}
          />
        )}
      />

      <View
        style={{
          padding: 15,
          backgroundColor: colors.lightColor,
          alignItems: "flex-start",
        }}
      >
        <TouchableWithoutFeedback onPress={() => setDiscount(!discountStatus)}>
          {!discountStatus ? (
            <Text
              style={{
                color: colors.primaryColor,
                fontSize: 20,
                padding: 5,
                fontFamily: "PrimaryFont",
              }}
            >
              {getTranslation("ADD_DISCOUNT", props.language)}
            </Text>
          ) : (
              <Icon name="times" size={20} color={colors.darkColor} />
            )}
        </TouchableWithoutFeedback>
        {discountStatus && (
          <View style={{ width: "50%", marginBottom: 5 }}>
            <TextInput
              value={discount}
              onChange={(text) => {
                props.addDiscountPurchase(text);
              }}
              placeholder="DISCOUNT"
              keyboardType={"number-pad"}
            />
          </View>
        )}
        {discount > 0 && (
          <Text
            style={{ fontSize: 13, marginLeft: 5, fontFamily: "PrimaryFont" }}
          >
            {getTranslation("DISCOUNT", props.language) +
              " : " +
              FormatPrice(discount)}
          </Text>
        )}
        <Text
          style={{ fontSize: 13, marginLeft: 5, fontFamily: "PrimaryFont" }}
        >
          {getTranslation("TOTAL", props.language) +
            " : " +
            FormatPrice(totalPrice)}
        </Text>
        <Text
          style={{ fontSize: 20, marginLeft: 5, fontFamily: "PrimaryFont" }}
        >
          {getTranslation("NET_TOTAL", props.language) +
            " : " +
            FormatPrice(totalPrice - discount)}
        </Text>
      </View>

      <FloatingButton
        onClick={() => props.navigation.navigate("CheckOut", { isOpenPurchase: totalItem == 0 ? true : false })}
        icon="shoppingcart"
      // disabled={totalItem == 0 ? true : false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.lightColor,
  },
  ListItem: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const mapStateToProps = ({ product, common, purchase }) => {
  return {
    loading: common.loading,
    products: product.products,
    cartStatus: purchase.cartStatus,
    cart: purchase.purchaseCart,
    discount: purchase.discount,
    purchaseData: purchase.purchaseData,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  delItemFromPurchase,
  updateItemFromPurchase,
  addDiscountPurchase,
  deletePurchase,
})(Details);

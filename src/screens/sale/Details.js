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
  delItemFromSale,
  updateItemFromSale,
  addDiscountSale,
  saleDelete,
} from "../../store/actions/sale";
import colors from "../../utils/colors";
import FloatingButton from "../../Components/FloatingButton";
import CheckOutListItem from "../../Components/CheckOutListItem";
import TextInput from "../../Components/TextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { FormatPrice } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import { showAlert } from "../../utils/helper";
import { getTranslation } from "../../utils/language";
import BarCodeReader from '../../Components/BarCodeReader'
import { addItemToSale } from "../../store/actions/sale";
import { ShowFlash } from "../../utils/helper";
import Loader from "../../Components/Loader";

const Details = (props) => {
  const [discountStatus, setDiscount] = useState(false);
  const { totalPrice, totalItem } = props.cartStatus;

  const [options, showOptions] = useState(false);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.saleDelete(props.saleData.sale_id);
      },
      props.language
    );
  };

  useEffect(() => {

    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  const { barcode } = props.navigation.state.params

  const onScan = (code) => {
    const item = props.products.find((item) =>
      item.product_code == code
    );

    item ? props.addItemToSale(item) : ShowFlash("NO_PRODUCT_FOUND", "danger", props.language);

  };
  const [scanned, setScanned] = useState(false)
  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (

          <KeyboardAvoidingView
            style={styles.MainContainer}
            behavior={Platform.Os == "ios" ? "padding" : "height"}
          >

            {
              barcode && <View style={{ height: 200, justifyContent: "center" }}><BarCodeReader scanned={scanned} setScanned={setScanned} onScan={onScan} /></View>
            }
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
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CheckOutListItem
                  item={{ ...item, price: item.product_sale_price }}
                  onDel={() => props.delItemFromSale(item)}
                  onSubmit={props.updateItemFromSale}
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
                <View style={{ width: "50%" }}>
                  <TextInput
                    value={props.discount}
                    onChange={(text) => {
                      props.addDiscountSale(text);
                    }}
                    placeholder="DISCOUNT"
                    keyboardType={"number-pad"}
                  />
                </View>
              )}
              {props.discount > 0 && (
                <Text
                  style={{ fontSize: 13, marginLeft: 5, fontFamily: "PrimaryFont" }}
                >
                  {getTranslation("DISCOUNT", props.language) +
                    " : " +
                    FormatPrice(props.discount)}
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
                  FormatPrice(totalPrice - props.discount)}
              </Text>
            </View>

            <FloatingButton
              onClick={() => props.navigation.navigate("CheckOut", { isOpenSale: totalItem == 0 ? true : false })}
              icon="shoppingcart"
            // disabled={totalItem == 0 ? true : false}
            />
          </KeyboardAvoidingView>

        )}
    </View>
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

const mapStateToProps = ({ product, common, sale }) => {
  return {
    loading: common.loading,
    products: product.products,
    cartStatus: sale.cartStatus,
    cart: sale.saleCart,
    discount: sale.discount,
    saleData: sale.saleData,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  delItemFromSale,
  updateItemFromSale,
  addDiscountSale,
  saleDelete,
  addItemToSale
})(Details);

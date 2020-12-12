import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { customerGet } from "../../store/actions/customer";
import { makeSale, addSaleData, addTotalPrice } from "../../store/actions/sale";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import Picker from "../../Components/Picker";
import DatePicker from "../../Components/DatePicker";
import InfoCard from "../../Components/InfoCard";
import { FormatPrice, FormatDate } from "../../utils/helper";

const CheckOut = (props) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    paid_amount: null,
    customer_id: 0,
    narration: null,
  });

  const editAble = props.saleData.sale_id ? true : false;
  const { isOpenSale } = props.navigation.state.params

  const onSubmit = () => {
    const { paid_amount, customer_id, date } = formData;
    if (paid_amount == null || paid_amount == "" || date == null || props.cartStatus.totalPrice == 0) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else if (
      (paid_amount != props.cartStatus.totalPrice - props.discount &&
        customer_id == 0)
    ) {
      ShowFlash("PAID_TOTAL_AMOUNT_SHOULD_EQUAL", "danger", props.language);
    } else {
      props.makeSale(formData);
    }
  };

  useEffect(() => {
    const { date, paid_amount, customer_id, narration } = props.saleData;
    setFormData({
      date,
      paid_amount,
      customer_id,
      narration,
    });
  }, []);

  const netAmount = props.cartStatus.totalPrice - props.discount;

  useEffect(() => {
    if (!editAble) {
      formData.customer_id == null
        ? setFormData({ ...formData, paid_amount: netAmount.toString() })
        : setFormData({ ...formData, paid_amount: "" });
    }
  }, [formData.customer_id]);

  const setTotalPrice = (price) => {
    props.addTotalPrice(price)
  }

  console.log("totla proce", props.cartStatus.totalPrice)

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
            <View style={styles.infobox}>
              <InfoCard
                title="TOTAL_AMOUNT"
                value={FormatPrice(props.cartStatus.totalPrice)}
              />
              {props.discount > 0 && (
                <InfoCard title="DISCOUNT" value={FormatPrice(props.discount)} />
              )}
              {props.discount > 0 && (
                <InfoCard
                  title="NET_AMOUNT"
                  value={FormatPrice(
                    netAmount
                    // props.cartStatus.totalPrice - props.discount
                  )}
                />
              )}
            </View>

            <View style={styles.Form}>
              <DatePicker
                placeholder="DATE"
                required
                date={formData.date}
                setDate={(text) => setFormData({ ...formData, date: text })}
              />
              <Picker
                placeholder="CUSTOMER"
                options={props.customers}
                value={formData.customer_id}
                type="customer_name"
                onChange={(text) =>
                  setFormData({ ...formData, customer_id: text == null ? 0 : text })
                }
              />
              {
                isOpenSale && <TextInput
                  value={props.cartStatus.totalPrice}
                  onChange={(text) =>
                    setTotalPrice(text)
                  }
                  keyboardType={"number-pad"}
                  placeholder="TOTAL_AMOUNT"
                  required
                />
              }
              <TextInput
                value={formData.paid_amount}
                onChange={(text) =>
                  setFormData({ ...formData, paid_amount: text })
                }
                keyboardType={"number-pad"}
                placeholder="AMOUNT_PAID"
                required
              />
              <TextInput
                value={formData.narration}
                onChange={(text) => setFormData({ ...formData, narration: text })}
                placeholder="DESCRIPTION"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.Button}>
              <View style={{ flex: 1 }}>
                <Button
                  title={"NEW_CUSTOMER"}
                  type={"secondary"}
                  icon="plus"
                  onClick={() => props.navigation.navigate("AddCustomer")}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Button title={"SALE"} onClick={onSubmit} icon="save" />
              </View>
            </View>
            <View style={{ flex: 1, margin: 15 }}>
              <Button
                title={"GENRATE_QUOTATION"}
                type={"secondary"}
                onClick={() => {
                  props.navigation.navigate("Quotation");
                }}
                icon="file1"
              />
            </View>
            {props.saleData.sale_id && (
              <View style={{ flex: 1, marginHorizontal: 15 }}>
                <Button
                  title={"GENRATE_BILL"}
                  onClick={() => {
                    props.navigation.navigate("Bill", { duplicate: true });
                  }}
                  type={"secondary"}
                  icon="pdffile1"
                />
              </View>
            )}
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
  },
  margintop: {
    marginTop: 15,
    fontSize: 15,
  },
  infobox: {
    backgroundColor: colors.darkColor,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    zIndex: -11111,
  },
});

const mapStateToProps = ({ common, customer, sale }) => {
  return {
    loading: common.loading,
    customers: customer.customers,
    cartStatus: sale.cartStatus,
    discount: sale.discount,
    saleData: sale.saleData,
    saleCart: sale.saleCart,
    language: common.language,
  };
};

export default connect(mapStateToProps, { makeSale, customerGet, addSaleData, addTotalPrice })(
  CheckOut
);

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { supplierGet } from "../../store/actions/supplier";
import { makePurchase, addTotalPrice } from "../../store/actions/purchase";
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
    supplier_id: null,
    narration: null,
  });

  const { isOpenPurchase } = props.navigation.state.params

  const onSubmit = () => {
    const { date, paid_amount, supplier_id } = formData;
    if (
      date == null ||
      paid_amount == null ||
      paid_amount == "" ||
      supplier_id == null ||
      supplier_id == "" ||
      props.cartStatus.totalPrice == 0
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      props.makePurchase(formData);
    }
  };

  useEffect(() => {
    props.supplierGet(0);
    const { date, paid_amount, supplier_id, narration } = props.purchaseData;
    setFormData({
      date,
      paid_amount,
      supplier_id,
      narration,
    });
  }, []);

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
                    props.cartStatus.totalPrice - props.discount
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
                placeholder="SUPPLIER"
                options={props.suppliers}
                value={formData.supplier_id}
                type="supplier_name"
                onChange={(text) =>
                  setFormData({ ...formData, supplier_id: text })
                }
                required
              />
              {
                isOpenPurchase && <TextInput
                  value={props.cartStatus.totalPrice}
                  onChange={props.addTotalPrice}
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
                <Button title={"PURCHASE"} onClick={onSubmit} />
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
  },
  margintop: {
    marginTop: 15,
    fontSize: 15,
  },
  infobox: {
    backgroundColor: colors.darkColor,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
});

const mapStateToProps = ({ common, supplier, purchase }) => {
  return {
    loading: common.loading,
    suppliers: supplier.suppliers,
    cartStatus: purchase.cartStatus,
    discount: purchase.discount,
    purchaseData: purchase.purchaseData,
    language: common.language,
  };
};

export default connect(mapStateToProps, { makePurchase, supplierGet, addTotalPrice })(
  CheckOut
);

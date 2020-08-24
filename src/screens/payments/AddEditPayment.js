import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  paymentCreate,
  paymentModify,
  paymentDelete,
} from "../../store/actions/payment";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import DatePicker from "../../Components/DatePicker";
import { supplierGet } from "../../store/actions/supplier";
import Picker from "../../Components/Picker";
import OptionsAction from "../../Components/Options";
import { showAlert } from "../../utils/helper";
import InfoCard from "../../Components/InfoCard";
import { FormatPrice } from "../../utils/helper";

const AddEditPayment = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    date: new Date(),
    supplier_id: null,
    narration: null,
    dr: null,
    cr: null,
    narration: null,
  });
  const [options, showOptions] = useState(false);
  const [amount, setAmount] = useState(0);
  const FormType =
    props.navigation.state.routeName == "EditPayment" ? "edit" : "add";

  useEffect(() => {
    props.supplierGet(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.payment,
        date: new Date(props.navigation.state.params.payment.transaction_date),
      });
  }, []);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.paymentDelete(formData.id);
      },
      props.language
    );
  };

  useEffect(() => {
    props.suppliers.map((supplier) => {
      if (supplier.id == formData.supplier_id) {
        setAmount(supplier.current_balance);
      }
    });
  }, [formData.supplier_id]);

  const onSubmit = () => {
    const { supplier_id, dr, date } = formData;
    if (
      supplier_id == null ||
      supplier_id == "" ||
      date == null ||
      dr == null ||
      dr == ""
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.paymentCreate(formData)
        : props.paymentModify(formData);
      setFormData({
        id: null,
        date: new Date(),
        supplier_id: null,
        narration: null,
        dr: null,
        cr: null,
        narration: null,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.MainContainer}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
        <React.Fragment>
          <OptionsAction
            status={options}
            close={showOptions}
            title="DELETE"
            onSelect={onDelete}
            danger={true}
          />

          <ScrollView
            style={{ flex: 1 }}
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={styles.infobox}>
              <InfoCard
                title="AMOUNT"
                value={FormatPrice(amount)}
                color={amount <= 0 ? colors.success : colors.danger}
              />
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
              <TextInput
                keyboardType={"number-pad"}
                placeholder="AMOUNT"
                value={formData.dr}
                onChange={(text) => setFormData({ ...formData, dr: text })}
                required
              />
              <TextInput
                value={formData.narration}
                onChange={(text) =>
                  setFormData({ ...formData, narration: text })
                }
                placeholder="DESCRIPTION"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.Button}>
              <View style={{ flex: 1 }}>
                <Button title={"SAVE"} onClick={onSubmit} icon="save" />
              </View>
            </View>
          </ScrollView>
        </React.Fragment>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infobox: {
    backgroundColor: colors.darkColor,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    zIndex: -11111,
  },
});

const mapStateToProps = ({ common, supplier }) => {
  return {
    loading: common.loading,
    suppliers: supplier.suppliers,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  paymentCreate,
  paymentModify,
  paymentDelete,
  supplierGet,
})(AddEditPayment);

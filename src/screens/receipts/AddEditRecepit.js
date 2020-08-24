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
  receiptCreate,
  receiptModify,
  receiptDelete,
  setReceiptData,
} from "../../store/actions/receipt";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import DatePicker from "../../Components/DatePicker";
import { customerGet } from "../../store/actions/customer";
import Picker from "../../Components/Picker";
import OptionsAction from "../../Components/Options";
import { showAlert } from "../../utils/helper";
import InfoCard from "../../Components/InfoCard";
import { FormatPrice } from "../../utils/helper";

const AddEditReceipt = (props) => {
  const language = props.language;
  const [formData, setFormData] = useState({
    id: null,
    date: new Date(),
    customer_id: null,
    narration: null,
    dr: null,
    cr: null,
    narration: null,
  });
  const [options, showOptions] = useState(false);
  const [amount, setAmount] = useState(0);
  const FormType =
    props.navigation.state.routeName == "EditReceipt" ? "edit" : "add";

  useEffect(() => {
    props.customerGet(0)
    props.navigation.setParams({
      showOptions: showOptions,
    });
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.receipt,
        date: new Date(props.navigation.state.params.receipt.transaction_date),
      });
  }, []);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.receiptDelete(formData.id);
      },
      language
    );
  };

  useEffect(() => {
    props.customers.map((customer) => {
      if (customer.id == formData.customer_id) {
        setAmount(customer.current_balance);
      }
    });
  }, [formData.customer_id]);

  const onSubmit = () => {
    const { customer_id, date, cr } = formData;
    if (
      customer_id == null ||
      customer_id == "" ||
      date == null ||
      date == "" ||
      cr == null ||
      cr == ""
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", language);
    } else {
      FormType == "add"
        ? props.receiptCreate(formData)
        : props.receiptModify(formData);
      setFormData({
        id: null,
        date: new Date(),
        customer_id: null,
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
                  color={amount >= 0 ? colors.success : colors.danger}
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
                  placeholder="CUSTOMER"
                  options={props.customers}
                  value={formData.customer_id}
                  type="customer_name"
                  onChange={(text) =>
                    setFormData({ ...formData, customer_id: text })
                  }
                  required
                />
                <TextInput
                  keyboardType={"number-pad"}
                  placeholder="AMOUNT"
                  value={formData.cr}
                  onChange={(text) => setFormData({ ...formData, cr: text })}
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
              {formData.id && (
                <View style={styles.Button}>
                  <View style={{ flex: 1, marginTop: 5 }}>
                    <Button
                      title={"GENERATE_RECEIPT"}
                      onClick={() => {
                        props.setReceiptData(formData);
                      }}
                      icon="pdffile1"
                    />
                  </View>
                </View>
              )}
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
  infobox: {
    backgroundColor: colors.darkColor,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
});

const mapStateToProps = ({ common, customer }) => {
  return {
    loading: common.loading,
    language: common.language,
    customers: customer.customers,
  };
};

export default connect(mapStateToProps, {
  receiptCreate,
  receiptModify,
  receiptDelete,
  customerGet,
  setReceiptData,
})(AddEditReceipt);

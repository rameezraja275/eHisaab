import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { customerCreate, customerModify } from "../../store/actions/customer";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";

const AddEditCustomer = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    customer_address: null,
    customer_name: null,
    customer_phone: null,
    opening_balance: null,
  });

  const FormType =
    props.navigation.state.routeName == "EditCustomer" ? "edit" : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.customer,
      });
  }, []);

  const onSubmit = () => {
    const { customer_name } = formData;
    if (customer_name == null || customer_name == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.customerCreate(formData)
        : props.customerModify(formData);
      setFormData({
        id: null,
        customer_phone: null,
        customer_name: null,
        customer_address: null,
        opening_balance: null,
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
        <ScrollView style={{ flex: 1 }} keyboardDismissMode={"on-drag"}>
          <View style={styles.Form}>
            <TextInput
              value={formData.customer_name}
              onChange={(text) =>
                setFormData({ ...formData, customer_name: text })
              }
              placeholder="NAME"
              required
            />
            <TextInput
              value={formData.customer_phone}
              onChange={(text) =>
                setFormData({ ...formData, customer_phone: text })
              }
              placeholder="PHONE_NUMBER"
              keyboardType={"phone-pad"}
            />
            <TextInput
              value={formData.customer_address}
              onChange={(text) =>
                setFormData({ ...formData, customer_address: text })
              }
              placeholder="ADDRESS"
            />
            <TextInput
              placeholder="OPENING_BALANCE"
              value={formData.opening_balance}
              disabled={FormType == "edit" ? true : false}
              onChange={(text) =>
                setFormData({ ...formData, opening_balance: text })
              }
              keyboardType={"number-pad"}
            />
          </View>
          <View style={styles.Button}>
            <View style={{ flex: 1 }}>
              <Button title={"SAVE"} onClick={onSubmit} icon="save" />
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
});

const mapStateToProps = ({ common }) => {
  return {
    loading: common.loading,
    language: common.language,
  };
};

export default connect(mapStateToProps, { customerCreate, customerModify })(
  AddEditCustomer
);

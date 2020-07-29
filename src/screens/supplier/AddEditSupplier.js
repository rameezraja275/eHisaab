import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { supplierCreate, supplierModify } from "../../store/actions/supplier";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";

const AddEditSupplier = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    supplier_address: null,
    supplier_name: null,
    supplier_phone: null,
    opening_balance: null,
  });

  const FormType =
    props.navigation.state.routeName == "EditSupplier" ? "edit" : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.supplier,
      });
  }, []);

  const onSubmit = () => {
    const { supplier_name } = formData;
    if (supplier_name == null || supplier_name == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.supplierCreate(formData)
        : props.supplierModify(formData);
      setFormData({
        id: null,
        supplier_phone: null,
        supplier_name: null,
        supplier_address: null,
        supplier_balance: null,
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
        <ScrollView
          style={{ flex: 1 }}
          keyboardDismissMode={"on-drag"}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.Form}>
            <TextInput
              value={formData.supplier_name}
              onChange={(text) =>
                setFormData({ ...formData, supplier_name: text })
              }
              placeholder="NAME"
              required
            />
            <TextInput
              value={formData.supplier_phone}
              onChange={(text) =>
                setFormData({ ...formData, supplier_phone: text })
              }
              placeholder="PHONE_NUMBER"
              keyboardType={"phone-pad"}
            />
            <TextInput
              value={formData.supplier_address}
              onChange={(text) =>
                setFormData({ ...formData, supplier_address: text })
              }
              placeholder="ADDRESS"
            />
            <TextInput
              keyboardType={"number-pad"}
              placeholder="OPENING_BALANCE"
              disabled={FormType == "edit" ? true : false}
              value={formData.opening_balance}
              onChange={(text) =>
                setFormData({ ...formData, opening_balance: text })
              }
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ common }) => {
  return {
    loading: common.loading,
    language: common.language,
  };
};

export default connect(mapStateToProps, { supplierCreate, supplierModify })(
  AddEditSupplier
);

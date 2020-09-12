import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  addBank,
  updateBank,
} from "../../store/actions/bank";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";

const AddEditBank = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    bank_name: null,
    account_no: null,
    opening_balance: null
  });

  const FormType =
    props.navigation.state.routeName == "EditBank"
      ? "edit"
      : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.bank,
      });
  }, []);

  const onSubmit = () => {
    const { bank_name, account_no } = formData;
    if (bank_name == null || bank_name == "" || account_no == null || account_no == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.addBank(formData)
        : props.updateBank(formData);
      setFormData({
        id: null,
        bank_name: null,
        account_no: null,
        opening_balance: null
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
                value={formData.bank_name}
                onChange={(text) =>
                  setFormData({ ...formData, bank_name: text })
                }
                placeholder="NAME"
                autoCapitalize="sentences"
                required
              />

              <TextInput
                placeholder="ACCOUNT_NUMBER"
                value={formData.account_no}
                disabled={FormType == "edit" ? true : false}
                onChange={(text) =>
                  setFormData({ ...formData, account_no: text })
                }
                keyboardType={"number-pad"}
                required
              />

              <TextInput
                placeholder="OPENING_BALANCE"
                value={formData.opening_balance}
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

export default connect(mapStateToProps, {
  addBank,
  updateBank,
})(AddEditBank);

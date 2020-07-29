import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { changePasswordwithCode } from "../../store/actions/user";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash, validatePassword } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";

const ChangePassword = (props) => {
  const [formData, setFormData] = useState({
    code: null,
    new_password: null,
    confirm_password: null,
  });

  const onSubmit = () => {
    const { code, new_password, confirm_password } = formData;
    if (
      code == null ||
      code == "" ||
      new_password == null ||
      new_password == "" ||
      confirm_password == null ||
      confirm_password == ""
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      validatePassword(new_password, confirm_password, props.language) &&
        props.changePasswordwithCode(formData);
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
              value={formData.code}
              onChange={(text) => setFormData({ ...formData, code: text })}
              placeholder="VERFICATION_CODE"
              required
              keyboardType={"number-pad"}
            />

            <TextInput
              value={formData.new_password}
              onChange={(text) =>
                setFormData({ ...formData, new_password: text })
              }
              placeholder="NEW_PASSWORD"
              required
              secureTextEntry={true}
            />

            <TextInput
              value={formData.confirm_password}
              onChange={(text) =>
                setFormData({ ...formData, confirm_password: text })
              }
              placeholder="CONFIRM_PASSWORD"
              required
              secureTextEntry={true}
            />
          </View>
          <View style={styles.Button}>
            <View style={{ flex: 1 }}>
              <Button
                title={"CHANGE_PASSWORD"}
                onClick={onSubmit}
                icon="save"
              />
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

export default connect(mapStateToProps, { changePasswordwithCode })(
  ChangePassword
);

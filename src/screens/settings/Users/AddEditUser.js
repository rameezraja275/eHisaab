import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { userCreate, userModify } from "../../../store/actions/user";
import Button from "../../../Components/Button";
import TextInput from "../../../Components/TextInput";
import { ShowFlash, validatePassword } from "../../../utils/helper";
import Picker from "../../../Components/Picker";
import colors from "../../../utils/colors";
import Loader from "../../../Components/Loader";

const AddEditUser = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    user_name: null,
    full_name: null,
    password: null,
    cpassword: null,
  });

  const FormType =
    props.navigation.state.routeName == "EditUser" ? "edit" : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.user,
      });
  }, []);

  const onSubmit = () => {
    const { user_name, full_name, password, cpassword } = formData;
    if (
      user_name == null ||
      full_name == null ||
      password == null ||
      cpassword == null ||
      user_name == "" ||
      full_name == "" ||
      password == "" ||
      cpassword == ""
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else if (validatePassword(password, cpassword, props.language)) {
      FormType == "add"
        ? props.userCreate(formData)
        : props.userModify(formData);
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
              value={formData.user_name}
              onChange={(text) => setFormData({ ...formData, user_name: text })}
              placeholder="USER_NAME"
              required
              disabled={FormType == "edit" ? true : false}
            />

            <TextInput
              value={formData.full_name}
              onChange={(text) => setFormData({ ...formData, full_name: text })}
              placeholder="FULL_NAME"
              required
            />

            <TextInput
              style={{ flex: 1 }}
              value={formData.password}
              onChange={(text) => setFormData({ ...formData, password: text })}
              placeholder="PASSWORD"
              required
              secureTextEntry={true}
            />
            <TextInput
              style={{ flex: 1 }}
              value={formData.cpassword}
              onChange={(text) => setFormData({ ...formData, cpassword: text })}
              placeholder="CONFIRM_PASSWORD"
              required
              secureTextEntry={true}
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
    marginBottom: 15,
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

export default connect(mapStateToProps, { userCreate, userModify })(
  AddEditUser
);

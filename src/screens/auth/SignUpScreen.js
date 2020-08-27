import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Linking } from "react-native";
import { connect } from "react-redux";
import { signup } from "../../store/actions/auth";
import DismissKeyboard from "../../Components/DismissKeyboard";
import { CountryList, ShowFlash, validatePassword } from "../../utils/helper";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { getTranslation } from "../../utils/language";
import constants from "../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import Link from "../../Components/Links";

const SignupScreen = ({
  navigation,
  signup,
  signupResp,
  loading,
  language,
}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);
  const [full_name, setName] = useState(null);
  const countryList = CountryList;

  if (signupResp && signupResp == 200) {
    navigation.navigate("Drawer");
  }

  const openInBrowser = (link) => {
    Linking.openURL(`${link}`);
  };

  const DoSignUp = () => {
    if (
      email === "" ||
      password === "" ||
      full_name === "" ||
      cpassword == "" ||
      email === null ||
      full_name === null ||
      password === null ||
      cpassword == null
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", language);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      ShowFlash("ENTER_VALID_EMAIL", "danger", language);
    } else {
      validatePassword(password, cpassword, language) &&
        signup({
          email: email,
          password: password,
          full_name: full_name,
        });
    }
  };

  return loading.status ? (
    <Loader size={10} />
  ) : (
      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 40,
          }}
        >
          <Image
            style={{ width: 190, height: 200 }}
            source={images.logo_vertical}
          />
        </View> */}
          <View>
            {/* <Picker placeholder="Country" options={countryList} value={ country } type="value"
                            	onChange={ (text) => setCountry(text) } required/> */}
            <TextInput
              style={{ flex: 1 }}
              value={email}
              onChange={setEmail}
              placeholder="EMAIL"
              keyboardType="email-address"
              required
            />
            <TextInput
              value={full_name}
              onChange={setName}
              placeholder="USER_NAME"
              required
            />
            <TextInput
              style={{ flex: 1 }}
              value={password}
              onChange={setPassword}
              placeholder="PASSWORD"
              required
              secureTextEntry={true}
            />
            <TextInput
              style={{ flex: 1 }}
              value={cpassword}
              onChange={setCPassword}
              placeholder="CONFIRM_PASSWORD"
              required
              secureTextEntry={true}
            />
            <View style={{ marginBottom: 10, alignItems: "center" }}>
              <Link
                onPress={() => { console.log(constants.TERMS_URL); openInBrowser(constants.TERMS_URL) }}
                text="POLICY"
                language={language}
              />
            </View>
          </View>
          <View>
            <Button style={styles.Button} title="SIGN_UP" onClick={DoSignUp} />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightColor,
  },
  Button: {
    backgroundColor: colors.primaryColor,
  },
});

const mapStateToProps = ({ user, common }) => {
  return {
    signupResp: user.signupResp,
    loading: common.loading,
    language: common.language,
  };
};

export default connect(mapStateToProps, { signup })(SignupScreen);

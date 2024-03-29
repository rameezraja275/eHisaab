import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import colors from "../../utils/colors";
import DismissKeyboard from "../../Components/DismissKeyboard";
import { signin } from "../../store/actions/auth";
import { ShowFlash } from "../../utils/helper";
import { getTranslation } from "../../utils/language";
import images from "../../utils/images";
import Link from "../../Components/Links";
import { notifications } from "react-native-firebase-push-notifications"

const SigninScreen = ({ navigation, signin, loading, language }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fcmToken, setFcmToken] = useState(null)

  const DoSignIn = () => {
    if (email == null || password == null || email == "" || password == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", language);
    } else {
      signin({
        email: email,
        password: password,
        device_token: fcmToken
      });
    }
  };

  useEffect(() => {
    getToken()
  })

  const getToken = async () => {
    const token = await notifications.getToken()
    setFcmToken(token)
    return
  }

  return loading.status ? (
    <Loader size={10} />
  ) : (
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 80,
            // backgroundColor: "red",
          }}
        >
          <Image
            resizeMode={"cover"}
            // style={{ width: width * 0.5, height: 100, overflow: "visible" }}
            style={{ width: 130, height: 100 }}
            source={images.icon_transparent}
          />
        </View>
        <View style={{ height: 130 }}>
          <TextInput
            value={email}
            onChange={setEmail}
            placeholder="EMAIL"
            keyboardType="email-address"
            required
          />
          <TextInput
            value={password}
            onChange={setPassword}
            placeholder="PASSWORD"
            required
            secureTextEntry={true}
          />
        </View>
        <View>
          <Button style={styles.Button} title="SIGN_IN" onClick={DoSignIn} />
          <View style={{ alignItems: "flex-end" }}>
            <Link
              onPress={() => navigation.navigate("ForgotPassword")}
              text="FORGOT_PASSWORD"
              language={language}
            />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Link
              onPress={() => navigation.navigate("Signup")}
              text="NO_ACCOUNT"
              language={language}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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

export default connect(mapStateToProps, { signin })(SigninScreen);

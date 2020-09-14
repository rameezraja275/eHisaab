import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import colors from "../../utils/colors";
import DismissKeyboard from "../../Components/DismissKeyboard";
import { verifyUser, resendCode } from "../../store/actions/auth";
import { logout } from "../../store/actions/auth";
import { ShowFlash } from "../../utils/helper";
import Loader from "../../Components/Loader";
import { showAlert } from "../../utils/helper";
import { getTranslation } from "../../utils/language";

const Verification = ({
  loading,
  verifyUser,
  resendCode,
  logout,
  navigation,
  language,
}) => {
  const [code, setCode] = useState(null);

  const Verify = () => {
    if (code == null || code == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", language);
    } else {
      verifyUser(code);
    }
  };

  const onLogout = () => {
    showAlert(
      "YOU_SURE",
      () => {
        logout();
      },
      language
    );
  };

  let backhandler;
  useEffect(() => {
    backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      function () {
        return true;
      }
    );

    navigation.setParams({
      onLogout,
    });
  }, []);

  useEffect(() => {
    return () => {
      backhandler.remove();
    };
  }, []);

  return loading.status ? (
    <Loader size={10} />
  ) : (
      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View>
            <TextInput
              style={{ flex: 1 }}
              value={code}
              onChange={setCode}
              placeholder="VERFICATION_CODE"
              required
              keyboardType={"number-pad"}
              maxLength={5}
            />
          </View>
          <View>

            {/* <Text style={{ color: colors.darkColor }}>
              {getTranslation("CODE_SENT", language)}
            </Text> */}

            <TouchableOpacity onPress={resendCode} style={{ alignItems: "flex-end", marginBottom: 5 }}>
              <Text style={{ color: colors.darkColor }}>
                {getTranslation("RESEND_CODE", language)}
              </Text>
            </TouchableOpacity>
            <Button style={styles.Button} title="Verify" onClick={Verify} />
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
    // justifyContent: "center",
  },
  Button: {
    backgroundColor: colors.primaryColor,
  },
});

const mapStateToProps = ({ user, common }) => {
  return {
    currentUser: user.currentUser,
    loading: common.loading,
    language: common.language,
  };
};

export default connect(mapStateToProps, { verifyUser, resendCode, logout })(
  Verification
);

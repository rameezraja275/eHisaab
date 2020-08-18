import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { businessModify } from "../../store/actions/business";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import ImagerPicker from "../../Components/ImagePicker";

const Bussiness = (props) => {
  const { bussiness } = props;
  const [formData, setFormData] = useState({
    id: null,
    name: null,
    phone: null,
    address: null,
    logo: null,
    user_id: null,
    opening_cash: null,
  });

  useEffect(() => {
    setFormData({
      ...bussiness,
    });
  }, []);


  const onSubmit = () => {
    const { name } = formData;
    if (name == null || name == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      props.businessModify(formData);
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
                value={formData.name}
                onChange={(text) => setFormData({ ...formData, name: text })}
                placeholder="NAME"
                required
                autoCapitalize="words"
              />

              <TextInput
                value={formData.phone}
                onChange={(text) => setFormData({ ...formData, phone: text })}
                placeholder="PHONE_NUMBER"
                keyboardType={"phone-pad"}
              />

              <TextInput
                value={formData.address}
                onChange={(text) => setFormData({ ...formData, address: text })}
                placeholder="ADDRESS"
              />
              <TextInput
                keyboardType={"number-pad"}
                value={formData.opening_cash}
                onChange={(text) =>
                  setFormData({ ...formData, opening_cash: text })
                }
                placeholder="OPENING_CASH"
              />

              <ImagerPicker
                onChangeImage={(logo) =>
                  setFormData({ ...formData, logo: logo.base64 })
                }
                placeholder="LOGO"
                image={formData.logo}
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

const mapStateToProps = ({ common, bussiness }) => {
  return {
    loading: common.loading,
    bussiness: bussiness.bussiness,
    language: common.language,
  };
};

export default connect(mapStateToProps, { businessModify })(Bussiness);

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Divider from '../../Components/Divider';
import Picker from "../../Components/Picker";
import { connect } from "react-redux";
import { businessModify } from "../../store/actions/business";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash, validateAlphaNumaric } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import ImagerPicker from "../../Components/ImagePicker";
import api from '../../store/api'

const Bussiness = (props) => {
  const { bussiness } = props;
  const [formData, setFormData] = useState({
    id: null,
    name: null,
    store_name: null,
    category_id: null,
    phone: null,
    address: null,
    logo: null,
    user_id: null,
    opening_cash: null,
    narration: null,
    logo_existing: null
  });

  useEffect(() => {
    setFormData({
      ...bussiness, logo_existing: bussiness.logo,
    });
  }, []);

  const onSubmit = () => {

    const { name, store_name, category_id } = formData;
    if (name == null || name == "" || category_id == "" || category_id == null || category_id == 0) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      props.businessModify(formData);
    }
  };

  const validateStoreName = (text) => {
    if (validateAlphaNumaric(text)) {
      setFormData({ ...formData, store_name: text })
    }
  }

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
                maxLength={40}
              />
              <TextInput
                value={formData.phone}
                onChange={(text) => setFormData({ ...formData, phone: text })}
                placeholder="PHONE_NUMBER"
                keyboardType={"phone-pad"}
                maxLength={11}
              />

              <TextInput
                value={formData.address}
                onChange={(text) => setFormData({ ...formData, address: text })}
                placeholder="ADDRESS"
                maxLength={60}
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

              <Divider text="Online Store Setting" />

              <TextInput
                value={formData.store_name}
                onChange={validateStoreName}
                placeholder="ONLINE_STORE_NAME"
                noSpace
                maxLength={20}
                autoCapitalize="none"
                subheading={`${api.STORE_BASE_URL}${formData.store_name}`}
              />
              <Picker
                placeholder="CATEGORY"
                options={props.categories}
                value={formData.category_id}
                required
                type="name"
                onChange={(text) =>
                  setFormData({ ...formData, category_id: text == null ? 0 : text })
                }
              />
              <TextInput
                value={formData.narration}
                onChange={(text) => setFormData({ ...formData, narration: text })}
                placeholder="DESCRIPTION"
                autoCapitalize="sentences" STORE_BASE_URL
                maxLength={150}
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
    categories: bussiness.categories
  };
};

export default connect(mapStateToProps, { businessModify })(Bussiness);

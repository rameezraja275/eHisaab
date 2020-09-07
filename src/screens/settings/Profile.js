import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { profileModify, getOwnerProfile } from "../../store/actions/user";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";

const Profile = (props) => {
  const { owner } = props;
  const [formData, setFormData] = useState({
    email: null,
    full_name: null,
    phone_no: null,
  });

  useEffect(() => {
    props.getOwnerProfile();
  }, []);

  useEffect(() => {
    setFormData({
      ...owner,
    });
  }, [owner]);

  const onSubmit = () => {
    const { email, full_name, phone_no } = formData;
    if (email == null || email == "" || full_name == null || full_name == "" || phone_no == "" || phone_no == null) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      props.profileModify(formData);
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
                value={formData.email}
                onChange={(text) => setFormData({ ...formData, email: text })}
                placeholder="EMAIL"
                required
                disabled
              />

              <TextInput
                value={formData.full_name}
                onChange={(text) => setFormData({ ...formData, full_name: text })}
                placeholder="FULL_NAME"
                autoCapitalize="words"
                required
              />

              <TextInput
                value={formData.phone_no}
                onChange={(text) => setFormData({ ...formData, phone_no: text })}
                placeholder="PHONE_NUMBER"
                required
                keyboardType={"phone-pad"}
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

const mapStateToProps = ({ common, user }) => {
  return {
    loading: common.loading,
    langage: common.language,
    owner: user.owner,
  };
};

export default connect(mapStateToProps, { getOwnerProfile, profileModify })(
  Profile
);

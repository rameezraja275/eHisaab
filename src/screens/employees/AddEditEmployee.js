import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { employeeCreate, employeeModify } from "../../store/actions/employees";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import Picker from "../../Components/Picker";
import constants from "../../utils/constants";
import { getTranslation } from "../../utils/language";

const AddEditEmployee = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    employee_address: null,
    employee_name: null,
    employee_phone: null,
    opening_balance: null,
    salary: null,
    opening_balance_type: 0,
  });

  const FormType =
    props.navigation.state.routeName == "EditEmployee" ? "edit" : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.employee,
        salary: props.navigation.state.params.employee.employee_salary,
      });
  }, []);

  const onSubmit = () => {
    const { employee_name, salary } = formData;
    if (
      employee_name == null ||
      employee_name == "" ||
      salary == null ||
      salary == ""
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.employeeCreate(formData)
        : props.employeeModify(formData);
      setFormData({
        id: null,
        employee_address: null,
        employee_name: null,
        employee_phone: null,
        opening_balance: null,
        salary: null,
        opening_balance_type: 0,
      });
    }
  };

  const OB_type = [
    {
      id: constants.RECEIVABLE,
      type: getTranslation("RECEIVABLE", props.language),
    },
    {
      id: constants.PAYABLE,
      type: getTranslation("PAYABLE", props.language),
    },
  ];

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
              value={formData.employee_name}
              onChange={(text) =>
                setFormData({ ...formData, employee_name: text })
              }
              placeholder="NAME"
              autoCapitalize="sentences"
              required
            />
            <TextInput
              value={formData.salary}
              onChange={(text) => setFormData({ ...formData, salary: text })}
              keyboardType={"number-pad"}
              placeholder="SALARY"
              required
            />
            <TextInput
              value={formData.employee_address}
              onChange={(text) =>
                setFormData({ ...formData, employee_address: text })
              }
              placeholder="ADDRESS"
              autoCapitalize="sentences"
            />
            <TextInput
              value={formData.employee_phone}
              onChange={(text) =>
                setFormData({ ...formData, employee_phone: text })
              }
              placeholder="PHONE_NUMBER"
              keyboardType={"phone-pad"}
            />
            <View style={styles.pickeritem}>
              <Picker
                disabled={FormType == "edit" ? true : false}
                placeholder="OPENING_BALANCE_TYPE"
                options={OB_type == "0" ? null : OB_type}
                value={formData.opening_balance_type}
                type="type"
                onChange={(text) => {
                  setFormData({ ...formData, opening_balance_type: text });
                }}
              />
            </View>

            <TextInput
              keyboardType={"number-pad"}
              placeholder="OPENING_BALANCE"
              value={formData.opening_balance}
              disabled={FormType == "edit" ? true : false}
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
});

const mapStateToProps = ({ common, employee }) => {
  return {
    loading: common.loading,
    employeeCategories: employee.employeesCategories,
    language: common.language,
  };
};

export default connect(mapStateToProps, { employeeCreate, employeeModify })(
  AddEditEmployee
);

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
  employeeTransactionCreate,
  employeeTransactionModify,
  emloyeeTransactionDelete,
  getEmployees,
} from "../../store/actions/employees";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import DatePicker from "../../Components/DatePicker";
import Picker from "../../Components/Picker";
import { showAlert } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import { getTranslation } from "../../utils/language";
import constants from "../../utils/constants";
import InfoCard from "../../Components/InfoCard";
import { FormatPrice } from "../../utils/helper";

const AddEditTransaction = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    employee_id: null,
    transaction_date: new Date(),
    amount: null,
    narration: null,
    transaction_type: null,
  });
  const [options, showOptions] = useState(false);
  const [amount, setAmount] = useState(0);
  const FormType =
    props.navigation.state.routeName == "EditTransaction" ? "edit" : "add";
  const language = props.language;
  const {
    EXTRA_EARNINGS,
    RETURN_BY_EMPLOYEE,
    CASH_PAYMENT,
    SALARY_EARNED,
  } = constants;
  const [data, setData] = useState([
    {
      id: EXTRA_EARNINGS,
      name: getTranslation("EXTRA_EARNINGS", language),
    },
    {
      id: RETURN_BY_EMPLOYEE,
      name: getTranslation("RETURN_BY_EMPLOYEE", language),
    },
    {
      id: CASH_PAYMENT,
      name: getTranslation("CASH_PAYMENT", language),
    },
  ]);

  useEffect(() => {
    props.employees.map((employee) => {
      if (employee.id == formData.employee_id) {
        setAmount(employee.current_balance);
      }
    });
  }, [formData.employee_id]);

  useEffect(() => {
    props.getEmployees(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
    if (FormType == "edit") {
      const transaction = props.navigation.state.params.transaction;
      setFormData({
        ...transaction,
        transaction_date: new Date(transaction.transaction_date),
        amount:
          transaction.transaction_type == 4 ? transaction.cr : transaction.dr,
      });

      if (transaction.transaction_type == SALARY_EARNED) {
        let tempdata = data;
        tempdata.push({
          id: SALARY_EARNED,
          name: getTranslation("SALARY_EA", language),
        });
        setData(tempdata);
      }
    }
  }, []);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.emloyeeTransactionDelete(formData.id);
      },
      language
    );
  };

  const onSubmit = () => {
    const {
      employee_id,
      amount,
      transaction_type,
      transaction_date,
    } = formData;
    if (
      (employee_id == null ||
        employee_id == "" ||
        amount == null ||
        amount == "",
      transaction_type == null ||
        transaction_date == null ||
        transaction_type == "" ||
        transaction_date == "")
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.employeeTransactionCreate(formData)
        : props.employeeTransactionModify(formData);
      setFormData({
        id: null,
        employee_id: null,
        transaction_date: new Date(),
        amount: null,
        narration: null,
        transaction_type: null,
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
        <React.Fragment>
          <OptionsAction
            status={options}
            close={showOptions}
            title="Delete"
            onSelect={onDelete}
            danger={true}
          />

          <ScrollView
            style={{ flex: 1 }}
            keyboardDismissMode={"on-amountag"}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={styles.infobox}>
              <InfoCard
                title="AMOUNT"
                value={FormatPrice(amount)}
                color={amount <= 0 ? colors.success : colors.danger}
              />
            </View>
            <View style={styles.Form}>
              <DatePicker
                placeholder="DATE"
                required
                date={formData.transaction_date}
                setDate={(text) =>
                  setFormData({ ...formData, transaction_date: text })
                }
              />

              <Picker
                placeholder="EMPLOYEE"
                required
                options={props.employees}
                value={formData.employee_id}
                onChange={(text) =>
                  setFormData({ ...formData, employee_id: text })
                }
                type="employee_name"
              />

              <Picker
                placeholder="TYPE"
                required
                options={data}
                value={formData.transaction_type}
                onChange={(text) =>
                  setFormData({ ...formData, transaction_type: text })
                }
                type="name"
              />

              <TextInput
                value={formData.amount}
                onChange={(text) => setFormData({ ...formData, amount: text })}
                keyboardType={"number-pad"}
                placeholder="AMOUNT"
                required
              />

              <TextInput
                value={formData.narration}
                onChange={(text) =>
                  setFormData({ ...formData, narration: text })
                }
                placeholder="DESCRIPTION"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.Button}>
              <View style={{ flex: 1 }}>
                <Button title={"SAVE"} onClick={onSubmit} icon="save" />
              </View>
            </View>
          </ScrollView>
        </React.Fragment>
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
  infobox: {
    backgroundColor: colors.darkColor,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    zIndex: -11111,
  },
});

const mapStateToProps = ({ common, employee }) => {
  return {
    loading: common.loading,
    employees: employee.employees,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  emloyeeTransactionDelete,
  getEmployees,
  employeeTransactionCreate,
  employeeTransactionModify,
})(AddEditTransaction);

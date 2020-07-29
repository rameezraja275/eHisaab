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
  expenseTransactionCreate,
  expenseTransactionModify,
  expenseTransactionDelete,
  expenseGetCategories,
} from "../../store/actions/expense";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import DatePicker from "../../Components/DatePicker";
import Picker from "../../Components/Picker";
import { showAlert } from "../../utils/helper";
import OptionsAction from "../../Components/Options";

const AddEditExpense = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    expense_id: null,
    expense_date: new Date(),
    dr: null,
    narration: null,
  });
  const [options, showOptions] = useState(false);
  const FormType =
    props.navigation.state.routeName == "EditExpenseTransaction"
      ? "edit"
      : "add";

  useEffect(() => {
    props.expenseGetCategories(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.expense,
        expense_date: new Date(
          props.navigation.state.params.expense.expense_date
        ),
      });
  }, []);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.expenseTransactionDelete(formData.id);
      },
      props.language
    );
  };

  const onSubmit = () => {
    const { expense_id, dr, expense_date } = formData;
    if (
      expense_id == null ||
      expense_id == "" ||
      dr == null ||
      dr == "" ||
      expense_date == null
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.expenseTransactionCreate(formData)
        : props.expenseTransactionModify(formData);
      setFormData({
        id: null,
        expense_name: null,
        expense_date: new Date(),
        dr: null,
        narration: null,
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
            title="DELETE"
            onSelect={onDelete}
            danger={true}
          />

          <ScrollView
            style={{ flex: 1 }}
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={styles.Form}>
              <Picker
                placeholder="CATAGORY"
                required
                options={props.expenseCategories}
                value={formData.expense_id}
                onChange={(text) =>
                  setFormData({ ...formData, expense_id: text })
                }
                type="expense_name"
              />

              <TextInput
                value={formData.dr}
                onChange={(text) => setFormData({ ...formData, dr: text })}
                keyboardType={"number-pad"}
                placeholder="AMOUNT"
                required
              />

              <DatePicker
                placeholder="DATE"
                required
                date={formData.expense_date}
                setDate={(text) =>
                  setFormData({ ...formData, expense_date: text })
                }
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
                {/* {FormType == "edit" && <View style={{marginTop: 10}}>
                          <Button title={"Delete"} onClick={ onDelete } icon="trash" type="danger"/>
                        </View>} */}
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
});

const mapStateToProps = ({ common, expense }) => {
  return {
    loading: common.loading,
    expenseCategories: expense.expensesCategories,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  expenseTransactionDelete,
  expenseGetCategories,
  expenseTransactionCreate,
  expenseTransactionModify,
})(AddEditExpense);

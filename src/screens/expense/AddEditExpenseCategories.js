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
  expenseCategoryCreate,
  expenseCategoriesModify,
} from "../../store/actions/expense";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";

const AddEditExpenseCategory = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    expense_name: null,
  });

  const FormType =
    props.navigation.state.routeName == "EditExpenseCategories"
      ? "edit"
      : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.expenseCategory,
      });
  }, []);

  const onSubmit = () => {
    const { expense_name } = formData;
    if (expense_name == null || expense_name == "") {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.expenseCategoryCreate(formData)
        : props.expenseCategoriesModify(formData);
      setFormData({
        id: null,
        expense_name: null,
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
        <ScrollView
          style={{ flex: 1 }}
          keyboardDismissMode={"on-drag"}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.Form}>
            <TextInput
              value={formData.expense_name}
              onChange={(text) =>
                setFormData({ ...formData, expense_name: text })
              }
              placeholder="EXPENSE_CATEGORY_NAME"
              autoCapitalize="sentences"
              required
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

const mapStateToProps = ({ common, expense }) => {
  return {
    loading: common.loading,
    expenseCategories: expense.expensesCategories,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  expenseCategoryCreate,
  expenseCategoriesModify,
})(AddEditExpenseCategory);

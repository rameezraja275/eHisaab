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
  bankTransactionCreate,
  bankTransactionModify,
  bankTransactionDelete,
  getBank,
} from "../../store/actions/bank";
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
import InfoCard from '../../Components/InfoCard'
import constants from "../../utils/constants";
import { FormatPrice } from '../../utils/helper'

const AddEditBankTransaction = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    bank_id: null,
    transaction_date: new Date(),
    amount: null,
    transaction_type: null,
    narration: null,
  });
  const [options, showOptions] = useState(false);
  const FormType =
    props.navigation.state.routeName == "EditBankTransaction"
      ? "edit"
      : "add";

  const getAmount = (dr, cr, type) => {
    if (type == constants.CASH_TO_BANK || type == constants.DEPOSIT) {
      return dr
    }
    return cr
  }

  const [bankBalance, setBankBalance] = useState(0)

  useEffect(() => {

    props.banks.map((bank) => {
      // console.log(bank)
      if (bank.id == formData.bank_id) {
        setBankBalance(bank.current_balance)
      }
    })

  }, [formData.bank_id])

  useEffect(() => {
    props.getBank(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });

    if (FormType == "edit") {
      const { bankTransaction } = props.navigation.state.params
      setFormData({
        ...bankTransaction,
        amount: getAmount(bankTransaction.dr, bankTransaction.cr, bankTransaction.transaction_type),
        transaction_date: new Date(
          bankTransaction.transaction_date
        ),
      });
    }

    // FormType == "edit" &&
    //   setFormData({
    //     ...bankTransaction,
    //     amount: bankTransaction.transaction_type == constants.WITHDRAW ? bankTransaction.cr : bankTransaction.dr,
    //     transaction_date: new Date(
    //       bankTransaction.transaction_date
    //     ),
    //   });
  }, []);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.bankTransactionDelete(formData.id);
      },
      props.language
    );
  };

  // console.log("dara", formData)

  const onSubmit = () => {
    const { bank_id, amount, transaction_date, transaction_type } = formData;
    if (
      bank_id == null ||
      bank_id == "" ||
      amount == null ||
      amount == "" ||
      transaction_date == null ||
      transaction_type == null
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else {
      FormType == "add"
        ? props.bankTransactionCreate(formData)
        : props.bankTransactionModify(formData);
      setFormData({
        id: null,
        expense_name: null,
        transaction_date: new Date(),
        amount: null,
        narration: null,
        transaction_type: null
      });
    }
  };

  const transaction_types = [
    {
      id: constants.CASH_TO_BANK,
      transaction_type: getTranslation("TRANSFER_CASH_TO_BANK", props.language),
    },
    {
      id: constants.BANK_TO_CASH,
      transaction_type: getTranslation("TRANSFER_BANK_TO_CASH", props.language),
    },
    {
      id: constants.WITHDRAW,
      transaction_type: getTranslation("REDUCE_BANK", props.language),
    },
    {
      id: constants.DEPOSIT,
      transaction_type: getTranslation("INCREASE_BANK", props.language),
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
              keyboardDismissMode={"on-amountag"}
              keyboardShouldPersistTaps={"handled"}
            >
              <View style={styles.infobox}>
                <InfoCard
                  title="BANK_BALANCE"
                  value={FormatPrice(bankBalance)}
                  color={bankBalance >= 0 ? colors.success : colors.danger}
                />
              </View>
              <View style={styles.Form}>
                <Picker
                  placeholder="BANK"
                  required
                  options={props.banks}
                  value={formData.bank_id}
                  onChange={(text) =>
                    setFormData({ ...formData, bank_id: text })
                  }
                  type="bank_name"
                />

                <Picker
                  placeholder="TRANSACTION_TYPE"
                  required
                  options={transaction_types}
                  value={formData.transaction_type}
                  onChange={(text) =>
                    setFormData({ ...formData, transaction_type: text })
                  }
                  type="transaction_type"
                />

                <TextInput
                  value={formData.amount}
                  onChange={(text) => setFormData({ ...formData, amount: text })}
                  keyboardType={"number-pad"}
                  placeholder="AMOUNT"
                  required
                />

                <DatePicker
                  placeholder="DATE"
                  required
                  date={formData.transaction_date}
                  setDate={(text) =>
                    setFormData({ ...formData, transaction_date: text })
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
  infobox: {
    backgroundColor: colors.darkColor,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
});

const mapStateToProps = ({ common, bank }) => {
  return {
    loading: common.loading,
    banks: bank.banks,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  bankTransactionDelete,
  getBank,
  bankTransactionCreate,
  bankTransactionModify,
})(AddEditBankTransaction);

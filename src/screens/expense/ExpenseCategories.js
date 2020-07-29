import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { expenseGetCategories } from "../../store/actions/expense";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";

const ExpenseCategories = (props) => {
  const { expenseGetCategories, categories } = props;
  const [options, showOptions] = useState(false);
  const [state, setState] = useState({
    filteredData: [],
  });

  useEffect(() => {
    expenseGetCategories(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: categories,
    });
  }, [categories]);

  const onSearch = (text) => {
    const filteredData = categories.filter((item) =>
      item.expense_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    expenseGetCategories(0);
  };

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
        <React.Fragment>
          <SearchBar {...props} onChange={onSearch} />
          <OptionsAction
            status={options}
            close={showOptions}
            title="TRANSACTIONS"
            onSelect={() => props.navigation.navigate("ListTransactions")}
          />
          <FlatList
            ListEmptyComponent={<EmptyList message="No Categories" />}
            data={state.filteredData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItemContainer
                onClick={() =>
                  props.navigation.navigate("ViewCategoryTransactions", {
                    expenseCategory: item,
                  })
                }
              >
                <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                  {item.expense_name}
                </Text>
                <View style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {FormatPrice(item.Expense)}
                  </Text>
                </View>
              </ListItemContainer>
            )}
          />

          <FloatingButton
            onClick={() => props.navigation.navigate("AddExpenseCategories")}
            icon="plus"
          />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ expense, common }) => {
  return {
    loading: common.loading,
    categories: expense.expensesCategories,
  };
};

export default connect(mapStateToProps, { expenseGetCategories })(
  ExpenseCategories
);

/*Example to open a screen out of the Navigation Drawer*/
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { getEmployees } from "../../store/actions/employees";
import FloatingButton from "../../Components/FloatingButton";
import Button from "../../Components/Button";
import { FormatPrice, FormatDate } from "../../utils/helper";
import colors from "../../utils/colors";
import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";

const Employees = (props) => {
  const { getEmployees, employees } = props;
  const [options, showOptions] = useState(false);
  const [state, setState] = useState({
    filteredData: [],
  });

  useEffect(() => {
    getEmployees(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  useEffect(() => {
    <Button></Button>;
    setState({
      ...state,
      filteredData: employees,
    });
  }, [employees]);

  const onSearch = (text) => {
    const filteredData = employees.filter((item) =>
      item.employee_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    getEmployees(0);
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
            ListEmptyComponent={<EmptyList message="No Employees." />}
            data={state.filteredData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItemContainer
                onClick={() =>
                  props.navigation.navigate("ViewEmployee", { employee: item })
                }
              >
                <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                  {item.employee_name}
                </Text>
                <View style={{ flex: 0.4 }}>
                  <Text
                    style={{
                      fontFamily: "PrimaryFont",
                      color:
                        item.current_balance > 0
                          ? colors.danger
                          : colors.success,
                    }}
                  >
                    {FormatPrice(item.current_balance)}
                  </Text>
                </View>
              </ListItemContainer>
            )}
          />

          <FloatingButton
            onClick={() => props.navigation.navigate("AddEmployee")}
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

const mapStateToProps = ({ employee, common }) => {
  return {
    loading: common.loading,
    employees: employee.employees,
  };
};

export default connect(mapStateToProps, { getEmployees })(Employees);

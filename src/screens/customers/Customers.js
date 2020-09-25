import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Overlay from "../../Components/Overlay";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { customerGet } from "../../store/actions/customer";
import Filters from "./Filters";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";
import colors from "../../utils/colors";
import FloatingInfoCard from "../../Components/FloatingInfoCard";

const Customer = (props) => {
  const { customerGet, customers } = props;
  // const [options, showOptions] = useState(false);

  const [state, setState] = useState({
    data: null,
    filteredData: [],
    showOverlay: false,
    filterType: null,
  });

  useEffect(() => {
    // customerGet(0);
    // props.navigation.setParams({
    //   showOptions: showOptions,
    // });
  }, []);

  useEffect(() => {
    let data = customers;
    if (state.filterType == "receivable") {
      data = customers.filter((item) => item.current_balance > 0);
      setState({ ...state, filteredData: data });
    } else if (state.filterType == "payable") {
      data = customers.filter((item) => item.current_balance < 0);
      setState({ ...state, filteredData: data });
    } else {
      setState({ ...state, filteredData: data });
    }
  }, [state.filterType]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setState({
      ...state,
      filteredData: customers,
    });
  }, [customers]);

  useEffect(() => {
    let temptotal = 0;
    state.filteredData.map((customer) => {
      temptotal = Number(customer.current_balance) + temptotal;
    });
    setTotal(temptotal);
  }, [state.filteredData]);

  const onSearch = (text) => {
    const filteredData = customers.filter((item) =>
      item.customer_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    customerGet(0);
  };

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
          <React.Fragment>
            <SearchBar
              {...props}
              onChange={onSearch}
              toggleFilter={() => setState({ ...state, showOverlay: true })}
            />
            {/* 
          <OptionsAction
            status={options}
            close={showOptions}
            title="RECEIPTS"
            onSelect={() => props.navigation.navigate("ReceiptCustomer")}
          /> */}

            {state.showOverlay && (
              <Overlay
                toggleFilter={() => setState({ ...state, showOverlay: false })}
                title="FILTERS"
              >
                <Filters
                  onPress={(text) => {
                    setState({ ...state, showOverlay: false, filterType: text });
                  }}
                  filterType={state.filterType}
                />
              </Overlay>
            )}

            <FlatList
              ListEmptyComponent={<EmptyList message="No Customers." />}
              data={state.filteredData}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={reload} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const color =
                  item.current_balance >= 0 ? colors.success : colors.danger;
                return (
                  <ListItemContainer
                    onClick={() =>
                      props.navigation.navigate("ViewCustomer", {
                        customer: item,
                        id: item.id,
                        color: color,
                      })
                    }
                  >
                    <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                      {item.customer_name}
                    </Text>
                    <View style={{ flex: 0.4 }}>
                      <Text style={{ color: color, fontFamily: "PrimaryFont" }}>
                        {FormatPrice(item.current_balance)}
                      </Text>
                    </View>
                  </ListItemContainer>
                );
              }}
            />
            <FloatingInfoCard
              title="TOTAL"
              value={total}
              color={
                total == 0
                  ? colors.darkColor
                  : total > 0
                    ? colors.success
                    : colors.danger
              }
            />
            <FloatingButton
              onClick={() => props.navigation.navigate("AddCustomer")}
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

const mapStateToProps = ({ customer, common }) => {
  return {
    loading: common.loading,
    customers: customer.customers,
  };
};

export default connect(mapStateToProps, { customerGet })(Customer);

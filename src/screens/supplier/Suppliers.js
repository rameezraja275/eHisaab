import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Overlay from "../../Components/Overlay";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { supplierGet } from "../../store/actions/supplier";
import Filters from "./Filters";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice } from "../../utils/helper";
import colors from "../../utils/colors";
// import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";
import FloatingInfoCard from "../../Components/FloatingInfoCard";

const Suppliers = (props) => {
  const { supplierGet, suppliers } = props;

  const [state, setState] = useState({
    data: null,
    filteredData: [],
    showOverlay: false,
    filterType: null,
  });

  // const [options, showOptions] = useState(false);

  useEffect(() => {
    supplierGet(0);
    // props.navigation.setParams({
    //   showOptions: showOptions,
    // });
  }, []);

  useEffect(() => {
    let data = suppliers;
    if (state.filterType == "receivable") {
      data = suppliers.filter((item) => item.current_balance < 0);
      setState({ ...state, filteredData: data });
    } else if (state.filterType == "payable") {
      data = suppliers.filter((item) => item.current_balance > 0);
      setState({ ...state, filteredData: data });
    } else {
      setState({ ...state, filteredData: data });
    }
  }, [state.filterType]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setState({
      ...state,
      filteredData: suppliers,
    });
  }, [suppliers]);

  useEffect(() => {
    let temptotal = 0;
    state.filteredData.map((supplier) => {
      temptotal = Number(supplier.current_balance) + temptotal;
    });
    setTotal(temptotal);
  }, [state.filteredData]);

  const onSearch = (text) => {
    const filteredData = suppliers.filter((item) =>
      item.supplier_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    supplierGet(0);
  };

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <View style={styles.center}>
          <Loader size={10} />
        </View>
      ) : (
          <React.Fragment>
            <SearchBar
              {...props}
              onChange={onSearch}
              toggleFilter={() => setState({ ...state, showOverlay: true })}
            />

            {/* <OptionsAction
            status={options}
            close={showOptions}
            title="PAYMENTS"
            onSelect={() => props.navigation.navigate("PaymentSupplier")}
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
              ListEmptyComponent={<EmptyList message="Nothing to Show." />}
              data={state.filteredData}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={reload} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const color =
                  item.current_balance <= 0 ? colors.success : colors.danger;
                return (
                  <ListItemContainer
                    onClick={() =>
                      props.navigation.navigate("ViewSupplier", {
                        color: color,
                        supplier: item,
                        id: item.id,
                      })
                    }
                  >

                    <View style={{ flex: 0.7 }}>
                      <Text style={{ fontFamily: "PrimaryFont", fontSize: 17 }}>
                        {item.supplier_name}
                      </Text>
                      <Text style={{ fontFamily: "PrimaryFont" }}>
                        {item.supplier_address}
                      </Text>
                      <Text style={{ fontFamily: "PrimaryFont" }}>
                        {item.supplier_phone}
                      </Text>
                    </View>


                    <View style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
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
                  : total < 0
                    ? colors.success
                    : colors.danger
              }
            />
            <FloatingButton
              onClick={() => props.navigation.navigate("AddSupplier")}
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ supplier, common }) => {
  return {
    loading: common.loading,
    suppliers: supplier.suppliers,
  };
};

export default connect(mapStateToProps, { supplierGet })(Suppliers);

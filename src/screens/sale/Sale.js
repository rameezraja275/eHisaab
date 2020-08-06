import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { addItemToSale, resetCart } from "../../store/actions/sale";
import { removeNotifications } from "../../store/actions/common";
import { removeNewUserStatus } from "../../store/actions/user";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../../Components/SearchBar";
import FloatingButton from "../../Components/FloatingButton";
import Loader from "../../Components/Loader";
import { productGet, getNonInventoryItems } from "../../store/actions/product";
import colors from "../../utils/colors";
import OptionsAction from "../../Components/Options";
import { FormatPrice } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Notifications from "../../Components/Notifications";
import Overlay from "../../Components/Overlay";
import constants from "../../utils/constants";
import { newUserMessages } from "../../utils/newUserMessage";
import RadioButtons from "../../Components/RadioButtons";

const Sale = (props) => {
  const {
    productGet,
    productsData,
    resetCart,
    notifications,
    removeNotifications,
    newUser,
    removeNewUserStatus,
    nonInventoryItems,
    getNonInventoryItems,
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  let products;
  products = productsData;
  if (selectedIndex == 1) {
    products = nonInventoryItems;
  }
  // useEffect(() => {
  //   console.log("id", selectedIndex);

  //   console.log("non", nonInventoryItems);
  //   console.log(selectedIndex);
  // }, [selectedIndex]);

  // console.log("pro", productsData);

  // console.log("non", nonInventoryItems);

  console.log("cart", props.cart);
  const [options, showOptions] = useState(false);

  const [state, setState] = useState({
    filteredData: [],
    showOverlay: false,
  });

  useEffect(() => {
    // productGet(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: products,
    });
  }, [products]);

  const onSearch = (text) => {
    const filteredData = products.filter((item) =>
      item.product_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    productGet(0);
    getNonInventoryItems();
    resetCart();
  };

  let backhandler;
  useEffect(() => {
    backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      function () {
        return true;
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      backhandler.remove();
    };
  }, []);

  useEffect(() => {
    notifications.length > 0
      ? setState({ filteredData: products, showOverlay: true })
      : setState({ filteredData: products, showOverlay: false });
  }, [notifications]);

  const { totalItem, totalPrice } = props.cartStatus;

  const closeNotifications = () => {
    setState({ ...state, showOverlay: false });
    removeNotifications();
  };

  console.log("data", props.cart);

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
        <React.Fragment>
          <SearchBar
            onChange={onSearch}
            {...props}
            toggleFilter={() =>
              props.navigation.navigate("AddNonInventoryItem")
            }
            icon="plus"
          />

          <OptionsAction
            status={options}
            close={showOptions}
            title="TRANSACTIONS"
            onSelect={() => props.navigation.navigate("ListTransactions")}
          />

          {state.showOverlay && (
            <Overlay
              toggleFilter={() => setState({ ...state, showOverlay: false })}
              title="NOTIFICATION"
              backDropClose={false}
            >
              <Notifications
                notifications={notifications}
                onClose={closeNotifications}
              />
            </Overlay>
          )}

          {newUser && (
            <Overlay
              toggleFilter={removeNewUserStatus}
              title="Get Started :)"
              backDropClose={false}
            >
              <Notifications
                notifications={newUserMessages}
                onClose={removeNewUserStatus}
              />
            </Overlay>
          )}

          <RadioButtons
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />

          <FlatList
            ListEmptyComponent={<EmptyList message="No Products." />}
            data={state.filteredData}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  props.addItemToSale(item, selectedIndex == 1 ? true : false);
                }}
              >
                <View style={styles.ListItem}>
                  <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                    {item.product_name}
                  </Text>
                  <View style={{ flex: 0.4 }}>
                    <Text
                      style={{ fontFamily: "PrimaryFont" }}
                    >{`${getTranslation(
                      "PRICE",
                      props.language
                    )} : ${FormatPrice(item.product_sale_price)}`}</Text>
                    {item.current_stock &&
                      item.is_service == constants.PRODUCT && (
                        <Text style={{ fontFamily: "PrimaryFont" }}>
                          {`${getTranslation("STOCK", props.language)} : ${
                            item.current_stock
                          }`}{" "}
                        </Text>
                      )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {totalItem > 0 && (
            <FloatingButton
              onClick={() => props.navigation.navigate("Details")}
              title={`TOTAL_ITEM`}
              value={`${totalItem} = ${FormatPrice(totalPrice)}`}
            />
          )}
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.lightColor,
  },
  ListItem: {
    borderWidth: 0.2,
    borderColor: colors.borderColor,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    flex: 1,
    padding: 15,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({
  nonInventoryItems,
  product,
  common,
  sale,
  user,
}) => {
  return {
    loading: common.loading,
    productsData: product.products,
    cartStatus: sale.cartStatus,
    cart: sale.saleCart,
    language: common.language,
    notifications: user.notifications,
    newUser: user.newUser,
    nonInventoryItems: nonInventoryItems.nonInventoryItems,
  };
};

export default connect(mapStateToProps, {
  productGet,
  addItemToSale,
  resetCart,
  removeNotifications,
  removeNewUserStatus,
  getNonInventoryItems,
})(Sale);

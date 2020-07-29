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
import { productGet } from "../../store/actions/product";
import colors from "../../utils/colors";
import OptionsAction from "../../Components/Options";
import { FormatPrice } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Notifications from "../../Components/Notifications";
import Overlay from "../../Components/Overlay";
import constants from "../../utils/constants";
import { newUserMessages } from "../../utils/newUserMessage";

const Sale = (props) => {
  const {
    productGet,
    products,
    resetCart,
    notifications,
    removeNotifications,
    newUser,
    removeNewUserStatus,
  } = props;
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

          <FlatList
            ListEmptyComponent={<EmptyList message="No Products." />}
            data={state.filteredData}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  props.addItemToSale(item);
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
                    {item.is_service == constants.PRODUCT && (
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

const mapStateToProps = ({ product, common, sale, user }) => {
  return {
    loading: common.loading,
    products: product.products,
    cartStatus: sale.cartStatus,
    language: common.language,
    notifications: user.notifications,
    newUser: user.newUser,
  };
};

export default connect(mapStateToProps, {
  productGet,
  addItemToSale,
  resetCart,
  removeNotifications,
  removeNewUserStatus,
})(Sale);

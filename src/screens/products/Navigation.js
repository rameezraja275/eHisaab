import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import HeaderOptions from "../../Components/HeaderOptions";
import Products from "./Products";
import AddEditForm from "./AddEditProduct";
import colors from "../../utils/colors";
import ViewProduct from "./View";
import HeaderTitle from "../../Components/HeaderTitle";

const Prodcuts_StackNavigator = createStackNavigator({
  List: {
    screen: Products,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PRODUCTS_SERVICES" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ViewProduct: {
    screen: ViewProduct,
    navigationOptions: (props) => {
      return {
        title: (
          <Text style={{ fontFamily: "PrimaryFont" }}>
            {props.navigation.state.params.product.product_name}{" "}
          </Text>
        ),
        headerStatusBarHeight: 0,
        headerRight: () => <HeaderOptions navigationProps={props.navigation} />,
        headerStyle: {
          backgroundColor: colors.darkColor,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          width: 250,
        },
      };
    },
  },
  AddProduct: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_Product_Service" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EditProduct: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_PRODUCT_SERVICE" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
});

export default Prodcuts_StackNavigator;

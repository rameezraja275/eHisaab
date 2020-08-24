import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
// import Customers from "./Customers";
// import AddEditForm from "./AddEditCustomer";
import colors from "../../utils/colors";
// import ViewCustomer from "../../screens/customers/View";
import HeaderOptions from "../../Components/HeaderOptions";
import CustomerReceipt from "./Receipt";
import AddEditReceipt from "./AddEditRecepit";
import PDFScreen from "./ReceiptPDF";
import Icon from "react-native-vector-icons/AntDesign";
import HeaderTitle from "../../Components/HeaderTitle";

const Receipt_StackNavigator = createStackNavigator({
    ReceiptCustomer: {
        screen: CustomerReceipt,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="RECEIPTS" />,
            headerLeft: () => <HamBurger navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: colors.darkColor,
            },

            headerTintColor: colors.white,
        }),
    },

    AddReceipt: {
        screen: AddEditReceipt,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="ADD_RECEIPT" />,
            headerStyle: {
                backgroundColor: colors.darkColor,
            },

            headerTintColor: colors.white,
        }),
    },
    EditReceipt: {
        screen: AddEditReceipt,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="UPDATE_RECEIPT" />,
            headerRight: () => <HeaderOptions navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: colors.darkColor,
            },

            headerTintColor: colors.white,
        }),
    },

    receiptPDF: {
        screen: PDFScreen,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="RECEIPT" />,

            headerLeft: () => (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.state.params.navigate();
                        }}
                    >
                        <Icon
                            style={{ margin: 15, color: colors.white }}
                            name="arrowleft"
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                backgroundColor: colors.darkColor,
            },
            headerTintColor: colors.white,
        }),
    },
});

export default Receipt_StackNavigator;

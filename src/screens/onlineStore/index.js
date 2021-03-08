import React from 'react';
import { View } from 'react-native'
import { connect } from "react-redux";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from 'react-native-elements';
import colors from '../../utils/colors'
import { getTranslation } from "../../utils/language";
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyOnlineStore = ({ language, navigation }) => {

    return (
        <View style={{ padding: 20, display: "flex", flex: 1, justifyContent: "flex-end" }} >
            <Text h1>{getTranslation("MAKEBUSSINESSONLINE", language)}</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                <Material name="store" size={100} style={{ color: colors.darkColor }} />
                <TouchableOpacity onPress={() => navigation.navigate("Bussiness")} >
                    <Text h4>{getTranslation("ACTIVATE_STORE", language)} </Text>
                    <Text h4 style={{ color: colors.darkColor }} >{getTranslation("NOW", language)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = ({
    common,
}) => {
    return {
        language: common.language,
    };
};

export default connect(mapStateToProps, null)(MyOnlineStore);
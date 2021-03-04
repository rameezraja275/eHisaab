import React from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { getTranslation } from "../../utils/language";
import constants from "../../utils/constants";

const Filters = (props) => {
    const { language } = props;
    return (
        <View style={{ width: 250 }}>
            <CheckBox
                title={getTranslation("PENDING", language)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={props.filterType == constants.PENDDING ? true : false}
                onPress={() => props.onPress(constants.PENDDING)}
            />
            <CheckBox
                title={getTranslation("ACCEPTED", language)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={props.filterType == constants.ACCEPT ? true : false}
                onPress={() => props.onPress(constants.ACCEPT)}
            />
            <CheckBox
                title={getTranslation("DISPATCH", language)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={props.filterType == constants.DISPATCH ? true : false}
                onPress={() => props.onPress(constants.DISPATCH)}
            />
            <CheckBox
                title={getTranslation("COMPLETE", language)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={props.filterType == constants.COMPLETED ? true : false}
                onPress={() => props.onPress(constants.COMPLETED)}
            />
        </View>
    );
};

const mapStateToProps = ({ common }) => {
    return {
        language: common.language,
    };
};

export default connect(mapStateToProps, {})(Filters);

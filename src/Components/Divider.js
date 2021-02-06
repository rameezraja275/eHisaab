import React from "react";
import { View, Text } from 'react-native'
import colors from '../utils/colors'

const Divider = ({ text }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.borderColor }} />
            <View>
                <Text style={{ width: 150, textAlign: 'center', color: colors.lightGrey }}>{text}</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.borderColor }} />
        </View>
    );
};

export default Divider;
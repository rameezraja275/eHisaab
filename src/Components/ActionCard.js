import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import colors from "../utils/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconE from "react-native-vector-icons/Entypo";
import IconM from "react-native-vector-icons/MaterialIcons";

import { sms, call } from "../utils/helper";

const Card = (props) => {
  return props.phoneNumber || props.toggleFilter || props.orderAccept || props.orderReject ? (
    <View
      style={{
        paddingTop: 15,
        paddingHorizontal: 15,
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {props.toggleFilter && (
          <TouchableOpacity
            style={{
              marginRight: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={props.toggleFilter}
          >
            {props.date ? (
              <Text style={{ color: "white", fontFamily: "PrimaryFont" }}>
                {props.date}
              </Text>
            ) : (
                <View></View>
              )}
            <Icon
              style={{ margin: 10, color: colors.white }}
              name="filter"
              size={20}
            />
          </TouchableOpacity>
        )}

        <View style={{ flexDirection: "row" }}>
          {props.openAdjustAmount && <TouchableOpacity
            style={{
              marginRight: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={props.openAdjustAmount}
          >
            <Icon
              style={{ margin: 10, color: colors.white }}
              name="credit-card"
              size={20}
            />
          </TouchableOpacity>}
          {props.phoneNumber ? (<>
            <TouchableOpacity
              onPress={() => call(props.phoneNumber)}
              style={{ marginRight: 10 }}
            >
              <Icon
                style={{ margin: 10, color: colors.white }}
                name="phone"
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => sms(props.phoneNumber, props.messageText)}
            >
              <Icon
                style={{ margin: 10, color: colors.white }}
                name="envelope"
                size={20}
              />
            </TouchableOpacity></>
          ) : (
              <View></View>
            )}
        </View>

        {props.pdfexport && <TouchableOpacity
          onPress={() => props.navigation.navigate(props.pdfInfo.screen, { ...props.pdfInfo })}
        >
          <IconFA
            style={{ margin: 10, color: colors.white }}
            name="file-export"
            size={20}
          />
        </TouchableOpacity>}

        <View style={{ flexDirection: 'row' }} >
          {props.orderAccept != undefined && <TouchableOpacity
            onPress={props.orderAccept}
          >
            <IconM
              style={{ marginVertical: 10, marginHorizontal: 20, color: colors.success }}
              name="done"
              size={20}
            />
          </TouchableOpacity>}

          {props.orderReject != undefined && <TouchableOpacity
            onPress={props.orderReject}
          >
            <IconE
              style={{ marginVertical: 10, marginHorizontal: 20, color: colors.danger }}
              name="cross"
              size={20}
            />
          </TouchableOpacity>}
        </View>



      </View>
    </View>
  ) : (
      <View></View>
    );


};

export default Card;

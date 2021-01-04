import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';

import { sms, call } from '../utils/helper';

const Card = ({
  phoneNumber, toggleFilter, orderAccept,
  orderReject, date, openAdjustAmount, messageText, pdfexport, navigation, pdfInfo,
}) => (phoneNumber || toggleFilter || orderAccept || orderReject ? (
  <View
    style={{
      paddingTop: 15,
      paddingHorizontal: 15,
      justifyContent: 'flex-end',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >

      {toggleFilter && (
        <TouchableOpacity
          style={{
            marginRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={toggleFilter}
        >
          {date ? (
            <Text style={{ color: 'white', fontFamily: 'PrimaryFont' }}>
              {date}
            </Text>
          ) : (
              <View />
            )}
          <Icon
            style={{ margin: 10, color: colors.white }}
            name="filter"
            size={20}
          />
        </TouchableOpacity>
      )}

      <View style={{ flexDirection: 'row' }}>
        {openAdjustAmount && (
          <TouchableOpacity
            style={{
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={openAdjustAmount}
          >
            <Icon
              style={{ margin: 10, color: colors.white }}
              name="credit-card"
              size={20}
            />
          </TouchableOpacity>
        )}
        {phoneNumber ? (
          <>
            <TouchableOpacity
              onPress={() => call(phoneNumber)}
              style={{ marginRight: 10 }}
            >
              <Icon
                style={{ margin: 10, color: colors.white }}
                name="phone"
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => sms(phoneNumber, messageText)}
            >
              <Icon
                style={{ margin: 10, color: colors.white }}
                name="envelope"
                size={20}
              />
            </TouchableOpacity>
          </>
        ) : (
            <View />
          )}
      </View>

      {pdfexport && (
        <TouchableOpacity
          onPress={() => navigation.navigate(pdfInfo.screen, { ...pdfInfo })}
        >
          <IconFA
            style={{ margin: 10, color: colors.white }}
            name="file-export"
            size={20}
          />
        </TouchableOpacity>
      )}

      {orderAccept !== undefined && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={orderAccept}
          >
            <IconM
              style={{ marginVertical: 10, marginHorizontal: 20, color: colors.success }}
              name="done"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={orderReject}
          >
            <IconE
              style={{ marginVertical: 10, marginHorizontal: 20, color: colors.danger }}
              name="cross"
              size={20}
            />
          </TouchableOpacity>
        </View>
      )}

    </View>
  </View>
) : (
    <View />
  ));

export default Card;

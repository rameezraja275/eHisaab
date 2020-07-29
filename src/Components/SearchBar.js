import React from "react";
import { View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const SearchBar = ({ value, onChange, toggleFilter, icon, language }) => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.SearchBar}>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <Icon name="search1" size={13} color={colors.grey} />
        </View>

        <TextInput
          placeholder={getTranslation("SEARCH", language)}
          value={value}
          onChangeText={onChange}
          autoCorrect={false}
          style={{ flex: 1 }}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.white,
        }}
      >
        {toggleFilter && (
          <Icon
            name={icon ? icon : "filter"}
            size={25}
            color={colors.darkColor}
            onPress={toggleFilter}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "row",
    alignContent: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
  },
  SearchBar: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: colors.white,
    flex: 0.8,
  },
});

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(SearchBar);

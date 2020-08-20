import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

import { ShowFlash } from "../../src/utils/helper";

const ImageLoader = (props) => {
  const { image, onChangeImage, placeholder, language } = props;

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      ShowFlash(getTranslation("NO_PERMISSION", language), "danger");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 4],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        let imageLength =
          result && (Math.ceil(result.base64.length / 4) * 3 - 2) / 1000;

        if (Number(imageLength) < 1024) {
          onChangeImage(result);
        } else {
          ShowFlash(getTranslation("FILE_TOO_LARGE", language), "danger");
        }
      } else {
        ShowFlash(getTranslation("SERVER_ERROR", language), "danger");
      }
    }
  };

  const styles = StyleSheet.create({
    pickerWrapper: {
      borderColor: image ? colors.darkColor : colors.grey,
      borderWidth: image ? 1 : 0.5,
      borderRadius: 5,
      marginVertical: 10,
    },
    labelStyle: {
      position: "relative",
      left: 0,
      top: !image ? 14 : -8,
      fontSize: !image ? 14 : 10,
      color: !image ? colors.lightGrey : colors.darkColor,
      paddingLeft: image ? 5 : 10,
      paddingRight: image ? 5 : 0,
      marginLeft: image ? 10 : 0,
      marginRight: image ? 10 : 0,
      backgroundColor: colors.lightColor,
      alignSelf: "flex-start",
      fontFamily: "PrimaryFont",
    },
    image: {
      padding: 10,
      flex: 1,
      alignItems: "center",
    },
  });

  return (
    <View style={styles.pickerWrapper}>
      <TouchableOpacity onPress={pickImage} style={{ height: image ? 0 : 48 }}>
        <Text style={styles.labelStyle}>
          {getTranslation(placeholder, language)}
        </Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.image}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: "data:image/png;base64," + image }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(ImageLoader);

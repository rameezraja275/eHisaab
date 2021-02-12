import React, { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import colors from "../utils/colors";
import route from '../store/api'
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";
import { ShowFlash, valididateBase64 } from "../../src/utils/helper";
import Overlay from "./Overlay";
import { Divider } from "react-native-elements";

const ImageLoader = (props) => {
  const { image, onChangeImage, placeholder, language } = props;

  const [showOverlay, setOverlay] = useState(false)

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
        quality: 0.3
      });
      if (!result.cancelled) {
        let imageLength =
          result && (Math.ceil(result.base64.length / 4) * 3 - 2) / 1000;
        if (Number(imageLength) < 1024) {
          onChangeImage(result);
        } else {
          ShowFlash(getTranslation("FILE_TOO_LARGE", language), "danger");
        }
      }
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      ShowFlash(getTranslation("NO_PERMISSION", language), "danger");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 4],
        base64: true,
        quality: 0.3
      });
      if (!result.cancelled) {
        let imageLength =
          result && (Math.ceil(result.base64.length / 4) * 3 - 2) / 1000;
        if (Number(imageLength) < 1024) {
          onChangeImage(result);
        } else {
          ShowFlash(getTranslation("FILE_TOO_LARGE", language), "danger");
        }
      }
    }
  }

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
    popUpSelectorText: {
      padding: 10,
      borderColor: colors.borderColor,
      borderEndWidth: 1,
      fontSize: 20
    }
  });

  const imageURL = route.IMAGE_URL + image
  const imageBase64 = "data:image/png;base64," + image;

  return (
    <View style={styles.pickerWrapper}>
      <TouchableOpacity onPress={() => setOverlay(!showOverlay)} style={{ height: image ? 0 : 48 }}>
        <Text style={styles.labelStyle}>
          {getTranslation(placeholder, language)}
        </Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.image}>
          <TouchableOpacity onPress={() => setOverlay(!showOverlay)}>
            <Image
              source={{ uri: valididateBase64(image) ? imageBase64 : imageURL }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        </View>
      )}

      {showOverlay && (
        <Overlay
          toggleFilter={() => setOverlay(!showOverlay)}
          title="SELECT"
          backDropClose={false}
        >
          <View style={{ display: "flex" }} >
            <TouchableOpacity onPress={() => { openCamera(); setOverlay(!showOverlay) }} >
              <Text style={styles.popUpSelectorText}>
                {getTranslation("OPEN_CAMERA", language)}
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={() => { pickImage(); setOverlay(!showOverlay) }} >
              <Text style={styles.popUpSelectorText}>
                {getTranslation("OPEN_IMAGE_PICKER", language)}
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>
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

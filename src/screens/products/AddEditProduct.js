import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { productCreate, productModify } from "../../store/actions/product";
import Button from "../../Components/Button";
import { CheckBox } from 'react-native-elements';
import TextInput from "../../Components/TextInput";
import { ShowFlash } from "../../utils/helper";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import constants from "../../utils/constants";
import { getTranslation } from "../../utils/language";
import Picker from "../../Components/Picker";
import Icon from "react-native-vector-icons/AntDesign";
import BarCodeScanner from "../../Components/BarCodeReader";
import Overlay from "../../Components/Overlay";
import { TouchableOpacity } from "react-native";
import ImagerPicker from "../../Components/ImagePicker";

const AddEditProduct = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    product_name: null,
    product_sale_price: null,
    product_cost_price: null,
    opening_stock: null,
    is_service: null,
    product_code: null,
    narration: null,
    is_instore: false,
    product_image: null
  });

  const [barcode, showBarCode] = useState(false)

  const FormType =
    props.navigation.state.routeName == "EditProduct" ? "edit" : "add";

  useEffect(() => {
    FormType == "edit" &&
      setFormData({
        ...props.navigation.state.params.product,
      });
  }, []);

  const onSubmit = () => {
    let {
      product_name,
      product_sale_price,
      product_cost_price,
      is_service,
      is_instore,
      product_code,
      narration
    } = formData;

    product_sale_price = Number(product_sale_price);
    product_cost_price = Number(product_cost_price);
    if (
      product_cost_price == null ||
      product_sale_price == null ||
      product_name == null ||
      product_cost_price == "" ||
      product_sale_price == "" ||
      product_name == "" ||
      is_service == null
    ) {
      ShowFlash("ENTER_REQUIRED_FIELDS", "danger", props.language);
    } else if (product_sale_price < product_cost_price) {
      ShowFlash("SALE_PRICE_SHOULD_BE_GREATER", "danger", props.language);
    } else {
      FormType == "add"
        ? props.productCreate(formData)
        : props.productModify(formData);
      setFormData({
        id: null,
        product_name: null,
        product_sale_price: null,
        product_cost_price: null,
        opening_stock: null,
        is_service: null,
        product_code: null,
        is_instore: false,
        narration: null,
        product_image: null
      });
    }
  };

  const type = [
    {
      id: constants.PRODUCT,
      is_service: getTranslation("PRODUCT", props.language),
    },
    {
      id: constants.SERVICE,
      is_service: getTranslation("SERVICE", props.language),
    },
  ];
  const [scanned, setScanned] = useState(false)
  return (
    <KeyboardAvoidingView
      style={styles.MainContainer}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
          <ScrollView
            style={{ flex: 1 }}
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={styles.Form}>
              <TextInput
                value={formData.product_name}
                onChange={(text) =>
                  setFormData({ ...formData, product_name: text })
                }
                placeholder="NAME"
                required
                autoCapitalize="sentences"
              />
              <Picker
                placeholder="TYPE"
                options={type}
                value={formData.is_service}
                type="is_service"
                required
                onChange={(text) =>
                  setFormData({ ...formData, is_service: text })
                }
              />


              <TextInput
                value={formData.product_cost_price}
                onChange={(text) =>
                  setFormData({ ...formData, product_cost_price: text })
                }
                keyboardType={"number-pad"}
                placeholder="PURCHAE_PRICE"
                required
              />

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                <View style={{ flex: 1 }}>
                  <TextInput
                    value={formData.product_sale_price}
                    onChange={(text) =>
                      setFormData({ ...formData, product_sale_price: text })
                    }
                    keyboardType={"number-pad"}
                    placeholder="SALE_PRICE"
                    required
                  />
                </View>


                <CheckBox
                  title={getTranslation("DISPLAY_IN_STORE", props.language)}
                  checked={formData.is_instore == "0" ? false : true}
                  checkedColor={colors.darkColor}
                  iconRight
                  onPress={() => setFormData({ ...formData, is_instore: formData.is_instore === "0" ? "1" : "0" })}
                />
              </View>


              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 0.9 }}>
                  <TextInput
                    value={formData.product_code}
                    onChange={(text) =>
                      setFormData({ ...formData, product_code: text })
                    }
                    keyboardType={"number-pad"}
                    placeholder="BAR_CODE"
                  />
                </View>
                <TouchableOpacity onPress={() => { showBarCode(true) }}  >
                  <Icon
                    name={"scan1"}
                    size={30}
                  // color={colors.darkColor}

                  />
                </TouchableOpacity>

              </View>
              {barcode && <Overlay
                toggleFilter={() => { scanned ? undefined : showBarCode(!barcode) }}
                title="BARCODE_READER">
                <BarCodeScanner scanned={scanned} setScanned={setScanned} onScan={(text) => { setFormData({ ...formData, product_code: text }) }} size="sm" />
              </Overlay>}

              {formData.is_service == constants.PRODUCT && (
                <TextInput
                  keyboardType={"number-pad"}
                  placeholder="OPENING_STOCK"
                  value={formData.opening_stock}
                  disabled={FormType == "edit" ? true : false}
                  onChange={(text) =>
                    setFormData({ ...formData, opening_stock: text })
                  }
                />
              )}

              {formData.is_instore == "1" && <TextInput
                value={formData.narration}
                onChange={(text) => setFormData({ ...formData, narration: text })}
                placeholder="DESCRIPTION"
                autoCapitalize="sentences"
                maxLength={150}
              />}


              {formData.is_instore == "1" && <ImagerPicker
                onChangeImage={(image) =>
                  setFormData({ ...formData, product_image: image.base64 })
                }
                placeholder="IMAGE"
                image={formData.product_image}
              />}
            </View>
            <View style={styles.Button}>
              <View style={{ flex: 1 }}>
                <Button title={"SAVE"} onClick={onSubmit} icon="save" />
              </View>
            </View>
          </ScrollView>
        )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.lightColor,
  },
  Form: {
    margin: 15,
  },
  Button: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  margintop: {
    marginTop: 15,
    fontSize: 15,
  },
});

const mapStateToProps = ({ common }) => {
  return {
    loading: common.loading,
    language: common.language,
  };
};

export default connect(mapStateToProps, { productCreate, productModify })(
  AddEditProduct
);

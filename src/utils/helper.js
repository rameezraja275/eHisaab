import { showMessage } from "react-native-flash-message";
import { Alert, Share } from "react-native";
import { getTranslation } from "../utils/language";
import { Platform, Linking } from "react-native";
import constants from "../utils/constants";

export const ShowFlash = (messageBody, type, language = constants.ENGLISH) => {
  showMessage({
    hideOnPress: false,
    autoHide: true,
    position: "top",
    message: getTranslation(messageBody, language),
    icon: "auto",
    type: type,
    floating: false,
    duration: 2000,
  });
};

export const showAlert = (message, cb, language, confrimButtonText = "OK") => {
  Alert.alert(
    getTranslation("CONFIRM", language),
    getTranslation(message, language),
    [
      {
        text: getTranslation("CANCEL", language),
        style: "cancel",
      },
      { text: getTranslation(confrimButtonText, language), onPress: cb },
    ],
    { cancelable: false }
  );
};

export const CountryList = [
  {
    value: "Pakistan",
    id: "Pakistan",
  },
];

export const FormatPrice = (number) => {
  const num = Math.abs(number);
  if (num) {
    let numb = num;
    if (num % 1 != 0) {
      numb = Number(num).toFixed(1);
    }
    const numOut =
      numb.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " Rs";
    return numOut;
  }
  return num + " Rs";
};

export const FormatNumber = (number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const createUniqueID = () => {
  var dt = new Date();
  var ID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return ID;
};

export const FormatDate = (date, splitOn = " ") => {
  let DateObj = new Date(date.split(splitOn)[0]);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatedDate = `${DateObj.getDate()}-${months[DateObj.getMonth()]
    }-${DateObj.getFullYear().toString().substr(-2)}`;

  return formatedDate;
};

export const validatePassword = (password, cpassword, language) => {
  if (password != cpassword) {
    ShowFlash("PASSWORD_CPASSWORD_SAME", "danger", language);
  } else if (!/^(?=.*\d)(?=.*[A-Za-z]).{6,20}$/.test(password)) {
    ShowFlash("ENTER_SECURE_PASSWORD", "danger", language);
  } else {
    return true;
  }
  return false;
};

export const employeeTransactionType = (typeCode, language = "0") => {
  const transactions = {
    1: getTranslation("SALARY_EA", language),
    2: getTranslation("EXTRA_EARNINGS", language),
    3: getTranslation("RETURN_BY_EMPLOYEE", language),
    4: getTranslation("CASH_PAYMENT", language),
  };

  return transactions[typeCode];
};

export const whatsapp = (phone) => {
  let url = "whatsapp://send?phone=" + phone;
  Linking.openURL(url)
    .then((data) => { })
    .catch((err) => {
      ShowFlash("PHONE_INVALID", "danger");
    });
};

export const email = (emailID) => {
  Linking.openURL(`mailto:${emailID}`);
  // ?subject=SendMail&body=Description
};

export const rateApp = () => {
  if (Platform.OS != "ios") {
    // GOOGLE_PACKAGE_NAME
    Linking.openURL(`market://details?id=${constants.PLAY_STORE_LINK}`).catch((err) =>
      ShowFlash("GOOGLE_STORE_NOT_AVALIABLE", "danger")
    );
  } else {
    Linking.openURL(
      // APPLE_STORE_ID
      `itms://itunes.apple.com/in/app/apple-store/${"expo"}`
    ).catch((err) => ShowFlash("APP_STORE_NOT_AVALIABLE", "danger"));
  }
};

export const call = (phone) => {
  let phoneNumber = `tel:${phone}`;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        ShowFlash("PHONE_INVALID", "danger");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => { });
};

export const sms = (phone, message) => {
  let phoneNumber = `sms:${phone}?body=${message}`;
  if (Platform.OS === "ios") {
    phoneNumber = `sms:${phone}&body=${message}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        ShowFlash("PHONE_INVALID", "danger");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => { });
};

export const valididateBase64 = (str) => {
  var pattern = new RegExp(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
  return !!pattern.test(str);
}

export const shareText = async (message) => {
  try {
    const result = await Share.share({
      message
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
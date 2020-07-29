import ACTION from "../types";
import { AsyncStorage } from "react-native";

export function setLanguage(language) {
  return async (dispatch, getState) => {
    await AsyncStorage.setItem("language", language);
    console.log("set", language);
    dispatch({
      payload: language,
      type: ACTION.LANGUAGE,
    });
  };
}

export function getLanguage() {
  return async (dispatch, getState) => {
    let language = await AsyncStorage.getItem("language");
    console.log("asd", language);
    if (language) {
      dispatch({
        payload: language,
        type: ACTION.LANGUAGE,
      });
    }
  };
}

export function removeNotifications() {
  return async (dispatch, getState) => {
    dispatch({
      type: ACTION.NOTIFICATIONS,
      payload: [],
    });
  };
}

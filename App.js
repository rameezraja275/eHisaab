import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AppContainer from "./src/screens";
import configureStore from "./src/store/store";
import { setNavigator } from "./src/utils/navigationRef";
import FlashMessage from "react-native-flash-message";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";

const { persistedStore, store } = configureStore();

const App = () => {
  const [fontStatus, setFontStatus] = useState(false);
  const loadFont = async () => {
    try {
      await Font.loadAsync({
        PrimaryFont: require("./assets/font/fatura/futura_light_bt.ttf"),
        // PrimaryFont: require("./assets/font/Avenir-Light.ttf"),
      });

      setFontStatus(true);
    } catch (e) {
      console.log("font error", e);
    }
  };

  useEffect(() => {
    loadFont();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        {fontStatus && (
          <AppContainer
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        )}
        <FlashMessage />
      </PersistGate>
    </Provider>
  );
};

export default App;

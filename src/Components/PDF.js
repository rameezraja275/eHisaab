import React from "react";
import { View } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from "react-native-webview";
import Button from "./Button";
import colors from "../utils/colors";
import { ShowFlash } from "../utils/helper";

const PDF = ({ html, language }) => {
  const openShareDialogAsync = async (pdf) => {
    if (!(await Sharing.isAvailableAsync())) {
      ShowFlash("SERVER_ERROR", "danger", language);
      return;
    }
    Sharing.shareAsync(pdf.uri);
  };

  const genratePDF = async () => {
    const pdf = await Print.printToFileAsync({ html: html });
    openShareDialogAsync(pdf);
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      {<WebView source={{ html }} />}
      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Button title="Share" onClick={() => genratePDF()} icon="printer" />
        </View>
      </View>
    </View>
  );
};

export default PDF;

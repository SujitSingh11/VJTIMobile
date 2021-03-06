import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/configureStore";
import { Provider } from "react-redux";
import Navigator from "./src/navigator";
import { SafeAreaView } from "react-native";
import { GoogleSignin } from "@react-native-community/google-signin";
import { GOOGLE_WEB_CLIENT } from "react-native-dotenv";
// if (Platform.OS === "android") {
//   // only android needs polyfill
//   require("intl"); // import intl object
//   require("intl/locale-data/jsonp/en-IN"); // load the required locale details
// }
export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT,
      offlineAccess: true,
      forceConsentPrompt: true,
      hostedDomain: "",
      loginHint: "",
      forceConsentPrompt: true,
      accountName: "",
    });
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

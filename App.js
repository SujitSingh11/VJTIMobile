import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { store /*, persistor*/ } from "./src/store/configureStore";
import { Provider } from "react-redux";
import Navigator from "./src/navigator";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}

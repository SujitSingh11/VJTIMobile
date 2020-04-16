import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StatusBar, Image, View } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { Provider } from "react-redux";

// // Importing the reducers
// import stores from "./src/stores";
// Importing pages for navigation
import LoginPage from "./src/screens/LoginPage";
import HomePage from "./src/screens/HomePage";

const tabs = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage" headerMode="none">
          <Stack.Screen name="HomePage">
            {() => (
              <Tab.Navigator initialRouteName="Home" tabBar={() => null}>
                <Tab.Screen name="Home" component={HomePage} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <StatusBar barStyle="default" />
          <Layout
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginPage />
          </Layout>
        </ApplicationProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

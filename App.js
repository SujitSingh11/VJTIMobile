import "react-native-gesture-handler";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  BottomNavigationTab,
  BottomNavigation,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  MenuItem,
  OverflowMenu,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// import { Provider } from "react-redux";

// // Importing the reducers
// import stores from "./src/stores";
// Importing pages for navigation
import LoginPage from "./src/screens/LoginPage";
import HomePage from "./src/screens/HomePage";
import EventPage from "./src/screens/EventPage";
import ProfilePage from "./src/screens/ProfilePage";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="FEED" />
    <BottomNavigationTab title="PROFILE" />
    <BottomNavigationTab title="EVENTS" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Feed" component={HomePage} />
    <Screen name="Profile" component={ProfilePage} />
    <Screen name="Event" component={EventPage} />
  </Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar barStyle="default" />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
});
export default App;

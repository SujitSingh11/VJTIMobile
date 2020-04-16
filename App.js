import "react-native-gesture-handler";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
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
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// import { Provider } from "react-redux";

// // Importing the reducers
// import stores from "./src/stores";
// Importing pages for navigation
import LoginPage from "./src/screens/LoginPage";

const { Navigator, Screen } = createBottomTabNavigator();

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const renderMenuAction = () => (
  <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
);

const ProfileScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">Profile</Text>
  </Layout>
);

const EventScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">Event</Text>
  </Layout>
);

const HomePage = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <Text category="h1">Feed</Text>
    </Layout>
  );
};

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
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Event" component={EventScreen} />
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

export default App;

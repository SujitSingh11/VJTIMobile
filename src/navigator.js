import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./views/Home/Home.navigator";
import BlankNavigator from "./views/Blank/Blank.navigator";
import LoginNavigator from "./views/Login/Login.navigator";
import auth from "@react-native-firebase/auth";
import { login, logout } from "./store/actions";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Blank1" component={BlankNavigator} />
      <Tab.Screen name="Blank2" component={BlankNavigator} />
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Blank3" component={BlankNavigator} />
      <Tab.Screen name="Blank4" component={BlankNavigator} />
    </Tab.Navigator>
  );
}

function Switch() {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  return <>{isAuthenticated ? <BottomTabs /> : <LoginNavigator />}</>;
}

function Navigator() {
  const dispatch = useDispatch();
  const { initializing } = useSelector((state) => state.Auth);
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      console.log(user);
      dispatch(login(user));
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Switch />
    </NavigationContainer>
  );
}

export default Navigator;

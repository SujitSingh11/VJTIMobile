import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./views/Home/Home.navigator";
import ProfileNavigator from "./views/Profile/Profile.navigator";
import LoginNavigator from "./views/Login/Login.navigator";
import auth from "@react-native-firebase/auth";
import { login, logout } from "./store/actions";
import firestore from "@react-native-firebase/firestore";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Home" component={HomeNavigator} />
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
      const ref = firestore()
        .collection("users")
        .doc(user.uid);
      ref.set(
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastSignInTime: user.metadata.lastSignInTime,
        },
        { merge: true }
      );
      console.log(user);
      dispatch(login({ user }));
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

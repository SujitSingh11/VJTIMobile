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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Theme from "./containers/Theme";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Theme.COLORS.DEFAULT,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={Theme.COLORS.PRIMARY}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: "PROFILE",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={Theme.COLORS.PRIMARY}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Switch() {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  return <>{isAuthenticated ? <BottomTabs /> : <LoginNavigator />}</>;
}

function Navigator() {
  const dispatch = useDispatch();
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

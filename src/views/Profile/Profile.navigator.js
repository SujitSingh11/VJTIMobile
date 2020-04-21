import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Theme from "../../containers/Theme";
import { Thumbnail, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import { getFeed } from "../../store/Notice/actions";
const Stack = createStackNavigator();

function BlankNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "My Profile",
        }}
      />
    </Stack.Navigator>
  );
}

export default BlankNavigator;

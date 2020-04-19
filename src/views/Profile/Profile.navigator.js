import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Theme from "../../containers/Theme";
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

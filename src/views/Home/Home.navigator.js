import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Theme from "../../containers/Theme";

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.COLORS.WHITE,
        },
        headerTintColor: Theme.COLORS.DEFAULT,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "My Feed" }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;

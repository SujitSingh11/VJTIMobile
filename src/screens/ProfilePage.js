import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
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

const ProfilePage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignItems: "center" }}>
        <Text category="h1">Profile</Text>
        <Icon style={styles.icon} fill="#8F9BB3" name="star" />
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
export default ProfilePage;

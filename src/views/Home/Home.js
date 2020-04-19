import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import Style from "../Home/Home.style";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import firestore from "@react-native-firebase/firestore";
import Theme from "../../containers/Theme";
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth().signOut();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={Style.Home}>
      <Text>{user.user && user.user.displayName}</Text>
      <Button title="Signout" color={Theme.COLORS.DEFAULT} onPress={signOut} />
    </View>
  );
};

export default Home;

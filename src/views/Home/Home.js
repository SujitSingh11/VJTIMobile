import React from "react";
import { View, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import Style from "../Home/Home.style";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";

function Home() {
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
      <Text>`{user.email}`</Text>
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}

export default Home;

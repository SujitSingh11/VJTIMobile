import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Theme from "../../containers/Theme";
import { Thumbnail, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import { getMyFeed } from "../../store/Notice/actions";

const Stack = createStackNavigator();

function BlankNavigator() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("notice")
      .where("uid", "==", user.user.uid)
      .onSnapshot((snapshot) => {
        let notice = [];
        if (snapshot.size) {
          snapshot.forEach((doc) => {
            const {
              uid,
              image,
              description,
              groupID,
              createTime,
              displayName,
              photoURL,
            } = doc.data();
            notice.push({
              noticeId: doc.id,
              uid,
              displayName,
              photoURL,
              description,
              image,
              groupID,
              createTime,
            });
          });
          dispatch(getMyFeed(notice));
        }
        return () => {
          unsubscribe();
        };
      });
  }, []);
  const headerRight = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="bell"
        color={Theme.COLORS.PRIMARY}
        style={{ fontSize: 25, marginHorizontal: 15 }}
      />
      <Thumbnail small source={{ uri: user.user.photoURL }} />
    </View>
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "My Profile",
          headerRight: headerRight,
          headerRightContainerStyle: {
            marginRight: 30,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default BlankNavigator;

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Theme from "../../containers/Theme";
import { Thumbnail, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import { getFeed } from "../../store/Notice/actions";

const Stack = createStackNavigator();

function HomeNavigator() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("notice")
      .orderBy("createTime", "desc")
      .onSnapshot((snapshot) => {
        const notice = [];
        if (snapshot.size) {
          snapshot.forEach((doc) => {
            const { uid, image, description, groupID, createTime } = doc.data();
            notice.push({
              noticeId: doc.id,
              uid,
              description,
              image,
              groupID,
              createTime,
            });
            console.log(doc.data());
          });
          dispatch(getFeed(notice));
        }
        return () => {
          unsubscribe();
        };
      });
  }, [firestore()]);
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
        options={{
          title: "My Feed",
          headerRight: headerRight,
          headerRightContainerStyle: {
            marginRight: 30,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;

import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  FlatList,
  YellowBox,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import Style from "../Home/Home.style";
import auth, { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-community/google-signin";
import firestore from "@react-native-firebase/firestore";
import Theme from "../../containers/Theme";
import {
  Icon,
  Fab,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Text,
  Left,
  Body,
  Right,
  Form,
  Textarea,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-picker";
import {
  imagePickerOptions,
  uploadFileToFireBase,
  uploadProgress,
  deleteUploadedFile,
} from "../../components/util";
import ImageViewer from "react-native-image-zoom-viewer";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const MyFeed = ({ description, image, createTime, displayName, photoURL }) => {
  const images = [
    {
      url: image.uri,
    },
  ];

  const [photoViewer, setPhotoViewer] = useState(false);
  const date = createTime._seconds;
  const newDate = new Date(date * 1000);
  return (
    <TouchableOpacity
      style={{ margin: 7 }}
      onPress={() => setPhotoViewer(true)}
    >
      <Card>
        <CardItem header>
          <Left>
            <Thumbnail source={{ uri: photoURL }} />
            <Body>
              <Text>{displayName}</Text>
              <Text note>{newDate.toLocaleString()}</Text>
            </Body>
          </Left>
        </CardItem>
        {image != "" ? (
          <CardItem
            cardBody
            style={{
              backgroundColor: Theme.COLORS.SWITCH_OFF,
            }}
          >
            <Body>
              <Image
                source={image}
                style={{
                  flex: 1,
                  width: "100%",
                  height: 250,
                }}
                resizeMethod="scale"
              />
            </Body>
          </CardItem>
        ) : (
          <></>
        )}

        <CardItem>
          <Body>
            <Text style={{ textAlign: "auto" }}>{description}</Text>
          </Body>
        </CardItem>
      </Card>
      {image != "" ? (
        <Modal
          isVisible={photoViewer}
          onBackdropPress={() => setPhotoViewer(false)}
          onBackButtonPress={() => setPhotoViewer(false)}
        >
          <ImageViewer imageUrls={images} />
        </Modal>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const { myNotice } = useSelector((state) => state.Notice);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);
  const compare = (a, b) => {
    const createTimeA = a.createTime._seconds;
    const createTimeB = b.createTime._seconds;

    let comparison = 0;
    if (createTimeA > createTimeB) {
      comparison = 1;
    } else if (createTimeA < createTimeB) {
      comparison = -1;
    }
    return comparison * -1;
  };
  console.log(myNotice.sort(compare));
  return (
    <View style={{ flex: 1, backgroundColor: "#2222" }}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={myNotice}
          renderItem={({ item }) => (
            <MyFeed
              displayName={item.displayName}
              photoURL={item.photoURL}
              description={item.description}
              image={item.image == null ? "" : item.image}
              createTime={item.createTime}
            />
          )}
          keyExtractor={(item) => item.noticeId}
        />
      </ScrollView>
    </View>
  );
}

export default Profile;

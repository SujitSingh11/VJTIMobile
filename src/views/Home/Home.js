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

const Feed = ({ description, image, createTime, displayName, photoURL }) => {
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
const Home = () => {
  const [active, setActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEvent, setModalVisibleEvent] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [description, setDescription] = useState(null);
  const [descriptionEvent, setDescriptionEvent] = useState(null);
  const [upload, setUpload] = useState({
    loading: false,
    progress: 0,
  });
  const [imageURI, setImageURI] = useState(null);
  const [groupID, setGroupID] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const { notice } = useSelector((state) => state.Notice);
  const [imagePickerResponse, setImagePickerResponse] = useState(null);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(
    false
  );
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [eventStart, setEventStart] = useState(null);
  const [eventEnd, setEventEnd] = useState(null);
  const showStartDatePicker = () => {
    setIsStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };

  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);
  useEffect(() => {
    YellowBox.ignoreWarnings([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    firestore()
      .collection("groups")
      .where("groupName", "==", "Global")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          setGroupID(doc.id);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }, []);
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
  const handleStartDate = (date) => {
    hideStartDatePicker();
    setEventStart(date.toLocaleString());
  };
  const handleEndDate = (date) => {
    hideEndDatePicker();
    setEventEnd(date.toLocaleString());
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModalEvent = () => {
    setModalVisibleEvent(!modalVisibleEvent);
  };

  const monitorFileUpload = (task) => {
    task.on("state_changed", (snapshot) => {
      // Get the upload progress
      const progress = uploadProgress(
        snapshot.bytesTransferred / snapshot.totalBytes
      );
      switch (snapshot.state) {
        case "running":
          setImageURI(null);
          // Set upload state to true and save progress into local state
          setUpload({ loading: true, progress });
          break;
        case "success":
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageURI({ uri: downloadURL });
            // Set upload state to false
            setUpload({ loading: false });
          });
          break;
        default:
          break;
      }
    });
  };
  const uploadFile = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (imagePickerResponse) => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert("Post canceled");
      } else if (error) {
        alert("An error occurred: ", error);
      } else {
        setImagePickerResponse(imagePickerResponse);
        const uploadTask = uploadFileToFireBase(imagePickerResponse);
        monitorFileUpload(uploadTask);
      }
    });
  };
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
          data={notice}
          renderItem={({ item }) => (
            <Feed
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
      <Fab
        active={active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: Theme.COLORS.ICON }}
        position="bottomRight"
        onPress={() => setActive(!active)}
      >
        <MaterialCommunityIcons name="menu" />
        <Button
          style={{ backgroundColor: Theme.COLORS.ICON }}
          onPress={toggleModal}
        >
          <MaterialCommunityIcons name="card-text" color={Theme.COLORS.WHITE} />
        </Button>
        <Button
          style={{ backgroundColor: Theme.COLORS.ICON }}
          onPress={toggleModalEvent}
        >
          <MaterialCommunityIcons name="calendar" color={Theme.COLORS.WHITE} />
        </Button>
        <Button
          style={{ backgroundColor: Theme.COLORS.ERROR }}
          onPress={signOut}
        >
          <MaterialCommunityIcons name="logout" color={Theme.COLORS.WHITE} />
        </Button>
      </Fab>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Content padder>
            <Card>
              <CardItem header>
                <Text style={{ fontSize: 25 }}>Add Notice</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Form style={{ width: "100%" }}>
                    <Textarea
                      rowSpan={5}
                      bordered
                      placeholder="Description"
                      style={{ marginBottom: 10 }}
                      onChangeText={(text) => {
                        setDescription(text);
                      }}
                    />
                    <TouchableOpacity
                      onPress={uploadFile}
                      style={{
                        flexDirection: "row-reverse",
                        marginVertical: 15,
                        alignItems: "center",
                      }}
                    >
                      <Text>Add Image</Text>
                      <MaterialCommunityIcons
                        name="camera"
                        color="#222"
                        style={{ fontSize: 20, marginHorizontal: 5 }}
                      />
                    </TouchableOpacity>

                    {imageURI && (
                      <View>
                        <Image
                          source={imageURI}
                          resizeMode="contain"
                          style={{ height: 200, width: "100%" }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            deleteUploadedFile(imagePickerResponse);
                            setImageURI(null);
                          }}
                          style={{
                            flexDirection: "row-reverse",
                            marginVertical: 15,
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            color="#222"
                            style={{ fontSize: 25, marginHorizontal: 5 }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {upload.loading && (
                      <>
                        <View
                          style={{
                            height: 300,
                            width: "100%",
                            backgroundColor: "#ebebeb",
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: "#039ae5",
                            height: 3,
                            width: `${upload.progress}%`,
                            alignItems: "flex-start",
                          }}
                        />
                      </>
                    )}
                  </Form>
                </Body>
              </CardItem>
              <CardItem footer>
                <Left style={{ flexDirection: "row-reverse" }}>
                  <Button
                    onPress={toggleModal}
                    style={{
                      backgroundColor: Theme.COLORS.ERROR,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text>Close</Text>
                  </Button>
                  <Button
                    style={{
                      backgroundColor: Theme.COLORS.DEFAULT,
                      marginHorizontal: 5,
                    }}
                    onPress={() => {
                      let newNotice = {
                        uid: user.user.uid,
                        displayName: user.user.displayName,
                        photoURL: user.user.photoURL,
                        description: description,
                        image: imageURI,
                        groupID: groupID,
                        createTime: firebase.firestore.Timestamp.fromDate(
                          new Date()
                        ),
                      };

                      firestore()
                        .collection("notice")
                        .add(newNotice)
                        .then((ref) => {
                          console.log("Added document with ID: ", ref.id);
                          setModalVisible(!modalVisible);
                          setDescription(null);
                          setImageURI(null);
                        });
                    }}
                  >
                    <Text>Add Notice</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </View>
      </Modal>
      <Modal
        isVisible={modalVisibleEvent}
        onBackdropPress={() => setModalVisibleEvent(false)}
        onBackButtonPress={() => setModalVisibleEvent(false)}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Content padder>
            <Card>
              <CardItem header>
                <Text style={{ fontSize: 25 }}>Add Event</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Form style={{ width: "100%" }}>
                    <Textarea
                      rowSpan={5}
                      bordered
                      placeholder="Event Description"
                      style={{ marginBottom: 10 }}
                      onChangeText={(text) => {
                        setDescriptionEvent(text);
                      }}
                    />
                    <TouchableOpacity
                      onPress={showStartDatePicker}
                      style={{
                        flexDirection: "row-reverse",
                        marginVertical: 15,
                        alignItems: "center",
                      }}
                    >
                      <Text>Event Start At</Text>
                      <MaterialCommunityIcons
                        name="calendar-range"
                        color="#222"
                        style={{ fontSize: 20, marginHorizontal: 5 }}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isStartDatePickerVisible}
                      mode="datetime"
                      onConfirm={handleStartDate}
                      onCancel={hideStartDatePicker}
                    />
                    <TouchableOpacity
                      onPress={showEndDatePicker}
                      style={{
                        flexDirection: "row-reverse",
                        marginVertical: 15,
                        alignItems: "center",
                      }}
                    >
                      <Text>Event End At</Text>
                      <MaterialCommunityIcons
                        name="calendar-range"
                        color="#222"
                        style={{ fontSize: 20, marginHorizontal: 5 }}
                      />
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={isEndDatePickerVisible}
                      mode="datetime"
                      onConfirm={handleEndDate}
                      onCancel={hideEndDatePicker}
                    />
                  </Form>
                </Body>
              </CardItem>
              <CardItem footer>
                <Left style={{ flexDirection: "row-reverse" }}>
                  <Button
                    onPress={toggleModalEvent}
                    style={{
                      backgroundColor: Theme.COLORS.ERROR,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text>Close</Text>
                  </Button>
                  <Button
                    style={{
                      backgroundColor: Theme.COLORS.DEFAULT,
                      marginHorizontal: 5,
                    }}
                    onPress={() => {
                      let newEvent = {
                        uid: user.user.uid,
                        displayName: user.user.displayName,
                        photoURL: user.user.photoURL,
                        descriptionEvent: descriptionEvent,
                        groupID: groupID,
                        createTime: firebase.firestore.Timestamp.fromDate(
                          new Date()
                        ),
                        eventStart: eventStart,
                        eventEnd: eventEnd,
                      };

                      firestore()
                        .collection("events")
                        .add(newEvent)
                        .then((ref) => {
                          console.log("Added document with ID: ", ref.id);
                          setModalVisibleEvent(!modalVisibleEvent);
                          setDescriptionEvent(null);
                        });
                    }}
                  >
                    <Text>Add Event</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

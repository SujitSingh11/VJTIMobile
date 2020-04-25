import React from "react";
import { View } from "react-native";

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

function Profile() {
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
              uid={item.uid}
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

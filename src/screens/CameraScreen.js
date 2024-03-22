import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import * as ImageManipulator from "expo-image-manipulator";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import RNSButton from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen({ navigation }) {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    async function prepare() {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") setCameraOpen(true);
    }

    prepare();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      let photoUri = photo.uri;

      if (type === Camera.Constants.Type.front) {
        const manipResult = await ImageManipulator.manipulateAsync(
          photoUri,
          [{ flip: ImageManipulator.FlipType.Horizontal }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG },
        );
        photoUri = manipResult.uri;
      }

      setPhotoUri(photoUri);
      setCameraOpen(false);
    }
  };
  const handleBack = (newPhoto = false) => {
    setPhotoUri(null);
    setCameraOpen(newPhoto);
  };

  return (
    <View style={styles.container}>
      {cameraOpen ? (
        <Camera style={styles.fullScreen} type={type} ref={cameraRef}>
          <SafeAreaView style={styles.buttonContainer}>
            <RNSButton onPress={takePicture} caption="snap" />
            <RNSButton
              onPress={() =>
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                )
              }
              caption="flip"
            />
          </SafeAreaView>
        </Camera>
      ) : (
        <View style={styles.fullScreen}>
          <Image
            source={{ uri: photoUri }}
            style={styles.fullScreen}
            resizeMode="cover"
          />
          <View style={styles.captureContainer}>
            <RNSButton
              caption="save"
              onPress={() => navigation.goBack()}
            ></RNSButton>
            <RNSButton
              caption="new photo"
              onPress={() => handleBack(true)}
            ></RNSButton>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  fullScreenCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  capture: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#FFA500",
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  captureContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  circleButton: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFA500",
  },
});

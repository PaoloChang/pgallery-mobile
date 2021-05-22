import React, { RefObject, useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const ControlPanel = styled.View`
  flex: 0.25;
  align-items: center;
  /* justify-content: center; */
  padding: 0px 50px;
`;
const TakeBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 40px;
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View``;
const CloseAction = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  left: 15px;
`;
const Action = styled.TouchableOpacity`
  margin: 0px 40px;
`;
const BottonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhoto: React.FC = () => {
  const navigation = useNavigation();
  const cameraRef = useRef() as RefObject<Camera>;
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };

  const onFlashChange = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else if (flash === Camera.Constants.FlashMode.on) {
      setFlash(Camera.Constants.FlashMode.auto);
    } else if (Camera.Constants.FlashMode.auto) {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
    }
  };

  return (
    <Container>
      <StatusBar hidden={true} />
      <Camera
        ref={cameraRef}
        type={cameraType}
        style={{ flex: 1 }}
        zoom={zoom}
        onCameraReady={onCameraReady}
      >
        <CloseAction onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" color="white" size={30} />
        </CloseAction>
      </Camera>
      <ControlPanel>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
        <BottonsContainer>
          <Action onPress={onFlashChange}>
            <Ionicons
              size={30}
              color="white"
              name={
                flash === Camera.Constants.FlashMode.off
                  ? "flash-off"
                  : flash === Camera.Constants.FlashMode.on
                  ? "flash"
                  : flash === Camera.Constants.FlashMode.auto
                  ? "eye"
                  : "eye"
              }
            />
          </Action>
          <TakeBtn onPress={takePhoto} />
          <Action onPress={onCameraSwitch}>
            <Ionicons size={30} color="white" name={"camera-reverse"} />
          </Action>
        </BottonsContainer>
      </ControlPanel>
    </Container>
  );
};

export default TakePhoto;

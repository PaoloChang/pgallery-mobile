import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Actions = styled.View`
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
const Action = styled.TouchableOpacity``;
const SliderContainer = styled.View``;
const BottonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhoto: React.FC = () => {
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

  const onFlashChange = () => {};

  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} zoom={zoom} />
      <Actions>
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
          <TakeBtn />
          <Action onPress={onCameraSwitch}>
            <Ionicons size={30} color="white" name={"camera-reverse"} />
          </Action>
        </BottonsContainer>
      </Actions>
    </Container>
  );
};

export default TakePhoto;

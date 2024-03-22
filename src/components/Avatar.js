import { View, Image, Text } from "react-native";

export default function Avatar({ props }) {
  return (
    <View style={{ flex: 1 }}>
      {props?.emotion == "sad" ? (
        <Image
          source={require("../../assets/avatar/sad.png")}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      ) : props?.emotion == "surprised" ? (
        <Image
          source={require("../../assets/avatar/surprised.png")}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require("../../assets/avatar/smile.png")}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

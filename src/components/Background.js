import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Background({ children }) {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/images/background.png")}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </ImageBackground>
  );
}

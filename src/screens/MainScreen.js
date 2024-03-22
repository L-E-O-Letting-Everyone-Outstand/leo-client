import {
  StyleSheet,
  Keyboard,
  Pressable,
  Alert,
  Text,
  View,
  Button,
} from "react-native";
import RNSTextInput from "../components/TextInput";
import { useState, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import Background from "../components/Background";
import { KeyboardAvoiderView } from "@good-react-native/keyboard-avoider";
import Avatar from "../components/Avatar";
import { Title } from "../components/StyledText";
import { AuthContext } from "../utils/AuthContext";
import RNSButton from "../components/Button";
import { colors } from "../styles";

export default function MainScreen({ navigation }) {
  const [text, setText] = useState("");
  const { signOut } = useContext(AuthContext);

  return (
    <Background>
      <KeyboardAvoiderView style={{ flex: 1, padding: 10 }}>
        <View style={styles.avatarContainer} onTouchEnd={Keyboard.dismiss}>
          <Avatar />
        </View>
        <View style={styles.titleContainer}>
          <Title white size={24}>
            Hi! I'm Leo! How can I assist you?
          </Title>
        </View>

        <View style={styles.inputContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.lightGray : colors.white,
              },
              styles.photoButton,
            ]}
            onPress={() => navigation.navigate("Camera")}
          >
            <AntDesign name="camera" size={25} color="#000"></AntDesign>
          </Pressable>
          <View style={{ flex: 1 }}>
            <RNSTextInput
              placeholder="Type here"
              value={text}
              onChangeText={(txt) => setText(txt)}
              multiline={true}
              type="bordered"
              style={styles.input}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#009000" : colors.green,
              },
              styles.submitButton,
            ]}
            onPress={() => Alert.alert(text)}
          >
            <AntDesign name="arrowup" size={25} color="#FFF"></AntDesign>
          </Pressable>
        </View>
        <RNSButton caption="Log Out" onPress={() => signOut()} />
      </KeyboardAvoiderView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  avatarContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: "auto",
    minHeight: 40,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  submitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  photoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

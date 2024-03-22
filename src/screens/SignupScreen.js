import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import Background from "../components/Background";
import { Title } from "../components/StyledText";
import RNSButton from "../components/Button";
import RNSTextInput from "../components/TextInput";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useContext(AuthContext);

  const handleLogin = async () => {
    setError(""); // Clear error
    setIsSubmitting(true);
    try {
      await signUp({ email, password });
      // onSuccess: The navigation is handled by the AuthContext and App.js
    } catch (error) {
      setError(
        "Failed to sign up. Please check your credentials and try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Title style={styles.title} white bold size={32}>
          Register
        </Title>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <RNSTextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <RNSTextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <RNSButton caption="Sign Up" onPress={handleLogin} primary />
        )}
        <View style={{ height: 10 }} />
        <RNSButton
          caption="back to login"
          onPress={() => navigation.goBack()}
          secondary
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;

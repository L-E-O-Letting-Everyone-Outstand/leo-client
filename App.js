import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider, AuthContext } from "./src/utils/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MainScreen from "./src/screens/MainScreen";
import CameraScreen from "./src/screens/CameraScreen";
import { KeyboardAvoiderProvider } from "@good-react-native/keyboard-avoider";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Load fonts or other async tasks here
        await Font.loadAsync({
          "Lato-BoldItalic": require("./assets/fonts/Lato-BoldItalic.ttf"),
          "Lato-Italic": require("./assets/fonts/Lato-Italic.ttf"),
          "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
          "Lato-LightItalic": require("./assets/fonts/Lato-LightItalic.ttf"),
          "Lato-Medium": require("./assets/fonts/Lato-Medium.ttf"),
          "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
          "Lato-Semibold": require("./assets/fonts/Lato-Semibold.ttf"),
          "Lato-Thin": require("./assets/fonts/Lato-Thin.ttf"),
          "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        });

        // After loading fonts, hide the splash screen
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null; // or a loading indicator if you want to replace the splash screen with something else
  }

  return (
    <AuthProvider>
      <KeyboardAvoiderProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthContext.Consumer>
              {({ isLoading, userToken }) => {
                if (isLoading) {
                  // Optionally handle the loading state by showing a spinner or splash screen
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="large" />
                    </View>
                  );
                }

                return (
                  <Stack.Navigator>
                    {userToken == null ? (
                      // No token found, user isn't signed in
                      <>
                        <Stack.Screen
                          name="Login"
                          component={LoginScreen}
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="Signup"
                          component={SignupScreen}
                          options={{ headerShown: false }}
                        />
                      </>
                    ) : (
                      // User is signed in
                      <>
                        <Stack.Screen
                          name="Main"
                          component={MainScreen}
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="Camera"
                          component={CameraScreen}
                          options={{ headerShown: false }}
                        />
                      </>
                    )}
                  </Stack.Navigator>
                );
              }}
            </AuthContext.Consumer>
          </NavigationContainer>
        </SafeAreaProvider>
      </KeyboardAvoiderProvider>
    </AuthProvider>
  );
};

export default App;

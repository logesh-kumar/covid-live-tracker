import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, AsyncStorage } from "react-native";
import { Center } from "./Center";
import { AuthContext } from "./AuthProvider";
import { AppTabs } from "./AppTabs";

interface RouteProps {}

export const Routes: React.FC<RouteProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is loggedin or nor
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Center>
      <ActivityIndicator size="small" />
    </Center>
  ) : (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};

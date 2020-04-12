import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList } from "./HomeStackParamList";
import { CovidFeed } from "./CovidFeed";
import { TrackCovid } from "./TrackCovid";
import { TrackCovidInput } from "./TrackCovidInput";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="TrackCovidInput">
      <Stack.Screen name="TrackCovidInput" component={TrackCovidInput} />
      <Stack.Screen name="Feed" component={CovidFeed} />
      <Stack.Screen name="TrackCovid" component={TrackCovid} />
    </Stack.Navigator>
  );
};

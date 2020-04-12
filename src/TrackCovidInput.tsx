import React, { useState } from "react";
import { Container, Content, Form } from "native-base";
import NumericInput from "react-native-numeric-input";
import { Dimensions, Button } from "react-native";
import { HomeStackNavProps } from "./HomeStackParamList";

interface TrackCovidInputProps {}

export const TrackCovidInput: React.FC<HomeStackNavProps<
  "TrackCovidInput"
>> = ({ navigation }) => {
  const [distance, setDistance] = useState(0);
  console.log(distance);
  return (
    <Container>
      <Content>
        <Form>
          <NumericInput
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={Dimensions.get("window").width}
            maxValue={1000}
            totalHeight={50}
            step={50}
            rounded
            onChange={(value) => setDistance(value)}
          />
          <Button
            title="Track Covids near me"
            onPress={() => {
              navigation.navigate("TrackCovid", {
                distance,
              });
            }}
          />
        </Form>
      </Content>
    </Container>
  );
};

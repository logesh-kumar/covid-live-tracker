import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Center } from "./Center";
import { ActivityIndicator, Platform } from "react-native";
import { AppCard } from "./AppCard";
import { useAsync } from "./useAsync";
import {
  Container,
  Header,
  Content,
  Text,
  Form,
  Picker,
  Icon,
  Item,
} from "native-base";
import { countries } from "./Counttirs";

interface CovidFeedProps {}

export const CovidFeed: React.FC<CovidFeedProps> = ({}) => {
  const [selected, setSelected] = useState("India");

  const { execute, pending, value, error } = useAsync(async () => {
    return await axios.get(`http://35.198.214.152:5000/covid/${selected}`);
  }, false);

  let data =
    value && value.data && value.data.length && value.data[0]
      ? value.data[0]
      : false;

  useEffect(() => {
    selected && execute();
  }, [selected]);

  const countryName = data ? data["countryName"] : "";
  const cases = data ? data["cases"] : [];

  return pending ? (
    <Center>
      <ActivityIndicator size="small" />
    </Center>
  ) : (
    <Container>
      <Header>
        <Form>
          <Item style={{ width: "100%" }} picker>
            <Picker
              style={{
                width: Platform.OS === "ios" ? undefined : "100%",
                color: Platform.OS === "ios" ? undefined : "#fff",
              }}
              mode="dropdown"
              iosIcon={
                <Icon
                  style={{
                    color: Platform.OS === "ios" ? undefined : "#fff",
                  }}
                  name="arrow-down"
                />
              }
              placeholder="Select Country"
              iosHeader={"Select Country"}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={selected}
              inlineLabel={true}
              onValueChange={(value) => {
                setSelected(value);
              }}
            >
              {countries.map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
          </Item>
        </Form>
      </Header>
      {cases.length ? (
        <Content padder>
          {cases
            .reverse()
            .map(
              (
                { dateString = "", confirmed = 0, deaths = 0, recovered = 0 },
                index: number
              ) => (
                <AppCard
                  dateString={dateString}
                  confirmed={confirmed}
                  deaths={deaths}
                  recovered={recovered}
                  key={index}
                />
              )
            )}
        </Content>
      ) : (
        <Center>
          <Text>No data</Text>
        </Center>
      )}
    </Container>
  );
};

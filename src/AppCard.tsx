import React from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";
interface AppCardProps {
  dateString: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export const AppCard: React.FC<AppCardProps> = ({
  dateString = "",
  confirmed = 0,
  deaths = 0,
  recovered = 0,
}) => {
  return (
    <Card>
      <CardItem>
        <Body>
          <Text>Date: {dateString}</Text>
          <Text>Confirmed: {confirmed}</Text>
          <Text>Deaths: {deaths}</Text>
          <Text>Deaths: {deaths}</Text>
          <Text>Recovered: {recovered}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

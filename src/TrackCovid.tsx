import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import { useAsync } from "./useAsync";
import { HomeStackNavProps } from "./HomeStackParamList";

interface TrackCovidProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export const TrackCovid: React.FC<HomeStackNavProps<"TrackCovid">> = ({
  route,
}) => {
  const mapRef = useRef();
  const [location, setLocation] = useState({
    coords: {
      latitude: 0.0,
      longitude: 0.0,
    },
  });

  const [region, setRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { execute, pending, value, error } = useAsync(async () => {
    console.log(
      `${region.longitude}/${region.latitude}/${route.params.distance}`
    );
    return await axios.get(
      `http://35.198.214.152:5000/covid/nearme/${region.longitude}/${region.latitude}/${route.params.distance}`
    );
  }, false);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    region.latitude !== 0 && execute();
  }, [`${region.latitude}-${region.longitude}`]);

  let data = value?.data || [];

  console.log(data?.length);

  useEffect(() => {
    mapRef?.current?.fitToElements(true);
  });

  return (
    <View style={styles.container}>
      <Button
        title="Find COVID near me"
        onPress={() => {
          execute();
        }}
      />
      <MapView ref={mapRef} region={region} style={styles.mapStyle}>
        {data && data.length
          ? data.map((d: any) => (
              <Marker
                key={d._id}
                title={d.placename || "Placename"}
                description={d.address}
                coordinate={{
                  latitude: d.location.coordinates[1],
                  longitude: d.location.coordinates[0],
                }}
              ></Marker>
            ))
          : null}
      </MapView>
    </View>
  );
};

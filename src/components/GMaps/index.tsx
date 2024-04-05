import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import StoreAddress from '../../types/storyAddress';
import {ScrollView} from 'react-native-gesture-handler';

const StoreMap = ({stores}: {stores: StoreAddress[]}) => {
  return (
    <View
      style={{
        flex: 1,
        height: 300,
        width: '100%',
        marginTop: 10,
        // zIndex: 100,
      }}>
      <MapView
        style={{flex: 1, width: '100%'}}
        initialRegion={{
          latitude: Number(stores[0].latitude),
          longitude: Number(stores[0].longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {stores.map((store, index: number) => (
          <Marker
            key={index * index}
            coordinate={{
              latitude: Number(store.latitude),
              longitude: Number(store.longitude),
            }}
            title={store.name}
            description={store.address}
          />
        ))}
      </MapView>
    </View>
  );
};

export default StoreMap;

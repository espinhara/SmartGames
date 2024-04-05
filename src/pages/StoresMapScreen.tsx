import React from 'react';
import StoreMap from '../components/GMaps';
import StoreAddress from '../types/storyAddress';
import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
type StoresMapScreenScreenProps = StackScreenProps<
  ParamListBase,
  'StoresMapScreen'
>;

export default function StoresMapScreen({route}: StoresMapScreenScreenProps) {
  const navigation = useNavigation();
  const params = route.params as any;
  const stores = params.storeAddresses as StoreAddress[];
  const linkImage = params.linkImage as string;
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={25} />
        <Text style={{fontSize: 18}}> Voltar</Text>
      </TouchableOpacity>
      <StoreMap stores={stores} linkImage={linkImage} />
    </>
  );
}

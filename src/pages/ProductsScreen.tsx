import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../types/product';
import ProductsService from '../services/product';
import PurchaseService from '../services/purchase';

const ProductsScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  const [imageUndownloadId, setImageUndownloadId] = useState<string[]>([]);
  async function getAllProducts() {
    const response = (await ProductsService.listProducts()).data;
    setProducts(response.products);
  }

  getAllProducts();

  const navigation = useNavigation();
  function handlePress(product: Product) {
    navigation.navigate('ProductDetailScreen', {
      product,
    });
  }
  const renderProductItem = ({item, index}: {item: Product; index: number}) => (
    <ScrollView
      contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
      <View style={{marginVertical: 10, marginHorizontal: 10}}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          {imageUndownloadId.filter(f => f == item._id)[0] != item._id ? (
            <Image
              source={{
                uri: item.imageLink,
              }}
              defaultSource={require('../assets/img/not-load.jpg')}
              onError={e => {
                // console.log(
                //   `Erro ao carregar a imagem ${item._id}:`,
                //   e.nativeEvent.error,
                // );
                if (e.nativeEvent.error) imageUndownloadId.push(item._id);
              }}
              style={{height: 150, width: 'auto', resizeMode: 'cover'}}
            />
          ) : (
            <Image
              source={require('../assets/img/not-load.jpg')}
              style={{height: 150, width: 'auto', resizeMode: 'cover'}}
            />
          )}

          <Text style={{fontWeight: '800', fontSize: 15, marginTop: 5}}>
            {item?.name.length > 20
              ? item.name.substring(0, 20) + '...'
              : item.name}
          </Text>
          <Text style={{marginTop: 5}}>
            {item.description?.length > 40
              ? item.description.substring(0, 40) + '...'
              : item.description}
          </Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Text style={{marginRight: 5, fontSize: 16}}>
            {item?.shops?.length > 18
              ? item.shops.substring(0, 18) + '...'
              : item.shops}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StoresMapScreen', {
                storeAddresses: item.storeAddresses,
              })
            }>
            <Icon name="map-outline" size={25} color={'#63B3ED'} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            textAlign: 'center',
            marginTop: 5,
          }}>
          Apesnas: R$ {item.price}
        </Text>
        <TouchableOpacity
          onPress={() => handlePucharse(item)}
          style={{
            backgroundColor: '#63B3ED',
            padding: 10,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(_product, index) => _product._id}
      renderItem={renderProductItem}
      numColumns={2}
      contentContainerStyle={{padding: 20}}
    />
  );
};

export default ProductsScreen;
function handlePucharse(item: Product): void {
  PurchaseService.savePurchase({product: item, discount: '0'})
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
}

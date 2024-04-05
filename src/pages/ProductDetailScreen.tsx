import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import StoreMap from '../components/GMaps';
import {Product} from '../types/product';

import PurchaseService from '../services/purchase';

type ProductDetailScreenProps = StackScreenProps<
  ParamListBase,
  'ProductDetailScreen'
>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({route}) => {
  const {params} = route as any;

  const [imageLoaded, setImageLoaded] = useState(true);
  const product = params.product as Product;
  // console.log(product.storeAddresses);
  const navigation = useNavigation();
  if (product != null) {
    return (
      <ScrollView>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} />
          <Text style={{fontSize: 18}}> Voltar</Text>
        </TouchableOpacity>
        <View style={{flex: 1, padding: 20}}>
          {imageLoaded ? (
            <Image
              defaultSource={require('../assets/img/not-load.jpg')}
              source={{uri: product.imageLink}}
              onError={e => {
                if (e.nativeEvent.error) {
                  setImageLoaded(false);
                }
              }}
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'contain',
                borderRadius: 10,
              }}
            />
          ) : (
            <Image
              source={require('../assets/img/not-load.jpg')}
              style={{
                width: 'auto',
                height: 250,
                resizeMode: 'cover',
                borderRadius: 10,
              }}
            />
          )}
          <View style={{marginTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {product.name}
            </Text>
            <Text style={{marginTop: 10}}>{product.description}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text style={{marginRight: 5, fontSize: 16}}>
                {product.shops}
              </Text>
            </View>
            <Text style={{marginTop: 20, fontSize: 18, fontWeight: '800'}}>
              Plataformas: {product.platforms}
            </Text>
            <TouchableOpacity
              onPress={() => handlePucharse(product)}
              style={{backgroundColor: '#63B3ED', padding: 10, marginTop: 20}}>
              <Text style={{color: 'white', textAlign: 'center'}}>Comprar</Text>
            </TouchableOpacity>
          </View>
          <Text style={{marginTop: 20, fontWeight: '800'}}>
            Veja no mapa onde encontrar este produto
          </Text>
          <StoreMap stores={product.storeAddresses} />
        </View>
      </ScrollView>
    );
  } else {
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
        <View>
          <Text>Produto não encontrado! :-(</Text>
        </View>
      </>
    );
  }
  function handlePucharse(item: Product): void {
    PurchaseService.savePurchase({product: item, discount: '0'})
      .then(res => {
        if (res.status == 200) {
          navigation.goBack();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
};

export default ProductDetailScreen;

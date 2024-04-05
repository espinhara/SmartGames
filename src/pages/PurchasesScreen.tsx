import * as React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PurchaseService from '../services/purchase';
import ProductService from '../services/product';
import Purchase from '../types/purchase';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../types/product';
import Icon from 'react-native-vector-icons/Ionicons';

const PurchasesScreen: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>();

  const [imageUndownloadId, setImageUndownloadId] = useState<string[]>([]);
  async function getAllPurchase() {
    const response = (await PurchaseService.listPurchases()).data;
    // console.log(response.purchases);
    setPurchases(response.purchases);
  }

  getAllPurchase();

  const navigation = useNavigation();
  function handlePress(product: Product) {
    navigation.navigate('ProductDetailScreen', {
      product,
    });
  }
  function renderProductItem({item, index}: {item: Purchase; index: number}) {
    const dateFromMongoDB = item.createdAt;

    // Converta a string da data para um objeto Date
    const date = new Date(dateFromMongoDB);

    // Defina as opções para a formatação da data
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC', // Se necessário, ajuste o fuso horário conforme necessário
      timeZoneName: 'short',
    };

    // Crie uma instância de Intl.DateTimeFormat com as opções desejadas
    const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', options as any);

    // Use o método format para formatar a data
    const formattedDate = dateTimeFormat.format(date);
    // console.log(item.product);
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: 'auto',
          // height: 'auto',
        }}>
        <View
          style={{
            // marginTop: 10,
            padding: 10,
            borderWidth: 0.2,
            borderRadius: 8,
            marginHorizontal: 10,
            marginVertical: 10,
            width: '100%',
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: '900'}}>
            {item.product.name}
          </Text>
          {/* <TouchableOpacity onPress={() => handlePress(item.product)}> */}
          {imageUndownloadId.filter(f => f == item.product?._id)[0] !=
          item.product?._id ? (
            <Image
              source={{
                uri: item.product.imageLink,
              }}
              defaultSource={require('../assets/img/not-load.jpg')}
              onError={e => {
                if (e.nativeEvent.error)
                  imageUndownloadId.push(item.product._id);
              }}
              style={{
                height: 200,
                marginTop: 10,
                width: 'auto',
                resizeMode: 'contain',
              }}
            />
          ) : (
            <Image
              source={require('../assets/img/not-load.jpg')}
              style={{height: 150, width: 'auto', resizeMode: 'cover'}}
            />
          )}
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
            }}>
            Comprado em:
            {formattedDate}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'center',
            }}>
            Preço: R${item.product.price}, Desconto: {item.discount}%
          </Text>
          {/* </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  }
  console.log(purchases);
  return purchases == null ? (
    <>
      <TouchableOpacity
        style={{
          marginTop: 10,
          flexDirection: 'row',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={25} />
        <Text style={{fontSize: 18}}> Voltar</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>Seu carrinho está vazio </Text>
      </View>
    </>
  ) : (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={25} />
        <Text style={{fontSize: 18}}> Voltar</Text>
      </TouchableOpacity>
      <FlatList
        data={purchases}
        keyExtractor={(purchase, index) => purchase._id}
        renderItem={renderProductItem}
        contentContainerStyle={{padding: 20}}
      />
    </>
  );
};

export default PurchasesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

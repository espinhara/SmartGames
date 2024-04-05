import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './src/pages/ProfileScreen'; // Importe suas telas aqui
import ProductsScreen from './src/pages/ProductsScreen';
import PurchasesScreen from './src/pages/PurchasesScreen';
import ProductDetailScreen from './src/pages/ProductDetailScreen';
import StoresMapScreen from './src/pages/StoresMapScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = () => {
  {
    /* telas principais aqui */
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoresMapScreen"
        component={StoresMapScreen as any}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Produtos"
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Produtos') {
              iconName = 'albums-outline';
            } else if (route.name === 'Compras') {
              iconName = 'cart-outline';
            } else {
              iconName = 'person-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#63B3ED',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}>
        {/* <Tab.Screen name="Perfil" component={ProfileScreen} /> */}
        <Tab.Screen name="Produtos" component={MainStack} />
        <Tab.Screen name="Compras" component={PurchasesScreen} />
        {/* <Tab.Screen name="Ler QRCode" component={PurchasesScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

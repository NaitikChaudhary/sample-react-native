import { NavigationContainer } from '@react-navigation/native';
import { ScreenName } from '../../constants/navigationConstants';
import HomeScreen from '../../module/home/screens/HomeScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { StatusBar, Linking } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import ProductDetailScreen from '../../module/productDetail/screens/ProductDetailScreen';
import FloatingCartButton from '../floatingCart';
import CartScreen from '../../module/cart/screens/CartScreen';
import SearchScreen from '../../module/search/screens/SearchScreen';
import { Colors } from '../../utils/colorUtils';

const Stack = createNativeStackNavigator();
const commonScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const linking = {
  prefixes: ['https://www.noon.com', 'http://www.noon.com', 'noon://'],
  config: {
    screens: {
      [ScreenName.HOME]: '',
      [ScreenName.PRODUCT_DETAIL]: 'pdp/:id?',
      [ScreenName.CART]: 'cart',
      [ScreenName.SEARCH]: 'search',
    },
  },
};

const Navigation = ({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState<ScreenName>(ScreenName.HOME);

  const addStyleBasedOnPage = useCallback((data: any) => {
    const routes = data?.state?.routes;
    if (Array.isArray(routes)) {
      const route = routes[routes?.length - 1];
      const pageName = route.name;
      setCurrentPage(pageName);
      StatusBar.setBackgroundColor('white');
      switch (pageName) {
        case ScreenName.HOME:
          StatusBar.setBarStyle('dark-content');
          StatusBar.setBackgroundColor(Colors.BRAND_YELLOW);
          break;
        default:
          StatusBar.setBarStyle('dark-content');
          break;
      }
    }
  }, []);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log('Deep link received:', event.url);
    };
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('App opened with URL:', url);
      }
    });
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  console.log('RERENDERED');

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenListeners={{
          state: e => {
            addStyleBasedOnPage(e.data);
          },
        }}
        screenOptions={commonScreenOptions}
      >
        <Stack.Screen name={ScreenName.HOME} component={HomeScreen} />
        <Stack.Screen
          name={ScreenName.PRODUCT_DETAIL}
          component={ProductDetailScreen}
        />
        <Stack.Screen name={ScreenName.CART} component={CartScreen} />
        <Stack.Screen name={ScreenName.SEARCH} component={SearchScreen} />
      </Stack.Navigator>
      <FloatingCartButton currentRouteName={currentPage} />
      {children}
    </NavigationContainer>
  );
};

export default Navigation;

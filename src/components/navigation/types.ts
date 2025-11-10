import { ScreenName } from '../../constants/navigationConstants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ProductItem } from '../../types/common';

type RootStackParamList = {
  [ScreenName.HOME]: undefined;
  [ScreenName.PRODUCT_DETAIL]: { product: ProductItem };
  [ScreenName.CART]: undefined;
  [ScreenName.SEARCH]: undefined;
};

export type NavProps = NativeStackNavigationProp<RootStackParamList>;

export type Route<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

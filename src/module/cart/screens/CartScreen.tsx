import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PageWrapper from '../../../components/pageWrapper';
import WidgetFactory from '../../../components/widgetFactory';
import { ScreenName } from '../../../constants/navigationConstants';
import NavigationHeader from '../../../components/NavigationHeader';
import useFetchCartLayout from '../hooks/useCartLayout';

type RootStackParamList = {
  Cart: undefined;
  Details: undefined;
};

type CartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cart'>;
};

function CartScreen({
  navigation: _navigation,
}: CartScreenProps): React.JSX.Element {
  const { data, isLoading, error, refetch } = useFetchCartLayout();
  const listRef = useRef<FlatList>(null);

  return (
    <PageWrapper isLoading={isLoading} error={!!error} onRetry={refetch}>
      <NavigationHeader title="Cart" />
      <WidgetFactory
        listRef={listRef}
        widgets={data}
        pageKey={ScreenName.CART}
      />
    </PageWrapper>
  );
}

export default CartScreen;

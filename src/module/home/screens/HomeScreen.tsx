import React, { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import WidgetFactory from '../../../components/widgetFactory';
import useFetchHomeLayout from '../hooks/useFetchHomeLayout';
import PageWrapper from '../../../components/pageWrapper';
import { ScreenName } from '../../../constants/navigationConstants';
import HomeHeader from '../HomeHeader';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HEADER_HEIGHT = 140;

function HomeScreen({
  navigation: _navigation,
}: HomeScreenProps): React.JSX.Element {
  const { data, isLoading, error, refetch } = useFetchHomeLayout();
  const scrollY = useSharedValue(0);

  const listRef = useRef<FlatList>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <PageWrapper isLoading={isLoading} error={!!error} onRetry={refetch}>
      <View style={styles.container}>
        <HomeHeader scrollY={scrollY} />
      </View>
      <WidgetFactory
        listRef={listRef}
        onScroll={scrollHandler}
        widgets={data}
        pageKey={ScreenName.HOME}
        contentContainerPaddingTop={HEADER_HEIGHT}
      />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default HomeScreen;

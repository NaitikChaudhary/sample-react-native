import { FC, useCallback, useRef } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import {
  BannerCarouselWidgetItem,
  WidgetProps,
} from '../../../types/widgetTypes';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import { triggerAction } from '../../../utils/actionHandler';
const width = Dimensions.get('window').width;

const BannerCarouselWidget: FC<
  WidgetProps<BannerCarouselWidgetItem>
> = props => {
  const { data: { items } = { items: [] } } = props;
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem = useCallback(
    ({ item }: CarouselRenderItemInfo<BannerCarouselWidgetItem>) => {
      const handlePress = () => {
        console.log(item, 'item?.actionitem?.action');

        if (item?.action) {
          triggerAction(item?.action);
        }
      };
      return (
        <Pressable onPress={handlePress} style={styles.carouselItem}>
          <Image
            source={{ uri: item?.image?.url }}
            style={styles.carouselItemImage}
          />
        </Pressable>
      );
    },
    [],
  );
  if (!items || items.length === 0) {
    return <></>;
  }
  return (
    <View>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        data={items}
        onProgressChange={progress}
        renderItem={renderItem}
        autoPlay
        autoPlayInterval={3000}
      />

      <Pagination.Basic
        progress={progress}
        data={items}
        dotStyle={styles.dot}
        containerStyle={styles.paginationContainer}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItemImage: {
    width: '100%',
    height: '100%',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselItemText: {
    textAlign: 'center',
    fontSize: 30,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
  },
  paginationContainer: {
    gap: 5,
    marginTop: 10,
  },
});

export default BannerCarouselWidget;

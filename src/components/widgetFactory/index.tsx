import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import { BaseWidgetType } from '../../types/widgetTypes';
import WidgetWrapper from './WidgetWrapper';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { getWidgetKey } from './utils';
import Animated from 'react-native-reanimated';

interface Props {
  widgets?: Array<BaseWidgetType>;
  HeaderComponent?: React.ReactElement;
  pageKey: string;
  listRef?: React.RefObject<FlatList | null>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  contentContainerPaddingTop?: number;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WidgetFactoryComponent = ({
  widgets,
  pageKey,
  HeaderComponent,
  listRef,
  onScroll,
  contentContainerPaddingTop,
}: Props) => {
  const renderItem: ListRenderItem<unknown> = (
    p: ListRenderItemInfo<unknown>,
  ) => {
    const item = p.item as BaseWidgetType;
    return <WidgetWrapper widget={item} pageKey={pageKey} />;
  };

  const keyExtractor = (item: unknown) => {
    const widget = item as BaseWidgetType;
    return getWidgetKey(widget);
  };

  if (!widgets || widgets.length === 0) {
    return <></>;
  }
  return (
    <AnimatedFlatList
      ref={listRef}
      ListHeaderComponent={HeaderComponent}
      keyExtractor={keyExtractor}
      data={widgets}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.listContent,
        contentContainerPaddingTop
          ? { paddingTop: contentContainerPaddingTop }
          : undefined,
      ]}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: 'white',
  },
});

const WidgetFactory = memo(WidgetFactoryComponent, isEqual);

export default WidgetFactory;

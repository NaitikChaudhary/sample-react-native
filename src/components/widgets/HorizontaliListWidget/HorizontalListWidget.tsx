import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../../productCard';
import {
  HorizontalListWidgetItem,
  WidgetProps,
} from '../../../types/widgetTypes';

const HorizontalListWidget: React.FC<WidgetProps<HorizontalListWidgetItem>> = ({
  data,
}) => {
  const renderItem = React.useCallback(
    ({ item }: { item: HorizontalListWidgetItem }) => {
      return (
        <View style={[styles.item]}>
          <ProductCard
            product={item}
            containerStyle={styles.productCard}
          />
        </View>
      );
    },
    [],
  );
  const renderItemSeparator = React.useCallback(
    () => <View style={styles.separator} />,
    [],
  );
  if (!data?.items || data?.items.length === 0) {
    return null;
  }
  return (
    <View style={[styles.container]}>
      <FlatList
        data={data?.items}
        horizontal
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  listContent: {
    alignItems: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  productCard: {
    height: 270,
  },
  item: {
    width: 140,
  },
  separator: {
    width: 12,
  },
});

export default HorizontalListWidget;

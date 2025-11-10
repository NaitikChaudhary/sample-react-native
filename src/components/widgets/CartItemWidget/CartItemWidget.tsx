import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NImage from '../../NImage';
import { Colors } from '../../../utils/colorUtils';
import { AtcButton } from '../../productCard/AtcButton';
import { CartItemWidgetItem, WidgetProps } from '../../../types/widgetTypes';

const CartItemWidget: React.FC<WidgetProps<CartItemWidgetItem>> = ({
  data,
}) => {
  const { items = [] } = data || {};
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <NImage
              image={item.productImage}
              fallbackWidth={48}
              fallbackHeight={48}
              style={styles.productImage}
            />
          </View>
          <View style={styles.nameWrapper}>
            <Text
              style={styles.productName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </View>
          <AtcButton product={item} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.WHITE,
  },
  imageWrapper: {
    marginRight: 14,
  },
  productImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.GRAY_100,
  },
  nameWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.TEXT_PRIMARY,
  },
});

export default CartItemWidget;

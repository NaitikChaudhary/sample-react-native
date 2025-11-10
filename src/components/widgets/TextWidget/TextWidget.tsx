import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextProps, WidgetProps } from '../../../types/widgetTypes';

const TextWidget: React.FC<WidgetProps<TextProps>> = ({ data }) => {
  console.log('TextWidget', data);
  const { items = [] } = data || {};

  const renderItem = React.useCallback(
    ({ item }: { item: TextProps }) => (
      <Text style={item?.style}>{item?.text}</Text>
    ),
    [],
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default TextWidget;

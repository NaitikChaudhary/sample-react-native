import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BaseWidgetHeader } from '../../types/widgetTypes';
import { WrapperView } from '../WrapperView';
import NImage from '../NImage';
import { Colors } from '../../utils/colorUtils';

type WidgetHeaderProps = {
  header?: BaseWidgetHeader;
};

const WidgetHeader: React.FC<WidgetHeaderProps> = ({ header }) => {
  if (!header) {
    return null;
  }

  const { title, description, image, viewMeta } = header;

  return (
    <WrapperView viewMeta={viewMeta}>
      <View style={styles.headerContainer}>
        {image?.url ? <NImage image={image} /> : null}
        <View style={styles.textContainer}>
          {title?.text ? (
            <Text style={[styles.headerTitle, title.style]} numberOfLines={1}>
              {title.text}
            </Text>
          ) : null}
          {description?.text ? (
            <Text
              style={[styles.headerSubtitle, description.style]}
              numberOfLines={2}
            >
              {description.text}
            </Text>
          ) : null}
        </View>
      </View>
    </WrapperView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.SLATE_900,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.TEXT_SLATE_LIGHT,
    fontWeight: '400',
  },
});

export default WidgetHeader;

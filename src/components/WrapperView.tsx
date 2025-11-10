import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import { BaseWidgetViewMeta } from '../types/widgetTypes';

interface WrapperViewProps {
  viewMeta?: BaseWidgetViewMeta;
  children?: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const WrapperView: React.FC<WrapperViewProps> = ({
  viewMeta,
  children,
  onLayout,
}) => {
  if (!viewMeta) {
    return (
      <View style={styles.defaultContainer} onLayout={onLayout}>
        {children}
      </View>
    );
  }

  const { styles: viewStyles, backgroundImage } = viewMeta;

  if (backgroundImage?.url) {
    return (
      <ImageBackground
        onLayout={onLayout}
        source={{ uri: backgroundImage.url }}
        style={[styles.defaultContainer, viewStyles]}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.defaultContainer, viewStyles]} onLayout={onLayout}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
  },
});

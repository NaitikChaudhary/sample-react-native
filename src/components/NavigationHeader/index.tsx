import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from '../PressableButton';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NavProps } from '../navigation/types';
import { Colors } from '../../utils/colorUtils';

type NavigationHeaderProps = {
  title: string;
  onBackPress?: () => void;
  backButtonLabel?: string;
  showBackButton?: boolean;
  style?: any;
  titleStyle?: any;
};

const ChevronLeft: React.FC<{ color?: string; size?: number }> = ({
  color = Colors.TEXT_PRIMARY,
  size = 24,
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={styles.chevron}
  >
    <Path
      d="M15.3 19.3a1 1 0 0 1-1.41 0l-6.59-6.59a1 1 0 0 1 0-1.41l6.59-6.59a1 1 0 1 1 1.41 1.41L9.41 12l5.89 5.89a1 1 0 0 1 0 1.41z"
      fill={color}
    />
  </Svg>
);

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  onBackPress,
  showBackButton = true,
  style,
  titleStyle,
}) => {
  const navigation = useNavigation<NavProps>();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={[styles.container, style]}>
      {showBackButton && (
        <PressableButton onPress={handleBackPress} style={styles.backButton}>
          <ChevronLeft />
        </PressableButton>
      )}
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      {showBackButton && <View style={styles.backButtonPlaceholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDER_GRAY,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonLabel: {
    fontSize: 16,
    color: Colors.INFO_BLUE,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.TEXT_PRIMARY,
    marginHorizontal: 16,
  },
  backButtonPlaceholder: {
    width: 56,
  },
  chevron: {
    display: 'flex',
  },
});

export default NavigationHeader;

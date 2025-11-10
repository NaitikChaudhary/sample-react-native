import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from '../PressableButton';
import { Colors } from '../../utils/colorUtils';

export type FallbackProps = {
  error: Error;
  resetError: () => void;
};

const PageFallback = ({ error, resetError }: FallbackProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😕</Text>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        {error && error.message
          ? error.message
          : 'An unexpected error occurred. Please try again.'}
      </Text>
      <PressableButton style={styles.button} onPress={resetError}>
        <Text style={styles.buttonText}>Retry</Text>
      </PressableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.SLATE_50,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.SLATE_800,
    marginBottom: 14,
  },
  message: {
    fontSize: 16,
    color: Colors.SLATE_700,
    marginBottom: 28,
    textAlign: 'center',
    maxWidth: 320,
  },
  button: {
    backgroundColor: Colors.PRIMARY_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 100,
    elevation: 2,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default PageFallback;

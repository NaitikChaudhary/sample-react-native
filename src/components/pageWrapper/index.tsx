import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { onLoadError } from '../../utils/commonUtils';
import PageFallback, { FallbackProps } from './PageFallback';
import PagLoadingScreen from '../PagLoadingScreen';

type PageWrapperProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: boolean;
  FallbackComponent?: React.ComponentType<FallbackProps>;
  loadingComponent?: React.ReactNode;
  onRetry?: () => void;
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  isLoading = false,
  error = false,
  FallbackComponent,
  loadingComponent,
  onRetry,
}) => {
  if (isLoading) {
    return <>{loadingComponent ?? <PagLoadingScreen />}</>;
  }

  const Fallback =
    FallbackComponent ??
    (() => (
      <PageFallback
        error={new Error('Please try again!')}
        resetError={onRetry ?? (() => {})}
      />
    ));
  if (error) {
    return (
      <Fallback
        error={new Error('An error occurred while loading this page.')}
        resetError={() => onRetry?.()}
      />
    );
  }

  return (
    <ErrorBoundary onError={onLoadError} FallbackComponent={Fallback}>
      {children}
    </ErrorBoundary>
  );
};

export default PageWrapper;

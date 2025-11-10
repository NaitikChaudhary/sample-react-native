import { ENV } from '@env';
import rfcIsEqual from 'react-fast-compare';

export function isProductionApp(): boolean {
  return ENV === 'PROD';
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isEqual<T1, T2>(value: T1, other: T2): boolean {
  return rfcIsEqual(value, other);
}

export function onLoadError(error: Error) {
  console.log(error);
}

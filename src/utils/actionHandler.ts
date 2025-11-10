import { Linking } from 'react-native';
import { Action, ActionType } from '../types/common';

export const triggerAction = (action: Action) => {
  switch (action.type) {
    case ActionType.OPEN_DEEPLINK:
      if (action.data?.deeplink) {
        return Linking.openURL(action.data.deeplink ?? '');
      }
      break;
    default:
      return null;
  }
};

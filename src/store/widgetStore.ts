import { create } from 'zustand';
import { WidgetResponse } from '../types/widgetTypes';

type WidgetsByPage = Record<string, Record<string, WidgetResponse>>;

interface WidgetStoreState {
  widgetsByPage: WidgetsByPage;
  setPageWidgets: (pageKey: string, widgets: Record<string, WidgetResponse>) => void;
  setWidget: (pageKey: string, widgetKey: string, widgetProps: WidgetResponse) => void;
  removeWidget: (pageKey: string, widgetKey: string) => void;
  getPageWidgets: (pageKey: string, widgetKey: string) => WidgetResponse | undefined;
  clearPageWidgets: (pageKey: string) => void;
  clearAllWidgets: () => void;
}

const storeImplementation = (set: any, get: any): WidgetStoreState => ({
  widgetsByPage: {},

  setPageWidgets: (pageKey, widgets) => {
    set((state: WidgetStoreState) => ({
      widgetsByPage: {
        ...state.widgetsByPage,
        [pageKey]: { ...widgets },
      },
    }));
  },

  setWidget: (pageKey, widgetKey, widgetProps) => {
    set((state: WidgetStoreState) => ({
      widgetsByPage: {
        ...state.widgetsByPage,
        [pageKey]: {
          ...(state.widgetsByPage?.[pageKey] || {}),
          [widgetKey]: widgetProps,
        },
      },
    }));
  },

  removeWidget: (pageKey, widgetKey) => {
    set((state: WidgetStoreState) => {
      const pageWidgets = { ...(state.widgetsByPage?.[pageKey] || {}) };
      delete pageWidgets[widgetKey];
      return {
        widgetsByPage: {
          ...state.widgetsByPage,
          [pageKey]: pageWidgets,
        },
      };
    });
  },

  getPageWidgets: (pageKey, widgetKey) => {
    return get().widgetsByPage?.[pageKey]?.[widgetKey];
  },

  clearPageWidgets: (pageKey) => {
    set((state: WidgetStoreState) => {
      const widgetsByPage = { ...state.widgetsByPage };
      delete widgetsByPage[pageKey];
      return { widgetsByPage };
    });
  },

  clearAllWidgets: () => {
    set({ widgetsByPage: {} });
  },
});

export const useWidgetStore = create<WidgetStoreState>()(storeImplementation);

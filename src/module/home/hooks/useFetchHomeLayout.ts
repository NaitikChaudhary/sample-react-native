import { useQuery } from 'react-query';
import { LayoutRepositoryInstanceProvider } from '../../../data/repositories/layoutRepository';
import { BaseWidgetType, WidgetResponse } from '../../../types/widgetTypes';
import { useWidgetStore } from '../../../store/widgetStore';
import { getWidgetKey } from '../../../components/widgetFactory/utils';
import { ScreenName } from '../../../constants/navigationConstants';

const useFetchHomeLayout = () => {
  const setPageWidgets = useWidgetStore(s => s.setPageWidgets);
  return useQuery(
    ['home-layout'],
    () => {
      return new Promise<Array<BaseWidgetType>>((resolve, reject) => {
        LayoutRepositoryInstanceProvider.getRepositoryInstance()
          .fetchHomeLayout()
          .then(response => {
            const { widgets } = response.data;
            const widgetData: { [widgetKey: string]: WidgetResponse } = {};
            const widgetResponse: Array<BaseWidgetType> = [];
            widgets?.forEach(widget => {
              widgetData[getWidgetKey(widget)] = widget;
              widgetResponse.push({
                widgetId: widget.widgetId,
                widgetType: widget.widgetType,
                widgetName: widget.widgetName,
              });
            });
            setPageWidgets(ScreenName.HOME, widgetData);

            resolve(widgetResponse);
          })
          .catch(error => {
            console.log(error, 'error HOOK');

            reject(error);
          });
      });
    },
    {
      cacheTime: 2000,
      staleTime: 0,
      enabled: true,
      retry: false,
    },
  );
};

export default useFetchHomeLayout;

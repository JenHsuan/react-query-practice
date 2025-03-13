import { QueryClient } from "@tanstack/react-query";

import * as _ from 'lodash';

let queryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (_.isNil(queryClient)) {
    queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            refetchOnWindowFocus: true
          },
        },
      });
  }  

  return queryClient;
}

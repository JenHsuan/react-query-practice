import { useQuery } from "@tanstack/react-query"
import { articlesKeys } from "../query-key/query-key"
import request, { gql } from "graphql-request";


const endpoint = "https://www.alayman.io/graphql/";

export const useAngularSite = () => {
  return useQuery({ 
      queryKey: articlesKeys.allAngularSites, 
      queryFn: async () => {
        const { sites } = await request<any>(
            endpoint, 
            gql`
            query {
              sites {
                name
                  authorProfile {
                    name
                    url
                }
                }
            }
            `)

        return sites;
       },
    })  
}
import axios from "axios";
import { Article } from "../model/articles";

const baseUrl = "https://www.alayman.io";

export const fetchArticles = async (first = 10, page = 1): Promise<Article[]> => {
  const response = await axios.get(
    `${baseUrl}/api/articles?first=${first}&page=${page}`,
  );
  return response.data;
} 

export const fetchArticleById = async (id: Number | null): Promise<Article[] | null> => {
    try{
        const response = await axios.get(
          `${baseUrl}/api/article?id=${id}`,
        );
        return response.data;
    } catch (error) {
        return null;
    }
} 
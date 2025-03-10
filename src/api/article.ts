import axios from "axios";
import { Article } from "./model/articles";

export const fetchArticles = async (): Promise<Article[]> => {
    const response = await axios.get(
      "https://www.alayman.io/api/articles",
    );
    return response.data;
} 

export const fetchArticleById = async (id: Number | null): Promise<Article[] | null> => {
    try{
        const response = await axios.get(
          `https://www.alayman.io/api/article?id=${id}`,
        );
        return response.data;
    } catch (error) {
        return null;
    }
} 
import axios from "axios";
import { Article } from "./model/articles";

export const fetchArticles = async (): Promise<Article[]> => {
    const response = await axios.get(
      "https://www.alayman.io/api/articles",
    );
    return response.data;
} 
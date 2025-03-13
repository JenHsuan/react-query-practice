import { Article } from "@/app/api/model/articles";
import axios, { AxiosResponse } from "axios";

export async function getArticlesData() {
  let articleData: string = null;
  
  try {
    let res: AxiosResponse<Article[]> = await axios.get('https://www.alayman.io/api/articles');
    if (res && res.data) {
      articleData = JSON.stringify(res.data);
    }
  } catch (err) {
    console.log(err);
  }
  
  return {
    props: {
      articleData
    },
  }
}

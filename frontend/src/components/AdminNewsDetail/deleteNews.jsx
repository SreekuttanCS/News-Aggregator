import axios from "axios";
import { newsError, newsLoaded } from "../../redux/NewsSlice";
import { endpoints } from "../../api/apiConfig";

export const deleteNews = async (id, token, news, dispatch) => {
  try {
    await axios.delete(`${endpoints.adminNewsDetail}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const filteredNews = news.filter((item) => item._id !== id);
    dispatch(newsLoaded(filteredNews));
  } catch (error) {
    dispatch(newsError("Failed to delete news item:", error));
    console.error("Failed to delete news item:", error);
  }
};

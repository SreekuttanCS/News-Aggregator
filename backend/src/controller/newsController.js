import axios from "axios";
import UserNews from "../model/UserNews.js";
import RSSParser from "rss-parser";

export const getFetchedNews = async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}`
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news", err });
  }
};
export const getCategoryFetched = async (req, res) => {
  const { category } = req.params;
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}&category=${category}`
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news", err });
  }
};
export const createNews = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const imageUrl = req.file?.path || "";

    const news = await UserNews.create({
      title,
      content,
      category,
      author: req.user._id,
      image: imageUrl,
    });

    res.status(200).json({ message: "Successfully created news", news });
  } catch (err) {
    res.status(400).json({ message: "Failed to create news", err });
  }
};
export const getUserNews = async (req, res) => {
  try {
    const news = await UserNews.find();
    if (news.length === 0) {
      return res.status(404).json({ message: "No news found" });
    }
    res.status(200).json({ news });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news", err });
  }
};

export const getCategoryFetch = async (req, res) => {
  const { category } = req.params;

  try {
    const news = await UserNews.find({ category: category }).sort({
      createdAt: -1,
    });

    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
};
export const updateNews = async (req, res) => {
  try {
    const news = await UserNews.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!news) {
      return res.status(400).json({ message: "News not found" });
    }

    if (news.author._id.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Unauthorized to update this news" });
    }

    const updatedNews = await UserNews.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Successfully updated", updatedNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update news", err });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await UserNews.findById(req.params.id);
    if (!news) {
      return res.status(400).json({ message: "News not found" });
    }

    if (news.author._id.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Unauthorized to delete this news" });
    }

    await news.deleteOne();
    res.status(200).json({ message: "Successfully deleted news" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete news", err });
  }
};
export const apiSearch = async (req, res) => {
  const searchTerm = req.query.q;

  try {
    if (!searchTerm || searchTerm.trim() == " ") {
      return res.status(400).json({ message: "Search query is required" });
    }
    const result = await axios.get(
      `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=${process.env.NEWS_KEY}`
    );
    res.status(200).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to search news", err });
  }
};
export const userSearch = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    if (!searchTerm || searchTerm.trim() == "") {
      return res.status(400).json({ message: "Search querey is required" });
    }
    const result = await UserNews.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Failed to search news", err });
  }
};

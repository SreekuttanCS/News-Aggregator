import axios from "axios";
import UserNews from "../model/UserNews.js";
import RSSParser from "rss-parser";
import upload from "../middleware/multer.js";
import cloudinary from "cloudinary";

const parser = new RSSParser();

export const getFetchedNews = async (req, res) => {
  try {
    const rssUrl = "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";
    const feed = await parser.parseURL(rssUrl);

    const articles = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.contentSnippet || "",
    }));

    res.status(200).json(articles);
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
      imageUrl,
    });

    res.status(200).json({ message: "Successfully created news", news });
  } catch (err) {
    console.log(err);
    console.error("Cloudinary Upload Error:", err);
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
    res.status(500).json({ message: "Failed to fetch news", err });
  }
};

export const getSingleNews = async (req, res) => {
  try {
    const news = await UserNews.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!news) {
      return res.status(400).json({ message: "News not found" });
    } else {
      return res.status(200).json({ news });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch news", err });
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

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isPost } from "../../redux/LoggedSlice";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Creation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.warning("Login to Create Post", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/news/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("News Created Successfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setFormData({ title: "", content: "", category: "", image: null });
    } catch (error) {
      toast.error("Failed to Create News", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackPost = () => {
    dispatch(isPost(false));
    navigate("/");
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center px-4 py-12">
      <div className=" shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create News
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            name="content"
            placeholder="Detail description"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="border border-gray-300 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-400 rounded-md py-6 text-blue-500 hover:bg-blue-50 transition"
          >
            {formData.image ? (
              <span>{formData.image.name}</span>
            ) : (
              <span>Click to upload image</span>
            )}
            <input
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleBackPost}
              className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Creation;

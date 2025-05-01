import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isPost } from "../../redux/LoggedSlice";
import { useNavigate } from "react-router-dom";

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
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    data.append("image", formData.image);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/news/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({ title: "", content: "", category: "", image: null });
    } catch (err) {
      console.log(err);
    }
    //if no token notify login
  };
  
  const handleBackPost = () => {
    dispatch(isPost(false));
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className="text-2xl font-bold mb-4">Create News</h2>
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Enter Category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          name="content"
          placeholder="Detail Description"
          value={formData.content}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 h-32"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="file:border file:border-gray-300 file:rounded file:px-3 file:py-2"
        />
        <div className="w-full flex justify-around">
          <button
            type="submit"
            className="bg-blue-600 text-white w-50 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={handleBackPost}
            className="bg-red-600 text-white w-50 rounded hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Creation;

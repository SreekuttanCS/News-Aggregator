export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://news-aggregator-lgkt.onrender.com/api";

export const endpoints = {
  adminDashboardFetch: `${API_BASE_URL}/admin/dashboard`,
  userLogin: `${API_BASE_URL}/user/login`,
  adminLogin: `${API_BASE_URL}/admin/login`,
  userSignup: `${API_BASE_URL}/user/signup`,
  adminNewsDetail: `${API_BASE_URL}/admin/news`,
  adminUserDetail: `${API_BASE_URL}/admin/users`,
  getUserById: (id) => `${API_BASE_URL}/admin/users/${id}`,
  deleteUserById: (id) => `${API_BASE_URL}/admin/users/${id}`,
  getNewsById: (id) => `${API_BASE_URL}/news/${id}`,
  loadFetchedResponse: `${API_BASE_URL}/news/fetchednews`,
  loadUserFetchedResponse: `${API_BASE_URL}/news/fetchnews`,
  newsByCategory: (category) => `${API_BASE_URL}/news/category/${category}`,
  userNewsByCategory: (category) =>
    `${API_BASE_URL}/news/category_user/${category}`,
  searchExternalNews: (query) =>
    `${API_BASE_URL}/news/search/external?q=${encodeURIComponent(query)}`,
  searchUserNews: (query) =>
    `${API_BASE_URL}/news/search/user?q=${encodeURIComponent(query)}`,
  createNews: `${API_BASE_URL}/news/create`,
};

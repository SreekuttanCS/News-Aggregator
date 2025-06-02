const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const endpoints = {
  adminDashboardFetch: `${API_BASE_URL}/admin/dashboard`,
  userLogin: `${API_BASE_URL}/user/login`,
  adminLogin: `${API_BASE_URL}/admin/login`,
  userSignup: `${API_BASE_URL}/user/signup`,
  adminNewsDetail: `${API_BASE_URL}/admin/news`,
  adminUserDetail: `${API_BASE_URL}/admin/user`,
  getUserById: (id) => `${API_BASE_URL}/admin/users/${id}`,
  deleteUserById: (id) => `${API_BASE_URL}/admin/users/${id}`,
  getNewsById: (id) => `${API_BASE_URL}/news/${id}`,
  loadFetchedResponse: `${API_BASE_URL}/news/fetchednews`,
  loadUserFetchedResponse: `${API_BASE_URL}/news/fetchnews`,
};

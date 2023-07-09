import axiosClient from "../axiosClient";

const CategoryAPI = {
  getAllCategory() {
    const url = `/products/categories`;
    return axiosClient.get(url);
  },
  getSpecificCategory(specific, limit) {
    const url = `products/category/${specific}?limit=${limit}`;
    return axiosClient.get(url);
  },
};

export default CategoryAPI;

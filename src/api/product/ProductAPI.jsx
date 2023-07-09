import axiosClient from "../axiosClient";

const ProductAPI = {
  getLimitProduct(limit) {
    // limit =0 >get All product
    const url = `products?limit=${limit}`;
    return axiosClient.get(url);
  },
  getProductById(id) {
    const url = `products/${id}`;
    return axiosClient.get(url);
  },
  getProductByCategoryAll(cate) {
    const url = `products/category/${cate}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;

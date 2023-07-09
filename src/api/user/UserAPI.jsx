import axiosClient from "../axiosClient";

const UserAPI = {
  postLoginFE(obj) {
    const url = `auth/login`;
    return axiosClient.post(url, JSON.stringify(obj));
  },
};

export default UserAPI;

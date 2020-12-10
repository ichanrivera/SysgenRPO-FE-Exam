import AxiosInstance from "./axios";

const uploadPhotos = async (data) => {
  try {
    const response = await AxiosInstance.put("photos", data, { });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default uploadPhotos;

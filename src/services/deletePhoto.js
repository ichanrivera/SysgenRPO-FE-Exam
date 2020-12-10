import AxiosInstance from "./axios";

const deletePhoto = async (album,filename) => {
  try {
    const response = await AxiosInstance.delete(`photos/${album}/${filename}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deletePhoto;

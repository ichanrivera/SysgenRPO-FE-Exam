import AxiosInstance from "./axios";

const getPhotos = async (limit) => {
  console.log("limit", limit)
  let data = {
    "skip": 0,
    "limit": limit ? limit : 10,
  };
  let  headers = { "Content-Type": "text/plain" }
  try {
    const response = await AxiosInstance.post(
      "photos/list",
      { ...data },
      headers
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getPhotos;

import React, { useEffect, useState } from "react";
import { Card, Popup, Button, Icon } from "semantic-ui-react";
import deletePhoto from "../../services/deletePhoto";
import getPhotos from "../../services/getPhotos";
import ResponseModal from "../ResponseModal/ResponseModal";

import "./index.scss";

const PhotoContainer = ({ albumName, photos, itemsPerPage }) => {
  const [photosResponse, setphotosResponse] = useState([]);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  const getPhotosList = async (itemsPerPage) => {
    const response = await getPhotos(itemsPerPage);
    setphotosResponse(response.data.documents);
  };

  useEffect(() => {
    getPhotosList(itemsPerPage, 0);
  }, [itemsPerPage]);

  const showResponseModal = () => {
    setIsResponseModalOpen(true);
  };

  const hideResponseModal = () => {
    setIsResponseModalOpen(false);
  };

  const handleDelete = async (album, filename) => {
    const response = await deletePhoto(album, filename);
    if (response) {
      setResponseStatus("success");
    } else {
      setResponseStatus("fail");
    }
    showResponseModal();
    setTimeout(() => {
      hideResponseModal();
    }, 1500);
    console.log(response);

    getPhotosList();
  };

  return (
    <>
      <h1>{albumName && albumName}</h1>
      <Card.Group itemsPerRow={4}>
        {!albumName &&
          photosResponse.length > 0 &&
          photosResponse.map((photo, i) => (
            <Popup
              flowing
              hoverable
              wide
              position="bottom center"
              trigger={
                <Card key={i} color="red">
                  <img alt="react-jpg" src={photo.raw} height={280}/>
                </Card>
              }
            >
              <Button
                icon
                color="red"
                labelPosition="left"
                onClick={() => handleDelete(photo.album, photo.name)}
              >
                <Icon name="trash" />
                Delete
              </Button>
            </Popup>
          ))}
        {albumName &&
          photos.length > 0 &&
          photos.map((photo, i) => (
            <Card
              key={i}
              color="red"
              image={photo.raw.replace(
                "http://http://localhost:3000",
                "http://localhost:8888"
              )}
            />
          ))}
      </Card.Group>
      <ResponseModal
        status={responseStatus}
        open={isResponseModalOpen}
        onClose={hideResponseModal}
      />
    </>
  );
};

export default PhotoContainer;

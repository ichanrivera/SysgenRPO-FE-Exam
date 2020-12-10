import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import Menu from "../components/Menu/Menu";
import PhotoContainer from "../components/PhotoContainer/PhotoContainer";
import ResponseModal from "../components/ResponseModal/ResponseModal";
import UploadModal from "../components/UploadModal/UploadModal";
import uploadPhotos from "../services/uploadPhotos";

const MainLayout = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const [photos, setphotos] = useState([]);
  const [albumName, setalbumName] = useState("");
  const [itemsPerPage, setitemsPerPage] = useState(10)

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const showResponseModal = () => {
    setIsResponseModalOpen(true);
  };

  const hideResponseModal = () => {
    setIsResponseModalOpen(false);
  };

  const applyItemCount = async (value) => {
    await setitemsPerPage(value);
  }

  const upload = async (formData, albumName) => {
    const response = await uploadPhotos(formData);
    if (response) {
      setphotos(response.data.data);
      setalbumName(albumName);
      if (response) {
        setResponseStatus("success");
      } else {
        setResponseStatus("fail");
      }
    }
    showResponseModal();
    setTimeout(() => {
      hideResponseModal();
    }, 1500);
    closeUploadModal();
  };

  return (
    <>
      <Container>
        <Menu
          applyItemCount={applyItemCount}
          openUploadModal={openUploadModal}
        />
        <PhotoContainer
          itemsPerPage={itemsPerPage}
          photos={photos}
          albumName={albumName}
        />
        <UploadModal
          upload={upload}
          closeUploadModal={closeUploadModal}
          open={isUploadModalOpen}
        />
        <ResponseModal
          status={responseStatus}
          open={isResponseModalOpen}
          onClose={hideResponseModal}
        />
      </Container>
    </>
  );
};

export default MainLayout;

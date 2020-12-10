import React, { useState, useEffect, useRef } from "react";
import { Header, Icon, Modal, Button, Select } from "semantic-ui-react";
import "./index.scss";

const UploadModal = ({ open, closeUploadModal, upload }) => {

  const options = [
    { key: 1, text: "Travel", value: "Travel" },
    { key: 2, text: "Personal", value: "personal" },
    { key: 3, text: "Food", value: "food" },
    { key: 4, text: "Nature", value: "nature" },
    { key: 5, text: "Other", value: "other" },
  ];

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const fileInputRef = useRef();

  const uploadRequest = async () => {
    const formData = new FormData();
    formData.append("album", albumName);
    for (let i = 0; i < validFiles.length; i++) {
      formData.append("documents", validFiles[i]);
      console.log(formData, albumName)
    }

    upload(formData, albumName);
  }

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // add to an array so we can display the name of file
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);

    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e) => e.name === name
    );

    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      // update unsupportedFiles array
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const fileDrop = (e) => {
    console.log(e);
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
      handleFiles(files);
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const getAlbum = (event, { value }) => {
    console.log(value);
    let albumName = event.target.value;
    setAlbumName(value);
    console.log(albumName);
  };

  return (
    <Modal size="tiny" onClose={closeUploadModal} closeIcon open={open}>
      <Modal.Header>Upload image</Modal.Header>
      <Modal.Content>
        <Select
          onChange={getAlbum}
          selection
          value={albumName}
          placeholder="Select Album"
          options={options}
        />
        
        <div
          className="dropzone-container"
          onClick={fileInputClicked}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
          <Header as="h3" icon textAlign="center">
            <Icon name="upload" />
            Upload Images
            <Header.Subheader>
              Drag and drop files here, or click to select files to upload.
            </Header.Subheader>
          </Header>
        </div>
        {validFiles.map((data, i) => (
          <div className="file-status-bar" key={i}>
            <div>
              <div className="file-type-logo"></div>
              <div className="file-type">{fileType(data.name)}</div>
              <span className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {data.name}
              </span>
              <span className="file-size">({fileSize(data.size)})</span>{" "}
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
            </div>
            <div className="file-remove" onClick={() => removeFile(data.name)}>
              X
            </div>
          </div>
        ))}
        <Modal.Description></Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeUploadModal}>
          Cancel
        </Button>
        <Button
          disabled={unsupportedFiles.length !== 0 || validFiles.length === 0 || !albumName}
          onClick={uploadRequest}
          color="blue"
          icon
          labelPosition="left"
        >
          <Icon name="upload" />
          Upload
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default UploadModal;

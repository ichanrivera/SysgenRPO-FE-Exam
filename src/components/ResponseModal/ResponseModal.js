import React from 'react';
import { Modal, Message } from "semantic-ui-react";


const ResponseModal = ({ open, onClose, status }) => {
  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Content>
        {status === "success" ? (
          <Message icon="check" success header="Action Successful" />
        ) : (
          <Message icon="times" error header="Action Failed" />
        )}
      </Modal.Content>
    </Modal>
  );
};



export default ResponseModal;

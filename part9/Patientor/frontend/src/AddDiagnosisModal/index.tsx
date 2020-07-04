import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDiagnosisForm, { DiagnosisFormValues } from './AddDiagnosisForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DiagnosisFormValues) => void;
  error?: string;
}

const AddDiagnosisModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add Diagnosis</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddDiagnosisForm  onSubmit={onSubmit} onCancel={onClose} /> 
    </Modal.Content>
  </Modal>
);

export default AddDiagnosisModal;

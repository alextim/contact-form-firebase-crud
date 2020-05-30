import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const ControlCaption = styled.div`
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.2rem;
`;

const TextArea = styled.textarea`
  padding: 0.2rem;
`;

const FormInput = ({ title, name, type, onChange }) => (
  <StyledLabel htmlFor={name}>
    <ControlCaption>{title}</ControlCaption>
    {type === 'textarea' && <TextArea name={name} onChange={onChange} />}
    {type !== 'textarea' && <Input name={name} onChange={onChange} />}
  </StyledLabel>
);

const NewFeedItem = ({ onSave, onCancel }) => {
  const [error, setError] = useState('');
  const [edited, setEdited] = useState({
    name: '', email: '', message: '',
  });

  const onSaveHandler = async (e) => {
    e.preventDefault();
    try {
      await onSave(edited);
    } catch (err) {
      setError(err.message);
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleOnChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEdited({ ...edited, [e.target.name]: value });
    if (error) {
      setError('');
    }
  };

  return (
    <Form>
      <FormInput title="Name" name="name" onChange={handleOnChange} />
      <FormInput title="E-mail" name="email" onChange={handleOnChange} />
      <FormInput title="Message" name="message" type="textarea" onChange={handleOnChange} />
      <FormFooter>
        <button type="submit" onClick={onSaveHandler}>
          Add
        </button>
        <button type="button" onClick={onCancelHandler}>
          Cancel
        </button>
      </FormFooter>
      {error && <div>{error}</div>}
    </Form>
  );
};

NewFeedItem.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NewFeedItem;

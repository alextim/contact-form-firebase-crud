import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const dateOptions = {
  // weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
const StyledTr = styled.tr`
  &:nth-child(even){background-color: #f2f2f2};
`;

const FeedItem = ({ feed, onDelete, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    id, time, ip, name, email, message,
  } = feed;

  const [edited, setEdited] = useState({
    name, email, message,
  });

  const date = time && time.seconds ? new Date(time.seconds * 1000).toLocaleDateString('ru-RU', dateOptions) : '';

  const onDeleteHandler = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    if (!window.confirm('Do you want to delete this item')) {
      return;
    }
    try {
      await onDelete(id);
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.message);
    }
  };

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(id, { time: time || null, ip: ip || null, ...edited });
      setIsEdit(false);
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.message);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEdited({ ...edited, [e.target.name]: value });
  };

  return (
    isEdit ? (
      <StyledTr>
        <td>{id}</td>
        <td>{date}</td>
        <td>{ip}</td>
        <td><input name="name" defaultValue={feed.name} onChange={handleOnChange} /></td>
        <td><input name="email" defaultValue={feed.email} onChange={handleOnChange} /></td>
        <td><textarea name="message" defaultValue={feed.message} onChange={handleOnChange} /></td>
        <td>
          <button type="button" onClick={onUpdateHandler}>
            Update
          </button>
          <button type="button" onClick={() => setIsEdit(false)}>
            Cancel
          </button>
        </td>
      </StyledTr>
    ) : (
      <StyledTr>
        <td>{id}</td>
        <td>{date}</td>
        <td>{ip}</td>
        <td>{feed.name}</td>
        <td>{feed.email}</td>
        <td>{feed.message}</td>
        <td>
          <button type="button" onClick={() => setIsEdit(!isEdit)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onDeleteHandler}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </td>
      </StyledTr>
    )
  );
};

FeedItem.propTypes = {
  feed: PropTypes.shape({
    id: PropTypes.string,
    time: PropTypes.oneOfType([
      PropTypes.shape({
        seconds: PropTypes.number,
      }),
      PropTypes.string,
    ]),
    ip: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default memo(FeedItem);

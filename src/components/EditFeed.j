import React, { useState, useContext, useEffect } from 'react';


import { GlobalContext } from '../context/GlobalState';

const EditFeed = (route) => {
  const history = useHistory();
  const { feeds, editFeed } = useContext(GlobalContext);
  const [selectedFeed, setSeletedFeed] = useState({
    id: null, name: '', email: '', message: '',
  });
  const currentFeedId = route.match.params.id;

  useEffect(() => {
    const feedId = currentFeedId;
    const selected = feeds.find((feed) => feed.id === feedId);
    setSeletedFeed(selected);
    // eslint-disable-next-line
    }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    editFeed(selectedFeed);
    history.push('/');
  };

  // eslint-disable-next-line max-len
  const handleOnChange = (fieldName, value) => setSeletedFeed({ ...selectedFeed, [fieldName]: value });

  if (!selectedFeed || !selectedFeed.id) {
    return <div>sdf</div>;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">
            Name of employee
            <input
              type="text"
              placeholder="Enter name"
              value={selectedFeed.name}
              onChange={(e) => handleOnChange('name', e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              placeholder="Enter e-mail"
              value={selectedFeed.email}
              onChange={(e) => handleOnChange('email', e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="message">
            Message
            <input
              type="text"
              placeholder="Enter message"
              value={selectedFeed.message}
              onChange={(e) => handleOnChange('message', e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">
            Save Feed
          </button>
        </div>
        <div>
          <Link to="/">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditFeed;

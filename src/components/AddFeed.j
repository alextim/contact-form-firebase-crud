import React, { useState, useContext } from 'react';

const AddFeed = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { addFeed } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newFeed = {
      name,
      email,
      message,
    };
    addFeed(newFeed);
    history.push('/');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="name"
          >
            Name
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="email"
          >
            E-mail
            <input
              type="email"
              placeholder="Enter e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="message"
          >
            Message
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">
            Save
          </button>
        </div>
        <div><Link to="/">Cancel</Link></div>
      </form>
    </div>
  );
};

export default AddFeed;

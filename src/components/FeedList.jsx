/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Db from '../service';
import FeedItem from './FeedItem';
import NewFeedItem from './NewFeedItem';

const StyledTh = styled.th`
  padding: 0.5rem;
  color: #fff;
  background-color: #000;
`;

const Heading = () => (
  <thead>
    <tr>
      <StyledTh>ID</StyledTh>
      <StyledTh>Time</StyledTh>
      <StyledTh>IP</StyledTh>
      <StyledTh>Name</StyledTh>
      <StyledTh>E-mail</StyledTh>
      <StyledTh>Message</StyledTh>
      <StyledTh>Actions</StyledTh>
    </tr>
  </thead>
);

const FeedListing = () => {
  const [feeds, setFeeds] = useState([]);
  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const db = new Db();
      const data = await db.getAll();
      setFeeds(data || []);
    };
    fetchData();
  }, []);

  const onAddNew = async (data) => {
    try {
      const db = new Db();
      const newId = await db.add({ time: null, ...data });
      const updatedFeeds = [...feeds, { id: newId, ...data }];
      setFeeds(updatedFeeds);
      setAddMode(false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const onDelete = async (id) => {
    try {
      const db = new Db();
      await db.delete(id);
      const updatedFeeds = feeds.filter((item) => item.id !== id);
      setFeeds(updatedFeeds);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const onUpdate = async (id, data) => {
    try {
      const db = new Db();
      await db.update(id, data);
      const { name, email, message } = data;

      const index = feeds.findIndex((feed) => feed.id === id);

      const updatedFeed = {
        ...feeds[index],
        name,
        email,
        message,
      };

      const updatedFeeds = [
        ...feeds.slice(0, index),
        updatedFeed,
        ...feeds.slice(index + 1),
      ];

      setFeeds(updatedFeeds);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <>
      {addMode && <NewFeedItem onSave={onAddNew} onCancel={() => setAddMode(false)} />}
      {!addMode && (
        <>
          <button type="button" onClick={() => setAddMode(true)}>Add New</button>
          {feeds.length > 0 ? (
            <table>
              <Heading />
              <tbody>
                {feeds.map((feed) => (
                  <FeedItem key={feed.id} feed={feed} onDelete={onDelete} onUpdate={onUpdate} />
                ))}
              </tbody>
            </table>
          ) : (<p>No Data</p>)}
        </>
      )}
    </>
  );
};

export default FeedListing;

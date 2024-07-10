import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';

const Board = ({ board, token }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get(`/api/lists/${board._id}`, { headers: { Authorization: `Bearer ${token}` } });
      setLists(response.data);
    };
    fetchLists();
  }, [board._id, token]);

  return (
    <div>
      <h2>{board.title}</h2>
      {lists.map(list => (
        <List key={list._id} list={list} token={token} />
      ))}
    </div>
  );
};

export default Board;

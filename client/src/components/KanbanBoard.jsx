import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';

const KanbanBoard = ({ token }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get('/api/boards', { headers: { Authorization: `Bearer ${token}` } });
      setBoards(response.data);
    };
    fetchBoards();
  }, [token]);

  return (
    <div>
      {boards.map(board => (
        <Board key={board._id} board={board} token={token} />
      ))}
    </div>
  );
};

export default KanbanBoard;

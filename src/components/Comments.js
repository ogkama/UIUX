// Comments.js
import React, { useState, useEffect } from 'react';

const Comments = ({ filmId }) => {

  const [comments, setComments] = useState(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${filmId}`)) || [];
    return storedComments;
  });
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${filmId}`)) || [];
    setComments(storedComments);
  }, [filmId]);

  useEffect(() => {
    localStorage.setItem(`comments_${filmId}`, JSON.stringify(comments));
  }, [comments, filmId]);

  const handleAddComment = () => {
    setComments((prevComments) => [...prevComments, newComment]);
    setNewComment('');
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="">
      <h2 className="xs:text-lg md:text-2xl font-bold mb-4 xs:mt-2 md:mt-5 text-white">Comments</h2>
      {comments.length === 0 ? (
        <div className='xs:text-sm md:text-lg font-bold mt-2 text-red-300'>There are no comments here yet, you can be the first!</div>
      ) : (
      <ul className="list-none">
        {comments.map((comment, index) => (
        <div key={index} className="bg-gray-200 shadow-sm rounded-md mb-2 mt-2">
          <p className="break-words p-2 xs:text-sm md:text-md">
            {comment}
            <button
              className="ml-2 text-red-500"
              onClick={() => handleDeleteComment(index)}
            >
              Delete
          </button>
          </p>
        </div>
        ))}
      </ul>)}
      <textarea
        className="w-full resize-none border rounded p-2 mt-2"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        onClick={handleAddComment}
      >
        Add Comment
      </button>
    </div>
  );
};

export default Comments;
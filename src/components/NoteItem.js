import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { deleteNote } from "../api/notes";
import UserContext from "../context/UserContext";

const NoteItem = ({ user, title, topic, _id }) => {
  const [userr, setUserr] = useContext(UserContext);
  const handleDelete = () => {
    deleteNote(_id);
  };
  if (!userr) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="bg-gray-800 rounded-md shadow-md p-4 mb-4 text-white min-w-[300px]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-gray-400 mb-2">Created by: {user?.name}</p>
      <div className="flex flex-wrap">
        {topic?.map((topic) => (
          <span
            key={topic}
            className="inline-block bg-gray-600 text-gray-200 text-sm px-2 py-1 rounded-md mr-2 mb-2"
          >
            {topic}
          </span>
        ))}
      </div>
      <Link to={`/notes/${_id}`}>
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </Link>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors ml-14"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteItem;

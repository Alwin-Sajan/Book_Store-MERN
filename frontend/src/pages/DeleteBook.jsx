import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect((() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

      })
  }), [])

  const handleDeleteBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('An error happened. Please Check console');
      });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input type="text" value={title} disabled
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input type="text" value={author} disabled

            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input type="text" value={publishYear} disabled

            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <p>Are you sure to delete the book ?</p>
        <button className='p-2 bg-red-600 m-8 ' onClick={handleDeleteBook}>Delete</button>
      </div>
    </div>

  )
}

export default DeleteBook
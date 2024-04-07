import {useState, useEffect} from 'react';
import Snipper from '../components/Snipper';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';



const EditBook = () => {
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [publishYear, setPublishYear]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((Response)=>{
      setAuthor(Response.data.author);
      setTitle(Response.data.title);
      setPublishYear(Response.data.publishYear)
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
    })
  },[id])
  const handleEditBook=()=>{
    const data={
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/books/${id}`, data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Edited Successfully', {variant: 'success'});
      navigate('/');
    })
    .catch((error)=>{
      console.log(error);
      enqueueSnackbar('Error', {variant: 'error'});
      setLoading(false);
    })
  }
  return (
    <div className='p-4'>
    <BackButton />
    <h1 className='text-3xl my-4'>Edit Book</h1>
    {loading? <Snipper /> : ''}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl text-grey-500 mr-4'>Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
      </div>
      <div className='my-4'>
        <label className='text-xl text-grey-500 mr-4'>Author</label>
        <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
      </div>
      <div className='my-4'>
        <label className='text-xl text-grey-500 mr-4'>Publish Year</label>
        <input type="text" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>

    </div>
    </div>
  )
}

export default EditBook;
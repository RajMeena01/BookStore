import {useState} from 'react';
import BackButton from '../components/BackButton';
import Snipper from '../components/Snipper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const DeleteBook = () => {
  const[loading, setLoading]=useState(false);
  const {id}=useParams();
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();
  const handleDeleteBook=()=>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar("Deleted Succesfully", {variant: 'success'})
      navigate('/');
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
      enqueueSnackbar('Error', {variant: 'error'});
    })
  }
  return (
    <div className='p-4'>
    <BackButton />
    <h1 className='text-3xl my-4'>Delete Book</h1>
    {loading? <Snipper /> : ''}
    <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-fit p-8 mx-auto'>
      <h3 className='text-2xl'>Are You Sure You want to delete this Book?</h3>
      <button className='p-2 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>
    </div>
    </div>
  )
}

export default DeleteBook
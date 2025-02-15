import {useState} from 'react';
import Snipper from '../components/Snipper';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';



const CreateBooks = () => {
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [publishYear, setPublishYear]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();
  const handleSaveBook=()=>{
    const data={
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .post(`http://localhost:5555/books`, data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book created succesfully', {variant: 'success'});
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'});
      console.log(error);

      
    })
  }
  return (
    <div className='p-4'>
    <BackButton />
    <h1 className='text-3xl my-4'>Create Book</h1>
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
      <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>

    </div>
    </div>
  )
}

export default CreateBooks
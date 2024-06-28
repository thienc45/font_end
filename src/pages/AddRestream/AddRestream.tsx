import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { addRestrem, getDetailRetream,getRestream,uploadVideo } from '../../apis/restream.api';
import { Restream } from '../../types/retream.type';


type FormStateType = Omit<Restream, 'id'| "url">

const initTialFormStae: FormStateType = {
  gioBatDau: '',
  gioKetThuc: ''
}

export default function AddRestream() {
  const [formState, setFormState] = useState<FormStateType>(initTialFormStae)
  const [singleProgress, setSingleProgress] = useState(0);
  const [progress,setProgress] = useState(0)
  const [videos, setVideos] = useState<File | null>(null);

  const addMatch = useMatch('/addRestream')
  const isAddMode = Boolean(addMatch)
  const { id } = useParams()
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (body: FormStateType) => {
      console.log(body)
      return addRestrem(body)
    }
  })

  const handleChange = (name: keyof FormStateType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, [name]: event.target.value }))
    console.log(event.target.value)
  }
  
  const singleFileOptions = {
    onUploadProgress: (progressEvent: { loaded: any; total: any; }) => {
        const {loaded, total} = progressEvent;
        const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
        setSingleProgress(percentage);
    }
}
   

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    console.log(event.target.files[0]);
    setVideos(event.target.files[0]);
  }
};


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formState)
    mutate(formState)
  }

  useQuery({
    queryKey: ['restream', id],
    queryFn: () => getDetailRetream(id as string),
    enabled: id !== undefined,
    onSuccess: (data) => {
      console.log(data.data)
      setFormState(data.data)
    }
  })

// const createFileVideo =async  (event:React.FormEvent<HTMLFormElement> | any)=>{
//   event.preventDefault();
//   console.log(formState);
//   addRestrem(formState).then((data)=>{
//     console.log(data);
//     await   uploadVideo(videos,data.data.id,singleFileOptions)
//     console.log(data+"file------------------------------");
//     console.log(formState)
//     await  getRestream()
//     navigate("/restream"); 
//   })
// }

const createFileVideo = async (event: React.FormEvent<HTMLFormElement> | any) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  try {
    console.log(formState);

    // Gọi API để thêm restream
    const data = await addRestrem(formState);
    console.log(data);

    // Tải video lên sau khi thêm restream thành công
    await uploadVideo(videos, data.data.id, singleFileOptions);
    console.log(data + "file------------------------------");
    console.log(formState);

    // Lấy lại danh sách restream
    await getRestream();

    // Chuyển hướng tới trang "/restream"
    navigate("/restream");
  } catch (error) {
    console.error("Error creating file video: ", error);
  }
};

  return (
    <div>
      <form className='max-w-md mx-auto' onSubmit={createFileVideo}>
        <h1 className='max-w text-3xl font-extrabold dark:text-white'>{isAddMode ? "Add" : "Update"} Restream</h1>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='floating_email'
            id='floating_email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={formState?.gioBatDau}
            // onChange={event => setFormState(prev=> ({...prev, gioBatDau: event.target.value}))}
            onChange={handleChange('gioBatDau')}
          />
          <label
            htmlFor='floating_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Giờ bắt đầu
          </label>
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='floating_email'
            id='floating_email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={formState?.gioKetThuc}
            onChange={handleChange('gioKetThuc')}
          />
          <label
            htmlFor='floating_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Giờ kết thuc
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <div className='max-w-lg mx-auto'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='user_avatar'>
              Upload file
            </label>
            <input
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
              aria-describedby='user_avatar_help'
              id='user_avatar'
              // type={isAddMode? 'file':'text'}
              type={'file'}
              // value={formState?.url}
              //  onChange={event => setFormState(prev=> ({...prev, url: event.target.value}))}
              onChange={handleFileChange}
            />
            <div className='mt-1 text-sm text-gray-500 dark:text-gray-300' id='user_avatar_help'>
              A profile video is useful to confirm your are logged into your account
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { addUser, getDetailUser, updateUser } from '../../apis/author.api';
import { Author } from '../../types/author.type';

type FormUserType = Omit<Author, 'userId'> | Author
const initTialFormState: FormUserType = {
  userId: '',
  username: '',
  email: '',
  password: '',
  roles: [],
  trangThai: 1
}
export default function AddUser() {
  const queryClient = new QueryClient()

  const [formUser, setFormUser] = useState<FormUserType>(initTialFormState)
  const { id } = useParams()
  console.log(id + "+---id")
  const addMatch = useMatch('/addUser')
  const isAddMode = Boolean(addMatch)

  const handleChange = (name: keyof FormUserType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser((prev) => ({ ...prev, [name]: event.target.value }))
    console.log(event.target.value)
  }

  const { mutate } = useMutation({
    mutationFn: (body: FormUserType) => {
      console.log(body)
      return addUser(body)
    }
  })

  const updateMutation = useMutation({
    mutationFn: (_) => updateUser(formUser as Author, id as string)
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formUser)
    if (isAddMode) {
      mutate(formUser);
    } else {
      updateMutation.mutate(undefined, {
        onSuccess: (data) => {
          console.log(data)
        }
      })
    }
  }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   console.log(formUser)
  //   if (isAddMode) {
  //     addUser(formUser)
  //     alert("Add thanh cong")
  //   } else {
  //     updateUser(formUser as FormUserType as Omit<Author, 'id'>, id as string)
  //     alert("Update thanh cong")
  //   }
  // }
  // const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   console.log(value)
  //   setFormUser((prevState) => {
  //     const newRoles = prevState.roles.includes(value)
  //       ? prevState.roles.filter((role) => role !== value)
  //       : [...prevState.roles, value];
  //     console.log(value)
  //     return { ...prevState, roles: newRoles };
  //   });
  // };

 
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRole = event.target.value;
    setFormUser({
      ...formUser,
      roles: [selectedRole] // Cập nhật vai trò đã chọn, chỉ cho phép chọn một vai trò
    });
    console.log(selectedRole);
  };

  useQuery({
    queryKey: ['restream', id],
    queryFn: () => getDetailUser(id as string),
    enabled: id !== undefined,
    onSuccess: (data) => {
      console.log(data.data)
      setFormUser(data.data)
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container mx-auto'>
        <h1 className='max-w text-3xl font-extrabold dark:text-white'>{isAddMode ? "Add" : "Update"} User</h1>

        <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label htmlFor='text' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              User Name
            </label>
            <input
              value={formUser?.username}
              onChange={handleChange('username')}
              type='text'
              id='text'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              required
            />
          </div>
          <div className='mb-5'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Your email
            </label>
            <input
              value={formUser?.email}
              onChange={handleChange('email')}
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              placeholder='name@flowbite.com'
              required
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='text' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Role
            </label>
            <div className='flex'>
              <div className='flex items-center me-4'>
                <input
                onChange={handleRoleChange}
                  checked={formUser.roles.includes('admin')}
                  value={'admin'}
                  id="inline-radio"
                  type="radio"
                  defaultValue={'admin'}
                  name='inline-radio-group'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='inline-radio' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Admin
                </label>
              </div>
              <div className='flex items-center me-4'>
                <input
                  onChange={handleRoleChange}
                  checked={formUser.roles.includes('user')}
            
                  value={'user'}
                  id="inline-radio"
                  type="radio"
                  defaultValue={'user'}
                  name='inline-radio-group'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='inline-2-radio' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  User
                </label>
              </div>
            </div>
          </div>

          <div className='mb-5'>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Your password
            </label>
            <input
              value={formUser?.password}
              onChange={handleChange('password')}
              type='password'
              id='password'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              required
            />
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Register new account
          </button>
        </form>
      </div>
    </QueryClientProvider>
  )
}

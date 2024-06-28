import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { LoginReponse } from '../../types/author.type'
import { loginUser } from '../../apis/author.api'


export interface Login {
  username: string,
  password: string
}

const initTialFormLogin: Login = {
  username: '',
  password: ''
}

const initTialLoginRepond: LoginReponse = {
  token: '',
  username: '',
  email: '',
  roles: []
}

const queryClient = new QueryClient()
export default function Login() {

  const [formLogin, setFormLogin] = useState<Login>(initTialFormLogin)
  const [loginRepond, setLoginRepond] = useState<LoginReponse>(initTialLoginRepond)
  const handleInput = (name: keyof Login) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin((prev) => ({ ...prev, [name]: event.target.value }))
    console.log(event.target.value)
  }

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formLogin)
    loginUser(formLogin.password, formLogin.password)
  }

  const mu = useMutation({

  })

  
  return (
    <div>
      
        <form className="max-w-sm mx-auto" onSubmit={handleSubmitLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
            <input value={formLogin?.username} onChange={handleInput('username')} type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input value={formLogin?.password} onChange={handleInput('password')} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>
      
    </div>
  )
}


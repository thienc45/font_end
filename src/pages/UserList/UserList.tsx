import React, { useEffect, useState } from 'react'
import { Author } from '../../types/author.type'
import { getAllUser } from '../../apis/author.api';
import { Link, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';



export default function UserList() {
  const [listUser, setListUser] = useState<Author[]>([])
  const params = useParams()
  console.log(params+"00000000000000000000")

  useEffect(() => {
    getAllUser().then(data => {
      console.log(data);
      setListUser(data.data)
    })
  }, [])

  // const 



  return (


    <div className='container mx-auto'>
          <QueryClientProvider client={new QueryClient}>
      <Link to='/addUser' type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">AddUser</Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Roles
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listUser.map(user => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={user.userId}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </th>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.roles}
                </td>
                <td className="px-6 py-4">
                  {user.trangThai}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/updateUser/${user.userId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>

          </QueryClientProvider>


    </div>
 
  )
}

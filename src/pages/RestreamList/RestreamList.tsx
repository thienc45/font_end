import React, { useEffect, useState } from 'react'
import { Restream } from '../../types/retream.type'
import { deleteRetream, getRestream, playVideo } from '../../apis/restream.api'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

export default function RestreamList() {
  const [streamList, setStreamList] = useState<Restream[]>([])

  useEffect(() => {
    getRestream().then(res => {
      setStreamList(res.data)
    }).finally(() => {
    });
  }, [])

  const handleDelete = (id: number | string) => {
    deleteRetream(id)
      .then(response => {
        console.log(response);
        alert("Video deleted successfully!");
        getRestream().then(response => {
          setStreamList(response.data)
        });
      })
      .catch(error => {
   
      });
  };

  return (
    <div className='container mx-auto' >
   <Link to='/addRestream'  type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</Link>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>

              <th scope='col' className='px-6 py-3'>
                Color
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {streamList.map((stream) => (
              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700' key={stream.id}>
                <td className='px-6 py-4'>{stream.gioBatDau}</td>
                <td className='px-6 py-4'>{stream.gioKetThuc}</td>
                <td className='px-6 py-4'>{stream.url}
                    <video className="w-1/2" controls>
                      <source src={'http://localhost:8081/api/restream/' + "play/" + stream.id} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                </td>
                <td className='px-6 py-4'>
                  <button onClick={() => handleDelete(stream.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >
                    Delete
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { Await } from 'react-router-dom'
import { Restream, Restreams } from '../types/retream.type'
import http from '../utils/http'

export const getRestream = () => http.get<Restreams>('restreams')

export const getDetailRetream = (id: number |  string)=>  http.get<Restream>(`getDetail/${id}`)

export const addRestrem = (restream: Omit<Restream,'id'|'url'>)=> http.post<Restream>('/save',restream) 

export const deleteRetream = (id: number |  string)=>  http.delete<Restream>(`${id}`)
 
// upload Video File
export const uploadVideo = (video:any, id: string| number, options: any) => {
  let formData = new FormData();
  formData.append("video", video);

  return http.post(`/upload/${id}`, formData, {
    ...options,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }).then((response) => response.data);
};

export const playVideo = async (id: number | string) => {
  try {
    const response = await http.get(`/play/${id}`);
    return response.data; // Assuming your backend returns the video content directly
  } catch (error) {
    console.error('Error playing video:', error);
    throw error;
  }
};




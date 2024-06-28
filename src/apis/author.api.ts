import axios from 'axios'
import { Author, LoginReponse } from '../types/author.type'
import http from '../utils/http'
import httpUser from '../utils/httpUser'

export const getAllUser = () => httpUser.get<Author[]>('allUserAdmin')

export const addUser = (author: Omit<Author, 'userId'>) => httpUser.post('signup', author)

export const getDetailUser  = (id: string | number) => httpUser.get<Author>(`getDetail/${id}`)

export const updateUser  = (author: Omit<Author, 'id'>,id: string | number) => httpUser.post<Author>(`update/${id}`,author)

export const loginUser  = (username: string ,password: string ) => httpUser.post<LoginReponse>(`/signin`)

// export const loginUser = async (username:string, password:string) => {
//   try {
//     const response = await httpUser.post('signin', {
//       username,
//       password,
//     });
//     console.log(response.data)
//     // Xử lý dữ liệu trả về từ server
//     return response.data; // Trả về dữ liệu từ phản hồi của server

//   } catch (error) {
//     console.error('Login failed:', error);
//     throw error; // Ném lỗi để xử lý ở phía gọi loginUser nếu cần
//   }
// };






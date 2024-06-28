export interface Author {
  userId: string | number
  username: string
  email: string
  roles: string[]
  password: string
  trangThai: string | number
}

export interface LoginReponse {
  token: string
  username: string
  email: string
  roles: string[]
}

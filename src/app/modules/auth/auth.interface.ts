export type IUserLogin = {
  id: string
  password: string
}

export type IUserLoginResonse = {
  acessToken: string
  refreshToken: string
  needToChangePassword: boolean
}

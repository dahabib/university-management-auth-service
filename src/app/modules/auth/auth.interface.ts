export type IUserLogin = {
  id: string
  password: string
}

export type IUserLoginResonse = {
  accessToken: string
  refreshToken?: string
  needToChangePassword: boolean
}

export type IRefreshTokenResponse = {
  accessToken: string
}

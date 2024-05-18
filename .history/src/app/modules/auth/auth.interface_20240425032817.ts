export type ILoginUser = {
    id: string, 
    password: string
}

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
    needsPasswordChange: boolean | undefined;
};
  
export type IRefreshToken = {
    refreshToken : string
}

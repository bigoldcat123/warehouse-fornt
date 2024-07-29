/// <reference types="vite/client" />
/**
 * new config.
 */

////////////////////////////////////////////////
//com.example.demo.common.R
declare type ResponseData<T> = {
    code:string,
    message:string,
    show:boolean,
    value:T
}
//com.example.demo.common.CurrentUser
declare type UserDetail = {
    id:string
    name: string
}
//com.example.demo.common.CurrentUserVo
declare type CurrentUser = {
    token:string,
    detail:UserDetail
}

declare type DaoLoginUser = {
    username: string
    password: string
}
declare type MailLoginUser = {
    email: string
    code: string
}
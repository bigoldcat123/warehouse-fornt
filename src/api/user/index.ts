import server from '..'
const preFix = 'user'

export interface type_User {
    id?:number
    username:string
    password?:string
    name:string
    sex:string
    companyID:number
    position:string,
    phone:string
    priv:string
}

class User {
    list() {
        return server.get<ResponseData<type_User[]>>(preFix)
    }

    add(user:type_User | any) {
        return server.post<ResponseData<any>>(preFix, user)
    }

    update(user:type_User) {
        return server.put<ResponseData<any>>(preFix, user)
    }

    deleteById(id:number) {
        return server.delete<ResponseData<any>>(`${preFix}/${id}`)
    }
}

export default new User()
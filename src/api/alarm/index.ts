import server from '..'

const preFix = 'alarm'

export interface type_Alarm {
        alarm : {
                 id : number,
                 houseID : number,
                 alertPos :  string,
                 alertType :  string ,
                 alertLevel :  string ,
                 alertTime : string ,
                 handle :  string ,
                 isVerify : boolean
            },
             yuntu :  string
}

class Alarm {
    list(level?:string[],type?:string[],verify?:string[],current?:number,size?:number) {
        return server.post<ResponseData<Page<type_Alarm>>>(preFix + `/${current}/${size}`,{level,type,verify})
    }
    handle(id:number,handle:string){
        return server.put<ResponseData<any>>(preFix,{id,handle})
    }
}

export default new Alarm()
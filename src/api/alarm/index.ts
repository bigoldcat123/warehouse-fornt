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
    list(level?:string[],type?:string[]) {
        return server.post<ResponseData<type_Alarm[]>>(preFix,{level,type})
    }
    handle(id:number,handle:string){
        return server.put<ResponseData<any>>(preFix,{id,handle})
    }
}

export default new Alarm()
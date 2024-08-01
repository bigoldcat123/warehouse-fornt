import server from '..'

const preFix = 'data'
export type type_Data = {
            id : number,
             houseId : number,
             houseName : string,
             inTemperature : number,
             inHumidity : number,
             maxTemperature : number,
             minTemperature : number,
             avgTemperature : number,
             layerMax : string,
             layerMin : string,
             layerAvg : string,
             testDate : string
}

export type type_Data_Detail = {
       breed:string;

       water:string;

       keeper:string;

       inTemperature:string;

       outTemperature:string;

       inHumidity:string;

       outHumidity:string;
       entryTime:string;
       list:Array<Array<Array<string>>>
}
class Data {
    list(from?:string | null,to?:string| null,houseName?:string| null,warehouseName?:string| null) {
        return server.post<ResponseData<type_Data[]>>(preFix,{from,to,houseName,warehouseName})
    }
    getDetil(id:number) {
        return server.get<ResponseData<type_Data_Detail>>(`${preFix}/${id}`)
    }
}

export default new Data()
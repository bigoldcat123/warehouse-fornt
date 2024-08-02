import server from "..";

const preFix = 'house'
export type type_House = {
    id?:number,
    houseNo:string,
    houseName:string,
    warehouseID:number,
    houseAddr:string,
    houseType:'平房仓' | '筒仓' | string,
    z:number,
    x:number,
    y:number
    yuntu:string,
    quxian:string
}

class House  {

    list(current:number,size:number) {
        return server.get<ResponseData<Page<type_House>>>(preFix + `?current=${current}&size=${size}`)
    }
    add(house:type_House) {
        return server.post(preFix,house)
    }
    deleteById(id:number) {
        return server.delete(`${preFix}/${id}`)
    }
    update(house:type_House) {
        return server.put(preFix,house)
    }
    kv() {
        return server.get(preFix + '/kv')
    }
    findByWarehouseId(id:number) {
        return server.get(preFix + '/kv/' + id)
    }
}

export default new House()
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
}

class House  {

    list() {
        return server.get<ResponseData<type_House[]>>(preFix)
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
}

export default new House()
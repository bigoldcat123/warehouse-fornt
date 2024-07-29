import server from "..";

const preFix = 'warehouse'
export type type_WareHouse = {
    id?:number,
    warehouseNo:string,
    warehouseName:string,
    warehouseAddress:string
}
class WareHouse {
     list() {
        return server.get<ResponseData<type_WareHouse[]>>(preFix)
    }
    add(warehouse:type_WareHouse) {
        return server.post(preFix,warehouse)
    }
    deleteById(id:number) {
        return server.delete(`${preFix}/${id}`)
    }
    update(warehouse:type_WareHouse) {
        return server.put(preFix,warehouse)
    }
    kv() {
        return server.get(preFix + '/kv')
    }
}

export default new WareHouse()
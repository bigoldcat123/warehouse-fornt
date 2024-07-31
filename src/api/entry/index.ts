import server from "..";

const preFix = 'entry'

export interface type_Entry {
    id?:number
    houseID:number
    breed:string
    entryTime:string
    water:number
    stockman:number
    entryUserId:number
}

class Entry {
    list() {
        return server.get<ResponseData<type_Entry[]>>('entry')
    }

    add(entry:type_Entry | any) {
        return server.post<ResponseData<any>>(preFix, entry)
    }

    update(entry:type_Entry) {
        return server.put<ResponseData<any>>(preFix, entry)
    }

    deleteById(id:number) {
        return server.delete<ResponseData<any>>(`${preFix}/${id}`)
    }
}

export default new Entry()
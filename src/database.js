// { "users": [...] }
export class Database {
    // o caracter # torna a variavel privada
    #database = {}

    select(table) {
        const data = this.#database[table] ?? []
        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
          this.#database[table] = [data]  
        }
        return data
    }

}
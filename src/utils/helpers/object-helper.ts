export const updateObjInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    // [...state.users], // этот код и на строку ниже - идентичны (т.к. map создает новую копию массива), но тут просто копия массива, а нам нужно изменить свойство одного элемента 
    return items.map((u: any) => { // проходимся по users и идет условие
        if (u[objPropName] === itemId) { // если id user'a === id, который пришел из action, то
            return { ...u, ...newObjProps } // возвращаем КОПИЮ объектА и меняем у нее свойство followed на true
        }
        return u; // в противном случае (если id из action'a не сошелся с элементом, то просто вернуть этот элемент)
    })
}
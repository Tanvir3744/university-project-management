const pick = <T extends object, k extends keyof T> (obj:T, keys:[]) => {
    const finalObject: Partial<T> = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj.key)) {
            finalObject[key] = obj[key]
       } 
    }
}
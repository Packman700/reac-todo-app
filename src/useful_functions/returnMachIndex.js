function returnMachIndex(array, id) {
    let matchIndex = undefined
    array.map((lastObject, index) => {
        if (lastObject.id === id)
            matchIndex = index
    })

    return matchIndex
}

export {returnMachIndex}
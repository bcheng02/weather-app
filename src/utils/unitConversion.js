function celToFar(temp, bool) {
    if (bool) {
        temp = (temp * 9 / 5) + 32
    }
    return temp
}

function kmhToMph(temp, bool) {
    if (bool) {
        temp = temp / 1.6093440006147
    }
    return temp
}

export { celToFar, kmhToMph }
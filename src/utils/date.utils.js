export const formatingMonthYear = (dateData) => {

    const date = new Date(dateData)

    const month = date.toLocaleString('es-ES', { month: 'long' })
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
    const year = date.getFullYear()

    return (`${capitalizedMonth} ${year}`)
}

export const formatingYear = (dateData) => {

    const date = new Date(dateData)

    const year = date.getFullYear()

    return (`${year}`)

}

export const formatDateInput = (dateData) => {

    const date = new Date(dateData)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    return (`${year}-${month}-${day}`)

}
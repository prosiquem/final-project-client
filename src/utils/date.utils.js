export const formatingMonthYear = (dateData) => {

    const date = new Date (dateData)

    const month = date.toLocaleString('es-ES', {month: 'long'})
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
    const year = date.getFullYear()

    return (`${capitalizedMonth} ${year}`)

}
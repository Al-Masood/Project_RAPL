const getColorByRating = (rating) => {
    if (rating >= 2600) return '#ff0000'
    if (rating >= 2100) return '#ff8c00'
    if (rating >= 1900) return '#ff00ff'
    if (rating >= 1600) return '#0037ff'
    if (rating >= 1400) return '#03a89e' 
    if (rating >= 1200) return '#008000'
    return '#808080'
}

export default getColorByRating
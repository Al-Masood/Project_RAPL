const getColorByRating = (rating) => {
    if (rating >= 2600) return '#ff0000'
    if (rating >= 2100) return '#ff8c00'
    if (rating >= 1900) return '#ff00ff'
    if (rating >= 1600) return '#4169e1' 
    if (rating >= 1400) return '#20b2aa' 
    if (rating >= 1200) return '#32cd32' 
    return '#808080'
}

export default getColorByRating

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#ffffff33',
        border: '1px solid white',
        borderRadius: '5px',
        padding: '5px',
        color: 'white',
        minHeight: '40px',
        boxShadow: state.isFocused ? '0 0 0 1px #71f6ba' : 'none',
        '&:hover': {
            borderColor: '#71f6ba',
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#112233',
        borderRadius: '5px',
        border: '1px solid white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#71f6ba' : state.isFocused ? '#ffffff' : '#112233',
        color: state.isSelected ? '#000' : state.isFocused ? '#000' : 'white',
        padding: '10px',
    })
};

export default customStyles;
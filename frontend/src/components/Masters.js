import mastersData from '../data/masters.json'

const Masters= () => {
  return (
    <div className="container">
      <h1>Masters</h1>
      
      <div className="masters">
        {mastersData.masters.map((master, index) => (
          <div key={index} className="member">
            <img src={master.photoLink || 'default-photo.jpg'} alt={master.name} className="member-photo" />
            <h3>{master.name}</h3>
            <p>Handle: {master.cfHandle}</p>
            <p>Series: {master.series}</p>
            <a href={master.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masters

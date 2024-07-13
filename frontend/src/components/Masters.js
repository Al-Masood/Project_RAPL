import mastersData from '../data/masters.json';
import '../css/Masters.css'

const importImage = (imageName) => {
  try {
    return require(`../data/photos/${imageName}`);
  } catch (error) {
    return 'default-photo.jpg';
  }
}

const Masters = () => {
  return (
    <div className="container">
      <h1 className="title">Masters</h1>
      <div className="masters">
        {mastersData.masters.map((master, index) => (
          <div key={index} className="member">
            <img 
              src={importImage(master.photo)} 
              alt={master.name} 
              className="member-photo" 
            />
            <h3 className="member-name">{master.name}</h3>
            <p className="member-handle">Handle: {master.cfHandle}</p>
            <p className="member-series">Series: {master.series}</p>
            <a href={master.linkedin} target="_blank" rel="noopener noreferrer" className="member-linkedin">LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masters;

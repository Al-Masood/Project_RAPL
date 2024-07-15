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
          <div key={index} className="master">
            <img 
              src={importImage(master.photo)} 
              alt={master.name} 
              className="master-photo" 
            />
            <h3 className="master-name">{master.name}</h3>
            <p className="master-handle">{master.cfHandle}</p>
            <p className="master-roll">Roll: {master.roll}</p>
            <a href={master.linkedin} target="_blank" rel="noopener noreferrer" className="master-linkedin">LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masters;

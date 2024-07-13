import teamsData from '../data/icpcfinalist.json';
import '../css/ICPCFinalists.css';


const importImage = (imageName) => {
  try {
    return require(`../data/photos/${imageName}`);
  } catch (error) {
    return 'default-photo.jpg';
  }
}

const ICPCFinalists = () => {
  return (
    <div className="teams-container">
      {teamsData.teams.map((team, teamIndex) => (
        <div key={teamIndex} className="team">
          <h1 className="team-title">{team.finalsTitle}</h1>
          <h2 className="team-name">{team.teamName}</h2>
          <div className="team-members">
            {team.teamMembers.map((member, memberIndex) => (
              <div key={memberIndex} className="member">
                <img 
                  src={importImage(member.photo)} 
                  alt={member.name} 
                  className="member-photo" 
                />
                <h3 className="member-name">{member.name}</h3>
                <p className="member-handle">Handle: {member.cfHandle}</p>
                <p className="member-series">Series: {member.series}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-linkedin">LinkedIn</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ICPCFinalists;

import teamsData from '../data/icpcfinalist.json'

const ICPCFinalists = () => {
  return (
    <div className="teams-container">
      {teamsData.teams.map((team, teamIndex) => (
        <div key={teamIndex} className="team">
          <h2>{team.teamName || 'Team Name'}</h2>
          <div className="team-members">
            {team.teamMembers.map((member, memberIndex) => (
              <div key={memberIndex} className="member">
                <img src={member.photoLink || 'default-photo.jpg'} alt={member.name} className="member-photo" />
                <h3>{member.name}</h3>
                <p>Handle: {member.cfHandle}</p>
                <p>Series: {member.series}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ICPCFinalists;

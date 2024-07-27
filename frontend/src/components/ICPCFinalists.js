import React, { useEffect, useState } from 'react'
import axios from 'axios'
import teamsData from '../data/icpcfinalist.json'
import getColorByRating from '../components/GetColor'
import linkedinLogo from '../data/photos/linkedin.png'
import codeforcesLogo from '../data/photos/codeforces.png'
import '../css/ICPCFinalists.css'

const importImage = (imageName) => {
	try {
		return require(`../data/photos/${imageName}`)
	} catch (error) {
		return 'default-photo.jpg'
	}
}

const ICPCFinalists = () => {
	const [ratings, setRatings] = useState({})

	useEffect(() => {
		const fetchRatings = async () => {
			const handles = teamsData.teams
				.flatMap(team => team.teamMembers)
				.map(member => member.cfHandle)
				.join(';')

			try {
				const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handles}`)
				const ratingsData = response.data.result.reduce((acc, user) => {
					acc[user.handle] = user.maxRating
					return acc
				}, {})
				console.log(ratingsData)
				setRatings(ratingsData)
			} catch (error) {
				console.error('Error fetching ratings:', error)
			}
		}

		fetchRatings()
	}, [])

	return (
		<div className="teams-container">
			{teamsData.teams.map((team, teamIndex) => (
				<div key={teamIndex} className="team">
					<h1 className="finals-title">{team.finalsTitle}</h1>
					<h2 className="team-name">{team.teamName}</h2>
					<img
						src={importImage(team.teamPhoto)}
						alt={team.teamPhoto}
						className="team-photo"
					/>
					<div className="team-members">
						{team.teamMembers.map((member, memberIndex) => (
							<div key={memberIndex} className="member">
								<h3 className="member-name">{member.name}</h3>
								<a
									href={`https://codeforces.com/profile/${member.cfHandle}`}
									target="_blank" 
									rel="noopener noreferrer"
									className="member-handle"
									style={{ color: getColorByRating(ratings[member.cfHandle]) }}
								>
									<img
										src={codeforcesLogo} 
										alt="Codeforces"
										className="codeforces-logo"
									/>
									{member.cfHandle}
								</a>
								<p className="member-roll">Roll: {member.roll}</p>
								<a
									href={member.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="member-linkedin"
								>
									<img src={linkedinLogo} alt="LinkedIn" className="linkedin-logo" />
								</a>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default ICPCFinalists

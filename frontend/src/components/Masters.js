import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getColorByRating from '../components/GetColor'
import mastersData from '../data/masters.json'
import linkedinLogo from '../data/photos/linkedin.png'
import '../css/Masters.css'

const importImage = (imageName) => {
	try {
		return require(`../data/photos/${imageName}`)
	} catch (error) {
		return 'default-photo.jpg'
	}
}

const Masters = () => {
	const [ratings, setRatings] = useState({})

	useEffect(() => {
		const fetchRatings = async () => {
			const handles = mastersData.masters.map(master => master.cfHandle).join('')
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
						<a href={`codeforces.com/profile/${master.linkedin}`}
							target="_blank" rel="noopener noreferrer"
							className="master-handle"
							style={{ color: getColorByRating(ratings[master.cfHandle]) }}>
							{master.cfHandle}
						</a>
						<p className="master-max-rating">
							Max Rating: {ratings[master.cfHandle]}
						</p>
						<p className="master-roll">Roll: {master.roll}</p>
						<a href={master.linkedin} target="_blank" rel="noopener noreferrer" className="master-linkedin">
							<img src={linkedinLogo} alt="LinkedIn" className="linkedin-logo" />
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default Masters

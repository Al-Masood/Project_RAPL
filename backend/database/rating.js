const users = require('../models/users');
const axios = require('axios');

const updateRating = async () => {
    try {
        const fetchedUsers = await users.find({});
        
        if (fetchedUsers.length === 0) {
            console.log('No users found');
            return;
        }

        let apiURL = 'https://codeforces.com/api/user.info?handles=';

        for (const user of fetchedUsers) {
            const handle = user.cfHandle;
            apiURL += handle + ';';
        }

        const response = await axios.get(apiURL);
        const userData = response.data.result;

        for (const user of userData) {
            const { handle, rating, maxRating } = user;
            await users.findOneAndUpdate(
                { cfHandle: handle },
                { rating, maxRating },
                { new: true }
            );
        }
        
    } catch (error) {
        console.error('Error updating user ratings:', error);
    }
};

module.exports = updateRating;

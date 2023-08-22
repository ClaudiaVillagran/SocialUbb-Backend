const Like = require('../models/like')

const likePublication = async (publicationId) => {
    try {
        let likes = await Like.find({'publication': publicationId})
                            .select({'__v': 0, 'publication': 0, 'created_at': 0, '_id':0})
                            .exec();

        let likesClean = [];

        likes.forEach(like =>{
            likesClean.push(like.publication);
        })
        
        return {
            likes: likesClean
        }
    } catch (error) {
        return {};
    }
}

module.exports = {
    likePublication
}
const Like = require('../models/like')

const likeProject = async (projectId) => {
    try {
        let likes = await Like.find({'publication': projectId})
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
    likeProject
}
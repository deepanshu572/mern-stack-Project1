import videos from "../model/videoModel.js";

export const getAllVideos = async (req, res) => {
    try{
    const allVideos = await videos.find({});
    console.log(allVideos);
    return res.status(200).json({allVideos})
    }
    catch(error){
     console.log(error)
    }
};

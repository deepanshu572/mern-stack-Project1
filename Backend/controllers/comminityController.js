import comunityPosts from "../model/communityModel.js";

export const deleteCommunityPost = async (req,res)=>{
    try{
        const {postId} = req.params;
        const comunity = await comunityPosts.findByIdAndDelete(postId);
        if(!comunity){
            return res.status(404).json({message : "Community post not found"})
        }
        return res.status(200).json({message : "Community post deleted successfully", comunity})
    }
    catch(err){
        return res.status(400).json({message : `deleteCommunityPost error in communityController : ${err}`})
    }
}
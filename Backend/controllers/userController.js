import users from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await users.findById(req.userId).select("-password"); // select("-password") to not show password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } 
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "on getCurrentUser fnc Error fetching current user: " + error });
    }
}
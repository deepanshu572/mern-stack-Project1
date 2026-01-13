import uploadOnCloudinary from "../config/cloudinary.js";
import channels from "../model/channelModel.js";
import users from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await users
      .findById(req.userId)
      .select("-password")
      .populate("subscriptions"); // select("-password") to not show password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(req.userId);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "on getCurrentUser fnc Error fetching current user: " + error,
    });
  }
};
export const getCurrentChannel = async (req, res) => {
  try {
    const user = await users.findById(req.userId); // select("-password") to not show password
    const existChannel = await user?.channel;
    if (!existChannel) {
      return res
        .status(404)
        .json({ message: "user doesn't have any channel ! " });
    }
    const channel = await channels.findById(existChannel).populate("videos");

    if (!channel) {
      return res.status(404).json({
        message:
          "this channelId doesn't found in channels model so channel not found",
      });
    }
    // console.log(channel)

    return res.status(200).json({ channel });
  } catch (error) {
    return res.status(400).json({
      message:
        "on getCurrentchannel fnc Error fetching current channel: " + error,
    });
  }
};

export const CreateChannel = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const files = req.files;
    const userId = req.userId;

    let avatar;
    let bannerImage;

    if (files.avatar?.[0]) {
      avatar = await uploadOnCloudinary(files.avatar[0].path);
    }
    if (files.banner?.[0]) {
      bannerImage = await uploadOnCloudinary(files.banner[0].path);
    }

    const channel = await channels.create({
      name,
      description,
      avatar,
      bannerImage,
      category,
      ownerId: userId,
    });
    const user = await users.findByIdAndUpdate(
      userId,
      {
        username: name,
        image: avatar,
        channel: channel._id,
      },
      { new: true }
    );

    return res.status(200).json({ channel });
  } catch (error) {
    return res.status(400).json({ message: `somthing went wrong ! ${error}` });
  }
};
export const updateChannel = async (req, res) => {
  try {
    const { channelId, name, description, category } = req.body;
    // console.log(channelId, name, description, category, files);
    const files = req.files;
    const userId = req.userId;

    let avatar;
    let bannerImage;

    if (files.avatar?.[0]) {
      avatar = await uploadOnCloudinary(files.avatar[0].path);
    }
    if (files.banner?.[0]) {
      bannerImage = await uploadOnCloudinary(files.banner[0].path);
    }

    const channel = await channels.findByIdAndUpdate(
      channelId,
      {
        name,
        description,
        avatar,
        bannerImage,
        category,
      },
      { new: true }
    );
    const user = await users.findByIdAndUpdate(
      userId,
      {
        username: name,
        image: avatar,
      },
      { new: true }
    );

    // console.log(user);

    return res.status(200).json({ channel });
  } catch (error) {
    return res.status(400).json({ message: `somthing went wrong ! ${error}` });
  }
};

export const subscriberToggle = async (req, res) => {
  try {
    const { channelId } = req.body;
    const userId = req.userId;
    if (!channelId) {
      return res.status(400).json({ message: "channel not found!" });
    }
    const user = await users.findOne({ _id: userId });
    if (user?.subscriptions?.includes(channelId)) {
      user?.subscriptions?.pull(channelId);
      console.log("user unsubscribe");
    } else {
      user?.subscriptions?.push(channelId);
      console.log("channel subscribed");
    }
    await user.save();

    const channel = await channels.findOne({ _id: channelId });
    if (channel?.subscribers?.includes(userId)) {
      channel?.subscribers?.pull(userId);
      console.log("channel unsubscribed");
    } else {
      channel?.subscribers?.push(userId);
      console.log(" channel subscribed");
    }
    console.log(user);
    await channel.save();
    return res.status(200).json({ channel, user });
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriptionData = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      return res.status(404).json({ message: "UserID not found" });
    }
    const user = await users
      .findById(req.userId)
      .select("-password")
      
       .populate({
        path: "subscriptions",
        populate: [
          {
            path: "videos",
            populate: {
              path: "channel",
             
            },
          },
          {
            path: "shorts",
            populate: {
              path: "channel",
             
            },
          },
        ],
      });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      subscriptions: user.subscriptions,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        "on getSubscriptionData fnc Error fetching current subscription: " +
        error,
    });
  }
};

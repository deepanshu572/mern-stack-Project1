import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    var token = await jwt.sign({ userId }, process.env.JWT_TOKEN);
    return token;
  } catch (error) {
    console.log(error);
  }
};
export default genToken
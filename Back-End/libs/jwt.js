const { sign, verify } = require("jsonwebtoken");
const SECRETTOKEN = require("./secret");

const createTokens = (user) => {
    //console.log(user);
    //.log("Token Payload:", { username: user.name, id: user.id }); // Log payload
    const accessToken = sign(
        { full_name: user.full_name, user_id: user.user_id, email: user.email, phone_number: user.phone_number, profile_image: user.profile_image, role: user.role }, 
        SECRETTOKEN
    );

    return accessToken;
};


module.exports = { createTokens };

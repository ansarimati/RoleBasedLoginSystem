import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header["Authorization"];
        if (token) {
            token = token.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, valid) => {
                if (err) res.status(500).json({ msg: "Access Denied" })
                else naxt();
            })
        }
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

//  WE CAN ADD THIS MIIDLEWARE IN API WHICH ARE RESPONSIBLE FOR FURTHER FUCNTIONALITY WHICH DONE AFTER LOGIN
//  WE SEND TOKEN FROM FRONTEND LIKE "Bearer + Token"
//  AT BACKEND WE REMOVED THE WORD "Bearer" FROM TOKEN
//  VERIFY THE TOKEN IF TOKEN IS VALID THEN next() WILL ALLOW API TO RESPONSE
//  IF TOKEN NOT VALID THEN API WILL SEND A MESSAGE IN RESPONSE AS "Access Denied"

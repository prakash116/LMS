import jwt from "jsonwebtoken";
import handleError from "../error_logs/handleError.js";

function protectRoute(req, res, next) {
    const token = req.cookies.accessToken;
    if(!token){
      return handleError(res, 401, "Data kye not found");
   }
   jwt.verify(token, "secret", (err, decode) => {
     if(err){
       return handleError(res, 403, "Unauthorized access");
     }
     req.userid = decode.userid;
     next();
   })
}
export default protectRoute;
import { jwtDecode } from "jwt-decode";

export default function decodeJwt(token) {
    console.log('tokenUtils 에서 token : ', token);
    if (token === null) return null;
    return jwtDecode(token);
}

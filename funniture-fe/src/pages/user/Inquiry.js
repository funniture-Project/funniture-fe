import decodeJwt from "../../utils/tokenUtils";

function Inquiry () {
    
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log('token : ', token);
    

    return(
        <>
            <dev>
                <h1>문의 페이지</h1>
            </dev>
        </>
    );
}

export default Inquiry;
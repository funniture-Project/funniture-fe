import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailOrder() {

    const { id } = useParams(); // URL에서 주문번호를 가져옴
    const [order, setOrder] = useState(null);

    return(
        <div>
            <h1>{id}</h1>
        </div>
    );
}


export default DetailOrder
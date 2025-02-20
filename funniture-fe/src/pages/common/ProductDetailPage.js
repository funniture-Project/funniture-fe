import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailInfo } from "../../apis/ProductAPI";

function ProductDetailPage() {
    const { id } = useParams();

    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        getProductDetailInfo(id)
    }, [])

    console.log("productId : ", id)

    return (
        <div>상품 상세 페이지</div>
    )
}

export default ProductDetailPage;
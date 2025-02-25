import FaCss from './favoritesPage.module.css'

function FavoritesPage() {

    return (
        <div className={FaCss.wholeContainer}>
            <div className={FaCss.orderPageTitle}>관심 상품</div>

            <div className={FaCss.favoritesList}>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
                <div className={FaCss.favoritesItem}>
                    <div className={FaCss.imageBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={FaCss.itemInfo}>
                        <div>쿠쿠_전기밥솥</div>
                        <div>월 29000 ~</div>
                    </div>
                    <div className={FaCss.btnBox}>
                        <button>주문하기</button>
                        <button>취소하기</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FavoritesPage;
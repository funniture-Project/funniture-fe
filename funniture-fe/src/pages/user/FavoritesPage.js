import { useSelector } from 'react-redux';
import FaCss from './favoritesPage.module.css'
import { useEffect, useState } from 'react';
import { getFavoriteList } from '../../apis/FavoriteAPI';
import { useNavigate } from 'react-router-dom';

function FavoritesPage() {
    const navigate = useNavigate();

    const { user } = useSelector(state => state.member)
    const [favoriteList, setFavoriteList] = useState([])

    useEffect(() => {
        async function getDate() {
            const response = await getFavoriteList(user.memberId)

            setFavoriteList(response.result.filter(item => (item.productStatus != "판매불가")))
        }
        getDate();
    }, [user])

    useEffect(() => {
        console.log("favoriteList : ", favoriteList)
    }, [favoriteList])

    return (
        <div className={FaCss.wholeContainer}>
            <div className={FaCss.orderPageTitle}>관심 상품</div>

            <div className={FaCss.favoritesList}>
                {favoriteList.map(item => (
                    <div className={FaCss.favoritesItem}>
                        <div className={FaCss.imageBox}>
                            <img src={item.productImageLink == 'a.jpg'
                                ? require(`../../assets/images/${item.productImageLink}`)
                                : item.productImageLink}
                                alt="상품 사진" />
                        </div>
                        <div className={FaCss.itemInfo}>
                            <div>
                                <div>{item.productName}</div>
                                <div>월 {item.priceListAsIntegers[item.priceListAsIntegers.length - 1]} ~</div>
                            </div>
                            <div className={FaCss.productStatusBox}>
                                <div
                                    style={{ backgroundColor: `${item.productStatus}` == '판매종료' ? "black" : `${item.productStatus}` == "품절" ? "#fca311" : '' }}
                                    className={FaCss.productStatus}
                                >
                                    {item.productStatus}
                                </div>
                            </div>
                            <div>
                                {item.storeName}
                            </div>
                        </div>
                        <div className={FaCss.btnBox}>
                            <button onClick={() => navigate(`/${item.productNo}`)}>주문하기</button>
                            <button>취소하기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FavoritesPage;
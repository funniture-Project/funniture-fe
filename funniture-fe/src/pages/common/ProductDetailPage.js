import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailInfo } from "../../apis/ProductAPI";
import PDCSS from './productDetail.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductDetailPage() {
    const { id } = useParams();

    const [selectedTab, setSelectedTab] = useState('detailInfo');
    const [selectRentalOption, setSelectRentalOption] = useState({})
    const [selectTerm, setSelectTerm] = useState()

    const [productInfo, setProductInfo] = useState();

    const { user } = useSelector(state => state.member)

    // 렌탈 갯수
    const [rentalNum, setRentalNum] = useState(1);

    // 예약등록페이지로 데이터 보내기
    const navigate = useNavigate();

    const movePage = () => {
        navigate('/rental', {
            state: {
                selectRentalOption,
                productInfo,
                rentalNum
            },
        });
    };

    const handleChange = (e) => {
        setRentalNum(e.target.value);
    }

    useEffect(() => {
        async function getData() {
            const response = await getProductDetailInfo(id)

            // console.log("response 입니다 : ", response)
            if (response) {
                setProductInfo(response.results?.result)
                if (response.results?.result.rentalOptionList?.length > 0) {
                    setSelectRentalOption(response.results.result.rentalOptionList[0]);

                    setSelectTerm(response.results.result.rentalOptionList[0].rentalTerm)
                }
            }
        }

        getData();
    }, [id])

    useEffect(() => {
        console.log('productInfo : ', productInfo)

        if (user.memberRole == "USER") {
            let recent = localStorage.getItem("recent")
            recent = recent ? JSON.parse(recent) : []

            if (productInfo?.productNo) {
                // 중복 제거 후 배열의 맨 앞에 추가
                recent = [productInfo.productNo, ...recent.filter(no => no !== productInfo.productNo)].slice(0, 10);
            }

            // 다시 localStorage에 저장
            localStorage.setItem("recent", JSON.stringify(recent));
        }
    }, [productInfo])

    return (
        <>
            {productInfo ? (
                <div className={PDCSS.wholeContainer}>
                    {/* 상품 요약정보 */}
                    <div className={PDCSS.summaryInfoBox}>
                        <div className={PDCSS.imgBox}>
                            <img src={productInfo.productImageLink == 'a.jpg'
                                ? require(`../../assets/images/${productInfo.productImageLink}`)
                                : productInfo.productImageLink}
                                alt="상품 사진" />
                        </div>
                        <div className={PDCSS.summaryInfo}>
                            <div className={PDCSS.productNoBox}>
                                <div>{productInfo?.productNo}</div>
                                <div>{productInfo?.ownerInfo.storeName}</div>
                            </div>

                            <div className={PDCSS.productNameBox}>
                                <div>{productInfo?.productName}</div>
                                <div>
                                    <div>❤️</div>
                                    <div>🔗</div>
                                </div>
                            </div>

                            <div className={PDCSS.categoryInfoBox}>
                                <div>
                                    <div>제품분류</div>
                                    <div>{productInfo?.category.refCategoryCode == 1 ? '가전' : '가구'}</div>
                                </div>
                                <div>
                                    <div>카테고리</div>
                                    <div>{productInfo?.category.categoryCode}</div>
                                </div>
                                <div>
                                    <div>A/S횟수</div>
                                    <div>{selectRentalOption?.asNumber}</div>
                                </div>
                            </div>

                            <div className={PDCSS.priceBox}>
                                <div>
                                    <div>정상 구매가 : </div>
                                    <div>{productInfo?.regularPrice} <span>원</span></div>
                                </div>

                                <div>
                                    <div>렌탈가 : </div>
                                    <div><span>월</span> {selectRentalOption?.rentalPrice} <span>원</span></div>
                                </div>
                            </div>

                            <div className={PDCSS.rentalCondition}>
                                <div>
                                    <div>약정기간</div>
                                    <div>
                                        {productInfo?.rentalOptionList.length > 0 ?
                                            productInfo.rentalOptionList.map(option => (
                                                <>
                                                    <input type="radio" name="rentalTerm" id={option.rentalTerm} value={option.rentalTerm}
                                                        checked={selectTerm == `${option.rentalTerm}` ? true : false}
                                                        onChange={(e) => { setSelectTerm(e.target.value); setSelectRentalOption(option) }}
                                                    />
                                                    <label htmlFor={option.rentalTerm}>{option.rentalTerm}개월</label>
                                                </>
                                            )) : <div>대여 조건이 없습니다.</div>}
                                    </div>
                                </div>

                                <div>
                                    <div>갯수</div>
                                    <div>
                                        <input type="number" min={1} max={10} defaultValue={1} value={rentalNum} onChange={handleChange} />
                                        <span>개</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button onClick={movePage}>예약하기</button>
                            </div>
                        </div>
                    </div>

                    {/* 변환 탭 */}
                    <div className={PDCSS.tabsBox}>
                        <input type="radio" name="detailTab" id="detailInfo"
                            checked={selectedTab == "detailInfo" ? true : false}
                            onChange={() => { setSelectedTab('detailInfo') }}
                        />
                        <label htmlFor="detailInfo">상세보기</label>

                        <input type="radio" name="detailTab" id="productReview"
                            checked={selectedTab == "productReview" ? true : false}
                            onChange={() => { setSelectedTab('productReview') }}
                        />
                        <label htmlFor="productReview">상품평(2)</label>

                        <input type="radio" name="detailTab" id="productInquiry"
                            checked={selectedTab == "productInquiry" ? true : false}
                            onChange={() => { setSelectedTab('productInquiry') }}
                        />
                        <label htmlFor="productInquiry">상품문의</label>
                    </div>

                    {/* 제공자 정보 */}
                    <div className={PDCSS.ownerInfo}>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>상품정보</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <div className={PDCSS.descriptionTitle}>브랜드명 : </div>
                                        <div>{productInfo.ownerInfo.storeName}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={PDCSS.descriptionTitle}>상품 번호 : </div>
                                        <div>{productInfo.productNo}</div>
                                    </td>
                                    <td>
                                        <div className={PDCSS.descriptionTitle}>모델 명 : </div>
                                        <div>{productInfo.productName}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>담당자 정보</th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={PDCSS.descriptionTitle}>사업자 번호 : </div>
                                        <div>{productInfo.ownerInfo.storeNo}</div>
                                    </td>
                                    <td>
                                        <div className={PDCSS.descriptionTitle}>주소(문의 번호로 변경 예정) : </div>
                                        <div>{productInfo.ownerInfo.storeAdress}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 상품 상세 정보 */}
                    <div className={PDCSS.productDetailInfo} dangerouslySetInnerHTML={{ __html: productInfo.productContent }}>
                    </div>
                </div>
            ) : <div>상품을 찾을 수 없습니다.</div>}
        </>
    )
}

export default ProductDetailPage;
import { useCallback, useEffect, useRef, useState } from 'react';
import OwRegisterCss from './ownerRegister.module.css'
import { getSubAllCategory, registerProduct } from '../../apis/ProductAPI';
import { useSelector } from 'react-redux';

function OwnerRegister() {
    const { user } = useSelector(state => state.member)

    const [productName, setProductName] = useState('');
    const [refCategory, setRefCategory] = useState(1)

    const [allCategoryList, setAllCategoryList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [sendFormData, setSendFormData] = useState({
        productName: '',
        ownerNo: '',
        totalStock: 0,
        categoryCode: 1,
        regularPrice: 1,
        productContent: null
    })
    const [productImage, setProductImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rentalOptions, setRentalOptions] = useState([]);

    // 전체 카테고리 데이터 부르기 
    useEffect(() => {
        async function getData() {
            const response = await getSubAllCategory()

            setAllCategoryList(response?.results.result)

            const ho = response?.results.result.filter(category => category.refCategoryCode == refCategory)
            setCategoryList(ho)
        }

        getData()
    }, [])

    // 하위 카테고리 세팅
    useEffect(() => {
        settingCategoryList();
    }, [refCategory])

    function settingCategoryList() {
        const filtered = allCategoryList.filter(category => category.refCategoryCode == refCategory)
        setCategoryList(filtered)
    }

    // 등록 이미지 미리보기
    function showImg(e) {
        let file = e.target.files[0]
        if (!file) return;

        const imgShowBox = document.getElementById("imgShowBox")

        let reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file)
            setProductImage(file)
        }

        reader.onload = (e) => {
            console.log("e.target : ", e.target)
            imgShowBox.style.backgroundImage = `url(${e.target.result})`

            // setUploadImg64(reader.result); // Base64로 변환된 데이터 저장
        }
    }

    const rentalContainerRef = useRef(null); // 📌 옵션 리스트를 감싸는 div 참조

    // 옵션 추가
    function addRentalOption() {
        const newItem = document.createElement('div');
        newItem.className = OwRegisterCss.RentalInfoItem;
        newItem.setAttribute('name', 'rentalInfoItem')

        newItem.innerHTML = `
            <div class=${OwRegisterCss.rentalTerm}>
                <select name="rentalTerm" id="rentalTerm" >
                    <option value="1">1개월</option>
                    <option value="3">3개월</option>
                    <option value="9">9개월</option>
                    <option value="12">12개월</option>
                    <option value="24">24개월</option>
                    <option value="36">36개월</option>
                </select>
            </div>
            <div class=${OwRegisterCss.rentalCost}>
                <input type="number" min=0 value=0 name='rentalPrice'/>
                <div>원</div>
            </div>
            <div class=${OwRegisterCss.rentalAS} >
                <input type="number" min=0 value=0 name='asNum' />
                <div>번</div>
            </div>
            <div class="${OwRegisterCss.removeBtn} removeBtnEvent">
                <button>-</button>
            </div>
        `

        newItem.querySelector(".removeBtnEvent").addEventListener("click", () => {
            rentalContainerRef.current.removeChild(newItem);
        })

        rentalContainerRef.current.appendChild(newItem);
    }

    // form제출
    const submitForm = useCallback((e) => {
        e.preventDefault();
        console.log("submitForm : 실행")

        const formData = new FormData(e.target)

        setSendFormData(prev => ({
            ...prev,
            productName: formData.get("productName").trim(),
            ownerNo: user.memberId,
            totalStock: parseInt(formData.get("totalStock")),
            categoryCode: parseInt(formData.get("categoryCode")),
            regularPrice: parseInt(formData.get("regularPrice")),
            productContent: formData.get("productContent"),
        }))

        const rentalOptionList = document.querySelectorAll("div[name='rentalInfoItem']")
        console.log("rentalOptionList : ", rentalOptionList)

        const options = []
        rentalOptionList.forEach(option => {
            const rentalOption = {
                rentalTerm: parseInt(option.querySelector("[name='rentalTerm']").value),
                rentalPrice: parseInt(option.querySelector("[name='rentalPrice']").value),
                asNumber: parseInt(option.querySelector("[name='asNum']").value),
            }

            options.push(rentalOption)
        })

        setRentalOptions(options)
    }, [isSubmitting])

    useEffect(() => {
        if (isSubmitting && rentalOptions.length) {
            registerProduct(sendFormData, rentalOptions, productImage)
            setIsSubmitting(false)
        }
    }, [rentalOptions])

    useEffect(() => {
        console.log("sendFormData : ", sendFormData)
        console.log("rentalOptions : ", rentalOptions)
    }, [sendFormData])

    return (
        <div className={OwRegisterCss.wholeContainer}>
            <form onSubmit={submitForm}>

                {/* 상품명 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.InfoInputTitle}>노출 상품명</div>
                    <div className={OwRegisterCss.description}>사용자에게 노출되는 상품명 입니다.</div>
                    <div className={OwRegisterCss.productNameBox}>
                        <input name="productName" value={productName} type="text" maxLength={20} onChange={(e) => { setProductName(e.target.value) }} />
                        <div>
                            <div>{productName.length}</div>
                            <div>/ 20</div>
                        </div>
                    </div>
                </div>

                {/* 카테고리 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.InfoInputTitle}>카테고리</div>
                    <div className={OwRegisterCss.description}>필터링에 사용되는 카테고리 입니다.</div>
                    <div className={OwRegisterCss.productCategoryBox}>
                        <select
                            name="refCategory"
                            id="refCategory"
                            value={refCategory}
                            onChange={(e) => setRefCategory(Number(e.target.value))}
                        >
                            <option value="1">가전</option>
                            <option value="2">가구</option>
                        </select>
                        <select name="categoryCode" id="categoryCode">
                            {categoryList.map(category => <option value={category.categoryCode}>{category.categoryName}</option>)}
                        </select>
                    </div>
                </div>

                {/* 대표 이미지 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.InfoInputTitle}>대표이미지</div>
                    <div className={OwRegisterCss.description}>사용자에게 가장먼저 노출되는 상품 사진입니다.</div>
                    <div className={OwRegisterCss.productImgBox}>
                        <div id='imgShowBox'></div>
                        <input type="file" id='uploadImg' name='uploadImg' onChange={(e) => showImg(e)} />
                        <label htmlFor="uploadImg">파일선택</label>
                    </div>
                </div>

                {/* 정상 구매가 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.InfoInputTitle}>정상 구매가</div>
                    <div className={OwRegisterCss.description}>일반적으로 구매했을 때의 가격을 작성해주세요</div>
                    <div className={OwRegisterCss.productPriceBox}>
                        <input type="number" min={0} defaultValue={1} name='regularPrice' />
                        <div>원</div>
                    </div>
                </div>

                {/* 가격 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.OptionPriceTop}>
                        <div>
                            <div className={OwRegisterCss.InfoInputTitle}>가격</div>
                            <div className={OwRegisterCss.description}>렌탈 기간에 따른 가격을 작성해주세요</div>
                        </div>
                        <button onClick={addRentalOption}>추가하기</button>
                    </div>
                    <div className={OwRegisterCss.productRentalOptionBox} ref={rentalContainerRef}>
                        <div className={`${OwRegisterCss.RentalInfoItem} ${OwRegisterCss.RentalInfoItemTitle}`}>
                            <div className={OwRegisterCss.rentalTerm}>기간</div>
                            <div className={OwRegisterCss.rentalCost}>가격</div>
                            <div className={OwRegisterCss.rentalAS}>A/S 가능 횟수</div>
                            <div className={OwRegisterCss.removeBtn}></div>
                        </div>
                        <div className={`${OwRegisterCss.RentalInfoItem}`} name="rentalInfoItem">
                            <div className={OwRegisterCss.rentalTerm}>
                                <select name="rentalTerm" id="rentalTerm" >
                                    <option value="1">1개월</option>
                                    <option value="3">3개월</option>
                                    <option value="9">9개월</option>
                                    <option value="12">12개월</option>
                                    <option value="24">24개월</option>
                                    <option value="36">36개월</option>
                                </select>
                            </div>
                            <div className={OwRegisterCss.rentalCost}>
                                <input type="number" min={0} defaultValue={0} name='rentalPrice' />
                                <div>원</div>
                            </div>
                            <div className={OwRegisterCss.rentalAS}>
                                <input type="number" min={0} defaultValue={0} name='asNum' />
                                <div>번</div>
                            </div>
                            <div className={OwRegisterCss.removeBtn}>
                                <button style={{ opacity: "0" }}>-</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 상세 설명 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.InfoInputTitle}>상세 설명</div>
                    <div className={OwRegisterCss.description}>상품에 대한 설명을 작성해주세요.</div>
                    <div className={OwRegisterCss.productDescriptionBox}>
                        <textarea name="productContent" id="productContent">
                        </textarea>
                    </div>
                </div>

                {/* 재고 */}
                <div className={OwRegisterCss.productInfoInput}>
                    <div className={OwRegisterCss.InfoInputTitle}>재고</div>
                    <div className={OwRegisterCss.description}>필터링에 사용되는 카테고리 입니다.</div>
                    <div className={OwRegisterCss.productCategoryBox}>
                        <div className={OwRegisterCss.stockBox}>
                            <input type="number" min={0} defaultValue={1} name='totalStock' />
                            <div>개</div>
                        </div>
                    </div>
                </div>

                <div className={OwRegisterCss.submitBtnBox}>
                    <button type='submit' onClick={() => { setIsSubmitting(true) }}>등록하기</button>
                </div>
            </form>
        </div >
    )

}

export default OwnerRegister;
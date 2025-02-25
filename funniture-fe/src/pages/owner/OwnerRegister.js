import { useCallback, useEffect, useRef, useState } from 'react';
import OwRegisterCss from './ownerRegister.module.css'
import { getSubAllCategory, modifyProductInfo, registerProduct } from '../../apis/ProductAPI';
import { useDispatch, useSelector } from 'react-redux';
import BtnModal from '../../component/BtnModal';
import { useLocation, useNavigate } from 'react-router-dom';

function OwnerRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.member)
    const { loading, error, msg } = useSelector(state => state.product)
    const [showBtnModal, setShowBtnModal] = useState(false)

    const [productName, setProductName] = useState('');
    const [refCategory, setRefCategory] = useState(1)
    const [categoryCode, setCategoryCode] = useState(null);

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
    const [rentalOptions, setRentalOptions] = useState([
        {
            rentalInfoNo: null,
            rentalTerm: 1,
            rentalPrice: 0,
            asNumber: 0,
        }
    ]);
    // const rentalContainerRef = useRef(null); // 📌 옵션 리스트를 감싸는 div 참조

    const [modalMSg, setModalMSg] = useState('')

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
    }, [refCategory, allCategoryList])

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
        }
    }


    // 옵션 추가
    function addRentalOption() {
        const newOption = {
            rentalInfoNo: null,
            rentalTerm: 1,
            rentalPrice: 0,
            asNumber: 0
        }

        setRentalOptions(prev => [...prev, newOption]);
    }

    // 옵션 삭제
    function removeOption(indexToRemove) {
        // setRentalOptions((prevOptions) =>
        //     prevOptions.filter((_, index) => index !== indexToRemove)
        // );

        setRentalOptions(prevOptions => {
            const newOptions = [...prevOptions];  // 깊은 복사
            newOptions.splice(indexToRemove, 1);  // 해당 index 삭제
            return newOptions;
        });
    }

    // 옵션 변경 핸들러
    function handleOptionChange(index, field, value) {
        const updatedOptions = rentalOptions.map((option, i) =>
            i === index ? { ...option, [field]: value } : option
        );
        setRentalOptions(updatedOptions);
    }

    useEffect(() => {
        console.log("변경된 rentalOptions (비동기 체크):", rentalOptions);
    }, [rentalOptions]);


    // form제출
    const submitForm = useCallback((e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        // 예외처리

        // 상품명
        if (formData.get("productName").trim() < 1 || formData.get("productName").trim() > 30) {
            setShowBtnModal(true)
            setModalMSg("상품명은 1글자 이상 20글자 이하로 작성해주셔야 합니다.")
            return;
        }

        // 렌탈 가격
        const zeroPrice = rentalOptions.some((option) => option.rentalPrice <= 0);
        if (zeroPrice) {
            setShowBtnModal(true)
            setModalMSg("렌탈가는 0원으로 설정될 수 없습니다.")
            return;
        }

        // 재고
        const totalStockInput = document.querySelector("input[name = 'totalStock']")

        if (totalStockInput.value <= 0) {
            setShowBtnModal(true)
            setModalMSg("초기 재고는 1개 이상이여야합니다.")
            return;
        }

        // 보낼 데이터 생성
        setSendFormData(prev => ({
            ...prev,
            productName: formData.get("productName").trim(),
            ownerNo: user.memberId,
            totalStock: parseInt(formData.get("totalStock")),
            categoryCode: parseInt(formData.get("categoryCode")),
            regularPrice: parseInt(formData.get("regularPrice")),
            productContent: formData.get("productContent"),
        }))
    }, [isSubmitting])

    useEffect(() => {
        if (isSubmitting && rentalOptions.length) {
            // 상품 정보 수정정
            if (editProduct) {
                (async () => {

                    console.log("수정하러 출발!!!!!!!!!!!")

                    console.log("전달 전의 수정 sendFormData : ", sendFormData)
                    console.log("전달 전의 수정 rentalOptions : ", rentalOptions)
                    console.log("전달전의 productImage : ", productImage)

                    try {
                        const response = await modifyProductInfo({ dispatch, formData: sendFormData, rentalOptions, productImage, productNo: editProduct.productNo })

                        if (response?.httpStatusCode == 204) {
                            navigate("/owner/product")
                        }
                    } catch (error) {
                        console.log("error 발생 : ", error)
                        console.log("error.data : ", error.data)
                        // error = error.data.errors[0].defaultMessage;  // msg 값을 직접 변경
                    } finally {
                        setIsSubmitting(false)
                    }
                })

                    ();
            } else {
                // 새롭게 등록록
                (async () => {
                    console.log("등록하러 출발!!!!!!!!!!!")
                    try {
                        const response = await registerProduct(dispatch, sendFormData, rentalOptions, productImage)

                        console.log("response : ", response)

                        // 등록 성공
                        if (response.httpStatusCode == 201) {
                            setSendFormData(prev => ({
                                ...prev,
                                productName: '',
                                totalStock: 0,
                                categoryCode: 1,
                                regularPrice: 1,
                                productContent: null
                            }))

                            const inputList = document.querySelectorAll("input")
                            inputList.forEach(tag => {
                                if (tag.name == 'uploadImg') {
                                    tag.value = null
                                } else {
                                    tag.value = 1
                                }
                            })

                            setProductName('')
                            setProductImage(null)
                            setRefCategory(1)
                            setRentalOptions([
                                {
                                    rentalInfoNo: null,
                                    rentalTerm: 1,
                                    rentalPrice: 0,
                                    asNumber: 0,
                                }
                            ])

                            const selectOption = document.querySelectorAll("select")

                            selectOption.forEach(select => {
                                if (select.name == "categoryCode") {
                                    select.value = 3
                                } else {
                                    select.value = 1
                                }
                            })

                            const description = document.querySelector("textarea")
                            description.value = ''

                            // 이미지 미리보기 비우기기
                            const imgShowBox = document.getElementById("imgShowBox")
                            imgShowBox.style.backgroundImage = null

                        }
                    } catch (error) {
                        console.log("error 발생 : ", error)
                        console.log("error.data.errors[0].defaultMessage; : ", error.data.errors[0].defaultMessage)
                        error = error.data.errors[0].defaultMessage;  // msg 값을 직접 변경
                    } finally {
                        setIsSubmitting(false)
                        setShowBtnModal(true)
                    }
                })
                    ();
            }
        }
    }, [sendFormData])

    useEffect(() => {
        console.log("modalMSg : ", modalMSg)
        console.log("sendFormData : ", sendFormData)
    }, [sendFormData, modalMSg])

    useEffect(() => {
        console.log("loading 변경 입니다. : ", loading)
        console.log("msg : ", msg)
        console.log("error : ", error)
        if (!loading) {
            setModalMSg(msg.trim() != '' ? msg : error)
        }
    }, [loading])

    // 여기서 부터 수정 관련
    const location = useLocation();

    const editProduct = location.state?.product;
    console.log("location.state.product : ", location.state?.product)

    useEffect(() => {
        if (editProduct) {
            setSendFormData(({
                productName: editProduct.productName,
                totalStock: editProduct.totalStock,
                categoryCode: editProduct.category.categoryCode,
                regularPrice: editProduct.regularPrice,
                productContent: editProduct.productContent
            }))

            setProductName(editProduct.productName)
            setProductImage(null)
            setRentalOptions(editProduct.rentalOptionList.filter(option => option.active == true))

            const inputList = document.querySelectorAll("input")
            inputList.forEach(tag => {
                if (tag.name == "regularPrice") {
                    tag.value = editProduct.regularPrice
                } else if (tag.name == "totalStock") {
                    tag.value = editProduct.totalStock
                }
            })

            setRefCategory(editProduct.category.refCategoryCode)
            setCategoryCode(editProduct.category.categoryCode)


            const description = document.querySelector("textarea")
            if (description) {
                description.value = editProduct.productContent;
            }

            // 이미지 미리보기
            const imgShowBox = document.getElementById("imgShowBox")
            if (imgShowBox) {
                imgShowBox.style.backgroundImage = editProduct.productImageLink == 'a.jpg'
                    ? null
                    : `url(${editProduct.productImageLink})`
            }
        }
    }, [editProduct])

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
                            <option value="1" >가전</option>
                            <option value="2" >가구</option>
                        </select>
                        <select name="categoryCode" id="categoryCode" value={categoryCode} onChange={(e) => { setCategoryCode(e.target.value) }}>
                            {categoryList.map(category => <option value={category.categoryCode} name="categoryCode">
                                {category.categoryName}
                            </option>)}
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
                        <input type="number" min={1} defaultValue={1000} name='regularPrice' />
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
                    <div className={OwRegisterCss.productRentalOptionBox}>
                        <div className={`${OwRegisterCss.RentalInfoItem} ${OwRegisterCss.RentalInfoItemTitle}`}>
                            <div className={OwRegisterCss.rentalTerm}>기간</div>
                            <div className={OwRegisterCss.rentalCost}>가격</div>
                            <div className={OwRegisterCss.rentalAS}>A/S 가능 횟수</div>
                            <div className={OwRegisterCss.removeBtn}></div>
                        </div>
                        {/* 수정일 경우 */}
                        {editProduct && rentalOptions.length >= 1 ? (
                            rentalOptions.map((option, index) => (
                                <div className={`${OwRegisterCss.RentalInfoItem}`} name="rentalInfoItem"
                                    key={option.rentalInfoNo || `option-${index}`} data-rental-info-no={option.rentalInfoNo}>
                                    <div className={OwRegisterCss.rentalTerm}>
                                        <select name="rentalTerm" id="rentalTerm" value={option.rentalTerm}
                                            onChange={(e) => handleOptionChange(index, "rentalTerm", e.target.value)}
                                        >
                                            <option value="1">1개월</option>
                                            <option value="2">2개월</option>
                                            <option value="3">3개월</option>
                                            <option value="4">4개월</option>
                                            <option value="5">5개월</option>
                                            <option value="6">6개월</option>
                                            <option value="7">7개월</option>
                                            <option value="8">8개월</option>
                                            <option value="9">9개월</option>
                                            <option value="10">10개월</option>
                                            <option value="11">11개월</option>
                                            <option value="12">12개월</option>
                                            <option value="24">24개월</option>
                                            <option value="36">36개월</option>
                                        </select>
                                    </div>
                                    <div className={OwRegisterCss.rentalCost}>
                                        <input type="number" min={0}
                                            name='rentalPrice' value={option.rentalPrice}
                                            onChange={(e) => handleOptionChange(index, "rentalPrice", e.target.value)}
                                        />
                                        <div>원</div>
                                    </div>
                                    <div className={OwRegisterCss.rentalAS}>
                                        <input type="number" min={0}
                                            name='asNum' value={option.asNumber}
                                            onChange={(e) => handleOptionChange(index, "asNumber", e.target.value)}
                                        />
                                        <div>번</div>
                                    </div>
                                    <div className={OwRegisterCss.removeBtn}
                                        onClick={() => removeOption(index)}>
                                        <button>-</button>
                                    </div>
                                </div>
                            ))
                        ) :
                            (
                                rentalOptions.map((option, index) => (
                                    <div className={`${OwRegisterCss.RentalInfoItem}`} name="rentalInfoItem">
                                        <div className={OwRegisterCss.rentalTerm}>
                                            <select name="rentalTerm" id="rentalTerm" value={option.rentalTerm} onChange={(e) => handleOptionChange(index, "rentalTerm", e.target.value)}>
                                                <option value="1">1개월</option>
                                                <option value="3">3개월</option>
                                                <option value="9">9개월</option>
                                                <option value="12">12개월</option>
                                                <option value="24">24개월</option>
                                                <option value="36">36개월</option>
                                            </select>
                                        </div>
                                        <div className={OwRegisterCss.rentalCost}>
                                            <input type="number" min={0} value={option.rentalPrice}
                                                name='rentalPrice' onChange={(e) => handleOptionChange(index, "rentalPrice", e.target.value)} />
                                            <div>원</div>
                                        </div>
                                        <div className={OwRegisterCss.rentalAS}>
                                            <input type="number" min={0} value={option.asNumber}
                                                name='asNum'
                                                onChange={(e) => handleOptionChange(index, "asNumber", e.target.value)} />
                                            <div>번</div>
                                        </div>
                                        <div className={OwRegisterCss.removeBtn}>
                                            <button disabled={index > 0 ? false : true} style={{ opacity: index > 0 ? "1" : "0" }} onClick={() => removeOption(index)}>-</button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
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
                            <input type="number" min={1} defaultValue={1} name='totalStock' />
                            <div>개</div>
                        </div>
                    </div>
                </div>

                <div className={OwRegisterCss.submitBtnBox}>
                    {editProduct
                        ? <button type='submit' onClick={() => { setIsSubmitting(true) }}>저장하기</button>
                        : <button type='submit' onClick={() => { setIsSubmitting(true) }}>등록하기</button>
                    }
                </div>
            </form>

            <BtnModal
                showBtnModal={showBtnModal}
                setShowBtnModal={setShowBtnModal}
                btnText="확인"
                modalContext={modalMSg}
            />
        </div >
    )

}

export default OwnerRegister;
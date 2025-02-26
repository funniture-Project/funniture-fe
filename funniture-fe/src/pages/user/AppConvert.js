import OrdersCss from './orders.module.css';
// import './editsInfo.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decodeJwt from '../../utils/tokenUtils';
import { callLoginAPI, callRegisterOwnerAPI } from '../../apis/MemberAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import {  callChangeImageAPI } from '../../apis/MemberAPI';
import basicImage from '../../assets/images/Adobe Express - file.png'
import { resetMember } from '../../redux/modules/MemberModule';
import BtnModal from '../../component/BtnModal';

function AppConvert() {

    const member = useSelector(state => state.member);
    console.log('member : ', member);
    console.log('member.user : ', member.user);
    console.log('member.user.address : ', member.user.address);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showImageErrorModal , setShowImageErrorModal] = useState(false); // 변경할 이미지 선택 안 하고 누를때
    const [showImageSuccessModal , setShowImageSuccessModal] = useState(false);

    const [form, setForm] = useState({
        storeName: '',
        bank: '',
        account: '',
        storaImage: '',
        storeNo: '',
        storeAdress: '',
        storePhone: '',
        attechmentLink: ''
    });

    const [previewImage , setPreviewImage] = useState(basicImage);

    const onChangeHandler = (e) => {
        setForm({
            ...form, // 기존 상태를 복사
            [e.target.name]: e.target.value // 변경된 필드만 업데이트
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // 사용자가 선택한 파일 가져오기
        console.log('선택된 파일:', file);
    
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); // 미리보기용 URL 생성
            setForm({
                ...form,
                storaImage: file, // 선택한 파일 객체를 form 상태에 저장
            });
        } else {
            setForm({
                ...form,
                storaImage: '', // 파일이 선택되지 않은 경우 빈 문자열로 설정
            });
        }
    
        e.target.value = ''; // 입력 필드 초기화 (같은 파일 다시 선택 가능)
    };
    
    
    const imageOnClickHandler = () => {
        console.log('imageOnClickHandler 호출됨');
        console.log('현재 form.imageLink 값:', form.storaImage);
    
        if (!form.storaImage || !(form.storaImage instanceof File)) {
            console.log('조건 만족: !form.imageLink 또는 form.imageLink가 File 객체가 아님');
            setShowImageErrorModal(true); // 오류 모달 표시
            return;
        }
    
        console.log('파일이 선택되었습니다:', form.storaImage);
        dispatch(callChangeImageAPI({
            memberId: member.user.memberId,
            storaImage: form.storaImage,
        }));
        setShowImageSuccessModal(true);
    };

    const registerOnClickHandler = () => {
        dispatch(callRegisterOwnerAPI({
            storeName: form.storeName,
            bank: form.bank,
            account: form.account,
            storaImage: form.storaImage,
            storeNo: form.storeNo,
            storeAdress: form.storeAdress,
            storePhone: form.storePhone,
            attechmentLink: form.attechmentLink
        }));
        alert('제공자 신청이 완료되었습니다.'); // 일단 얼러트
    }

    return (
        <>
            <div className={OrdersCss.ordersContainer}>
                <div className={OrdersCss.orderPageTitle}>제공자 전환</div>
                <div className="editMypageInfo">

                    <div>
                        <span>사업체명 *</span>
                        <input
                            type="text"
                            name="storeName"
                            value={form.storeName || ''}
                            onChange={onChangeHandler}
                            placeholder='사업장의 이름을 입력해 주세요.' />
                    </div>
                    <div>
                        <span>은행 정보 *</span>
                        <select
                            type="select"
                            name="bank"
                            value={form.bank || ''}
                            onChange={onChangeHandler} >
                                <option>하나은행</option>
                                <option>신한은행</option>
                                <option>우리은행</option>
                                <option>농협은행</option>
                        </select>
                    </div>
                    <div>
                        <span>계좌 번호 *</span>
                        <input
                            type="text"
                            name="account"
                            value={form.account || ''}
                            onChange={onChangeHandler}
                            placeholder="계좌 번호를 - 포함하여 입력해 주세요."
                        />
                    </div>
                    <div className='basicImage'>
                        <span>대표 사진 * </span>
                    {/* previewImage 상태를 src로 설정 */}
                        <img src={previewImage} alt="프로필 미리보기" style={{ width: '150px', height: '150px' }} />
                                <input
                                    type="file"
                                    id='uploadImg'
                                    name='uploadImg'
                                    onChange={handleImageChange}
                                    style={{display:'none'}}/>
                                <label className='uploadLabel'
                                htmlFor="uploadImg">파일선택</label>
                        <button onClick={imageOnClickHandler}>프로필 사진 변경</button>
                    </div>
                    <div>
                        <span>사업자 번호 *</span>
                        <input
                            type="text"
                            name="storeNo"
                            value={form.storeNo || ''}
                            onChange={onChangeHandler}
                            placeholder="사업자 번호를 - 포함하여 입력해 주세요."
                        />
                    </div>
                    <div>
                        <span>사업장 주소 *</span>
                        <input
                            type="text"
                            name="storeAdress"
                            value={form.storeAdress}
                            onChange={onChangeHandler}
                            placeholder="사업장이 위치한 주소를 입력해 주세요."
                        />
                    </div>
                    <div>
                        <span>사업장 전화번호 *</span>
                        <input
                            type="text"
                            name="storePhone"
                            value={form.storePhone || ''}
                            onChange={onChangeHandler}
                            placeholder="사업장 전화번호를 - 포함하여 입력해 주세요."
                        />
                    </div>
                    <div>
                        <span>첨부파일 (사업자 등록증) *</span>
                        <input
                            type="text"
                            name="storePhone"
                            value={form.attechmentLink}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button
                        className='submitButton'
                        onClick={registerOnClickHandler}>제출</button>
                </div>
            </div>
        </>
    );
}

export default AppConvert;
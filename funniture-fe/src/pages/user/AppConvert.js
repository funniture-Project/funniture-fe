import OrdersCss from './orders.module.css';
// import './editsInfo.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decodeJwt from '../../utils/tokenUtils';
import { callRegisterOwnerAPI, callConvertImageAPI, checkOwnerStatusAPI, callUpdateOwnerAPI , getRejectedMessage} from '../../apis/MemberAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import basicImage from '../../assets/images/Adobe Express - file.png'
import BtnModal from '../../component/BtnModal';
import SubmissionMessage from './SubmissionMessage';

function AppConvert() {

    const member = useSelector(state => state.member);
    console.log('member : ', member);
    console.log('member.user : ', member.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showImageErrorModal, setShowImageErrorModal] = useState(false); // 변경할 이미지 선택 안 하고 누를때
    const [showImageSuccessModal, setShowImageSuccessModal] = useState(false);

    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false); // 기존 신청 여부

    const [isSubmitted, setIsSubmitted] = useState(false); // 신청 여부

    const [isRejected, setIsRejected] = useState(false); // 반려 여부
    const [rejectionReason, setRejectionReason] = useState(''); // 반려 사유


    const [form, setForm] = useState({
        storeName: '',
        bank: '',
        account: '',
        storeImage: '',
        storeNo: '',
        storeAddress: '',
        storePhone: '',
        attachmentFile: ''
    });

    const [previewImage, setPreviewImage] = useState(basicImage);


    // 25-03-03 여기 수정해야 함. getRejectedMessage 이거 보냈는데 처리가 안 됨
    // 페이지 로드 시 기존 신청 여부 확인
    useEffect(() => {
        const checkOwnerStatus = async () => {
            if (member.user && member.user.memberId) {
                try {
                    const statusResponse = await checkOwnerStatusAPI(member.user.memberId);
                    console.log('제공자 전환 신청 했는지 여부 :', statusResponse.data.results);
    
                    setIsAlreadyRegistered(statusResponse.data.results);
                    setIsRejected(statusResponse.data.results);
                    setRejectionReason(statusResponse.data.results.reasonRejection || '');
    
                    if (statusResponse.data.results) {
                        setIsSubmitted(true);
    
                        // 반려된 경우에만 반려 메시지를 가져옵니다
                        if (statusResponse.data.results.isRejected) {
                            const rejectedResponse = await getRejectedMessage(member.user.memberId);
                            console.log('반려 메시지:', rejectedResponse.data);
                            // 여기서 반려 메시지를 상태에 저장하거나 표시할 수 있습니다
                            setRejectionReason(rejectedResponse.data.message || '');
                        }
                    }
                } catch (error) {
                    console.error('소유자 상태 확인 중 오류 발생:', error);
                    // 에러 처리 로직
                }
            }
        };
    
        checkOwnerStatus();
    }, [member]);
    
    

    const owner = useSelector(state => state.member.owner);
    useEffect(() => {
        if (owner && owner.memberId) {
            console.log('owner 데이터:', owner);
            setIsSubmitted(true);
        }
    }, [owner]);

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
                storeImage: file, // 선택한 파일 객체를 form 상태에 저장
            });
        } else {
            setForm({
                ...form,
                storeImage: '', // 파일이 선택되지 않은 경우 빈 문자열로 설정
            });
        }

        e.target.value = ''; // 입력 필드 초기화 (같은 파일 다시 선택 가능)
    };


    const imageOnClickHandler = () => {
        console.log('imageOnClickHandler 호출됨');
        console.log('현재 form.storeImage 값:', form.storeImage);

        if (!form.storeImage || !(form.storeImage instanceof File)) {
            console.log('조건 만족: !form.storeImage 또는 form.storeImage File 객체가 아님');
            setShowImageErrorModal(true); // 오류 모달 표시
            return;
        }

        console.log('파일이 선택되었습니다:', form.storeImage);
        dispatch(callConvertImageAPI({
            memberId: member.user.memberId,
            storeImage: form.storeImage,
        }));
        setShowImageSuccessModal(true);
    };

    const registerOnClickHandler = () => {
        dispatch(callRegisterOwnerAPI({
            memberId: member.user.memberId,
            storeName: form.storeName,
            bank: form.bank,
            account: form.account,
            storeImage: form.storeImage,
            storeNo: form.storeNo,
            storeAddress: form.storeAddress,
            storePhone: form.storePhone,
            attachmentFile: form.attachmentFile
        })).then(() => {
            setIsSubmitted(true);
            alert('제공자 신청이 완료되었습니다.'); // 일단 얼러트
        });
    }

    const updateOnClickHandler = () => {
        dispatch(callUpdateOwnerAPI({
            memberId: member.user.memberId,
            storeName: form.storeName,
            bank: form.bank,
            account: form.account,
            storeImage: form.storeImage,
            storeNo: form.storeNo,
            storeAddress: form.storeAddress,
            storePhone: form.storePhone,
            attachmentFile: form.attachmentFile
        }));
        alert('제공자 재신청이 완료되었습니다.');
    };


    return (
        <>
            <div className={OrdersCss.ordersContainer}>
                <div className={OrdersCss.orderPageTitle}>제공자 전환</div>
                {isSubmitted ? (
                <SubmissionMessage />
                    ) : (
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
                            <option value="하나은행">하나은행</option>
                            <option value="신한은행">신한은행</option>
                            <option value="우리은행">우리은행</option>
                            <option value="농협은행">농협은행</option>
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
                        <img src={previewImage} alt="프로필 미리보기" />
                        <input
                            type="file"
                            id='uploadImg'
                            name='uploadImg'
                            onChange={handleImageChange}
                            style={{ display: 'none' }} />
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
                            name="storeAddress"
                            value={form.storeAddress}
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
                            type="file"
                            name="attachmentFile"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setForm({
                                    ...form,
                                    attachmentFile: file, // 선택한 파일 저장
                                });
                            }}
                        />
                    </div>
                    <button
                        className='submitButton'
                        onClick={isAlreadyRegistered ? updateOnClickHandler : registerOnClickHandler}>
                        {isAlreadyRegistered ? '재신청' : '제출'}
                    </button>
                </div>
                    )}
                    
 
            </div>
        </>
    );
}

export default AppConvert;
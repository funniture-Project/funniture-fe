import { useSelector } from "react-redux"
import OwInfoCss from './OwnerInfo.module.css'
import { useNavigate } from "react-router-dom"

function OwnerInfo() {
    const navigate = useNavigate();
    const { ownerInfo } = useSelector(state => state.owner)

    return (
        <div className={OwInfoCss.wholeContainer}>
            <div>
                <div className={OwInfoCss.topInfo}>
                    <div className={OwInfoCss.storeImg}>
                        <img src={ownerInfo?.storeImage == "a.jpg" || ownerInfo.storeImage == "default.jpg" || ownerInfo.storeImage == null ? require("../../assets/images/default.jpg") : ownerInfo?.storeImage}
                            alt="프로필 이미지" onClick={() => { navigate('/owner') }} />
                    </div>
                    <div className={OwInfoCss.ownerInfoItem}>
                        <span>상점 이름 : </span>
                        <div>{ownerInfo.storeName}</div>
                    </div>
                </div>

                <div className={OwInfoCss.ownerInfoItem}>
                    <span>사업자 번호 : </span>
                    <div>{ownerInfo.storeNo}</div>
                </div>

                <div className={OwInfoCss.ownerInfoItem}>
                    <span>상점 번호 : </span>
                    <div>{ownerInfo.storePhone}</div>
                </div>

                <div className={OwInfoCss.ownerInfoItem}>
                    <span>상점 주소 :</span>
                    <div>{ownerInfo.storeAddress}</div>
                </div>

                <div className={OwInfoCss.ownerInfoItem}>
                    <span>은행 : </span>
                    <div>{ownerInfo.bank}</div>
                </div>

                <div className={OwInfoCss.ownerInfoItem}>
                    <span>계좌번호 : </span>
                    <div>{ownerInfo.account}</div>
                </div>
            </div>
            <div className={OwInfoCss.ownerPdf}>
                {ownerInfo.attechmentLink === "Samsung_1234567890.pdf" || ownerInfo.attechmentLink == null ?
                    <img src='/assets/images/free-icon-no-file-11202705.png' alt="사업자 등록증" />
                    :
                    <embed
                        src={ownerInfo.attechmentLink}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    />
                }
            </div>
        </div>
    )
}

export default OwnerInfo
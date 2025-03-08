import { useSelector } from 'react-redux'
import decodeJwt from '../../utils/tokenUtils'
import './main.css'
import { useEffect, useState } from 'react'
import { getAllNoticeList } from '../../apis/NoticeAPI'

function Main() {
    const [noticeList, setNoticeList] = useState([])
    const { user } = useSelector(state => state.member)
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        async function getNotice() {
            const response = await getAllNoticeList()

            setNoticeList(response)
        }

        getNotice()
    }, [])

    useEffect(() => {
        if (user.memberId == '' || user.memberRole == "USER") {
            const list = noticeList.filter(item => item.viewRoll == "all" || item.viewRoll == "user")
            if (list.length > 5) {
                setFilteredList(list.slice(0, 5))
            } else {
                setFilteredList(list)
            }
        } else if (user.memberRole == "OWNER") {
            const list = noticeList.filter(item => item.viewRoll == "owner" || item.viewRoll == "all")
            if (list.length > 5) {
                setFilteredList(list.slice(0, 5))
            } else {
                setFilteredList(list)
            }
        } else if (user.memberRole == "ADMIN") {
            setFilteredList(noticeList)
        }
    }, [user])

    useEffect(() => {
        console.log("noticeList : ", noticeList)
    }, [noticeList])

    return (
        <div>
            <div className='mainContentBox'>
                {/* <img src='https://res.cloudinary.com/dor26tdln/raw/upload/v1740707870/vafwl1exrkurtjmpma2p.pdf' alt="테스트" /> */}
                {/* <iframe src='https://res.cloudinary.com/dor26tdln/raw/upload/v1740707870/vafwl1exrkurtjmpma2p.pdf'></iframe> */}
                <div className='title'>
                    <img src={require(`../../assets/icon/review.svg`).default} alt="리뷰 아이콘" />
                    <span>Best</span> 리뷰
                </div>
                <div className='contentBox reviewBox'>
                    <div>리뷰</div>
                    <div>리뷰</div>
                    <div>리뷰</div>
                    <div>리뷰</div>
                    <div>리뷰</div>
                    <div>리뷰</div>
                    <div>리뷰</div>
                    <div>리뷰</div>
                </div>
            </div>

            <div className='mainContentBox'>
                <div className='title'>
                    <img src={require(`../../assets/icon/notice_icon.svg`).default} alt="공지사항항 아이콘" />
                    <span>공지</span> 사항
                </div>
                <div className='contentBox'>
                    {filteredList.length > 0
                        ? filteredList.map(notice => (
                            <div>
                                <div className='noticeContentTitle'>{notice.noticeTitle}</div>
                                <div className='noticeContentText'>{notice.noticeContent}</div>
                                <div className='noticeContentAt'>{notice.writeTime}</div>
                            </div>
                        ))
                        : <div>공지사항 없음</div>}
                </div>
            </div>
        </div>
    )
}

export default Main
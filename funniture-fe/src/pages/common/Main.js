import './main.css'

function Main() {

    return (
        <div>
            <div className='mainContentBox'>
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
                    <div>공지사항</div>
                    <div>공지사항</div>
                    <div>공지사항</div>
                </div>
            </div>

            <div className='mainContentBox'>
                <div className='title'>
                    <img src={require(`../../assets/icon/communication.svg`).default} alt="자유게시판판 아이콘" />

                    <span>자유</span> 게시판
                </div>
                <div className='contentBox'>
                    <div>게시글</div>
                    <div>게시글</div>
                    <div>게시글</div>
                </div>
            </div>
        </div>
    )
}

export default Main
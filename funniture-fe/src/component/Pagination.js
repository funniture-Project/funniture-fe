import paginationCss from './pagination.module.css'

function Pagination() {

    return (
        <div className={paginationCss.pagination}>
            <img src={require(`../assets/icon/angles-left-solid.svg`).default} alt="페이지 맨앞으로 가는 아이콘" />
            <img src={require(`../assets/icon/angle-left-solid.svg`).default} alt="페이지 이전 아이콘" />
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            <img src={require(`../assets/icon/angle-right-solid.svg`).default} alt="페이지 다음 아이콘" />
            <img src={require(`../assets/icon/angles-right-solid.svg`).default} alt="페이지 맨뒤로 가는 아이콘" />
        </div>
    )

}

export default Pagination
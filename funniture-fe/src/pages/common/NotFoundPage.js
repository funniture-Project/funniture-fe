import { Link, useNavigate } from 'react-router-dom';
import NotFoundCss from './notFoundPage.module.css'
import { useEffect } from 'react';

function NotFoundPage() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const timer = setTimeout(() => navigate("/"), 10000);
    // }, []);

    return (
        <div className={NotFoundCss.whole}>
            <div>
                <h3>아직 찾아내지 못한 페이지에요.</h3>

                <h4>10초 뒤에 홈페이지로 돌아갑니다.</h4>
                <Link to="/" className="error-page-button">
                    집으로 돌아기기
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage;
import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import OwnerLayout from './layouts/OwnerLayout';
import AdminLayout from './layouts/AdminLayout';
import Main from './pages/common/Main'
import MyPage from './pages/user/MyPage';
import OwnerMyPage from './pages/owner/OwnerMyPage';
import Test from './pages/Test';
import Rental from './pages/admin/Rental';
import AuthorityLayout from './layouts/AuthorityLayout';
import AdminMain from './pages/admin/AdminMain';
import AdminUser from './pages/admin/AdminUser';
import ListPage from './pages/common/ListPage';
import { useEffect, useState } from 'react';
import Login from './pages/login/Login';
import Signup from './pages/login/Singup';
import OwnerProducts from './pages/owner/OwnerProducts';
import AdminProduct from './pages/admin/AdminProduct';
import Inquiry from './pages/user/Inquiry';
import Orders from './pages/user/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberAPI } from './apis/MemberAPI';
import decodeJwt from './utils/tokenUtils';
import OwnerRegister from './pages/owner/OwnerRegister';
import ProductDetailPage from './pages/common/ProductDetailPage';
import DetailOrder from './pages/user/DetailOrder';
import OrdersReturn from './pages/user/OrdersReturn';
import RentalRegist from './pages/user/RentalRegist';
import FindPass from './pages/login/FindPass';
import UserConform from './pages/user/UserConform';
import EditsInfo from './pages/user/EditsInfo';
import { resetMember } from './redux/modules/MemberModule';
import OwnerRental from './pages/owner/OwnerRental';


function App() {
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && token.sub) {
      console.log("유효한 토큰:", token);
      dispatch(callGetMemberAPI({ memberId: token.sub }));
    } else {
      console.error("유효하지 않은 토큰 또는 sub 값 없음!");
      dispatch(resetMember()); // 유효하지 않은 경우 Redux 상태 초기화
    }
  }, [token]);

  // 선택한 검색 카테고리 관리
  const [selectCategory, setSelectCategory] = useState([])
  const [selectCompany, setSelectCompany] = useState([])

  return (
    <Routes>
      <Route path='/' element={<UserLayout selectCategory={selectCategory} setSelectCategory={setSelectCategory}
        selectCompany={selectCompany} setSelectCompany={setSelectCompany} />} >

        <Route index element={<Main />} />
        <Route path='/mypage' element={<MyPage />}>
          <Route index element={<Orders />} />
          <Route path='orders/:id' element={<DetailOrder />} />
          <Route path='returns' element={<OrdersReturn />} />
          <Route path='edit' element={<UserConform />} />
          <Route path='edits' element={<EditsInfo />} />
        </Route>

        <Route path='/rental' element={<RentalRegist />} />

        <Route path='list' element={<ListPage selectCategory={selectCategory} selectCompany={selectCompany} />} />
        <Route path=':id' element={<ProductDetailPage />} />

        <Route path='test' element={<Test />} />
        <Route path='inquiry' element={<Inquiry />} />

        <Route path='/owner' element={<OwnerLayout />}>
          <Route index element={<OwnerMyPage />} />
          <Route path='product' element={<OwnerProducts />} />
          <Route path='register' element={<OwnerRegister />} />
          <Route path='edit' element={<OwnerRegister />} />
          <Route path='rentals' element={<OwnerRental />} />
        </Route>

      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/find' element={<FindPass />} />

      <Route path='/admin' element={<AdminLayout />}>

        <Route index element={<AdminMain />} />
        <Route path='rentals' element={<Rental />} />

        <Route path='authority' element={<AuthorityLayout />}>
          <Route path='user' element={<AdminUser />} />
        </Route>

        <Route path='product' element={<AdminProduct />} />

      </Route>
    </Routes>
  );
}

export default App;

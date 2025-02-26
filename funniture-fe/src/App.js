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
import { useEffect, useMemo, useState } from 'react';
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
import FavoritesPage from './pages/user/FavoritesPage';
import RecentProduct from './pages/user/Recentproduct';
import Convert from './pages/user/Convert';
import AppConvert from './pages/user/AppConvert';
import AdminOwner from './pages/admin/AdminOwner';
import AdminLeaver from './pages/admin/AdminLeaver';
import AdminConvert from './pages/admin/AdminConvert';


function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    console.log("토큰 세팅")
    if (window.localStorage.getItem("accessToken")) {
      setToken(decodeJwt(window.localStorage.getItem("accessToken")))
    }
  }, [window.localStorage.getItem("accessToken")])

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("token : ", token)
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

  const { user } = useSelector(state => state.member)

  useEffect(() => {
    if (user) {
      if (user.memberRole == "ADMIN" || user.memberRole == "OWNER") {
        if (localStorage.getItem("recent")) {
          localStorage.removeItem("recent")
        }
      } else {
        const existingRecent = localStorage.getItem("recent");

        if (existingRecent === null) { // only when there is no recent data
          localStorage.setItem("recent", JSON.stringify([]));
        }
      }
    }
  }, [user])

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
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path='recent' element={<RecentProduct />} />
          <Route path='convert' element={<Convert />} />
          <Route path='appConvert' element={<AppConvert />} />
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
          <Route path='owner' element={<AdminOwner />} />
          <Route path='convert' element={<AdminConvert />} />
          <Route path='leaver' element={<AdminLeaver />} />
        </Route>

        <Route path='product' element={<AdminProduct />} />

      </Route>
    </Routes>
  );
}

export default App;

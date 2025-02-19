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
import { useState } from 'react';
import Login from './pages/login/Login';
import Signup from './pages/login/Singup';
import OwnerProducts from './pages/owner/OwnerProducts';
import AdminProduct from './pages/admin/AdminProduct';
import Inquiry from './pages/user/Inquiry';
import Orders from './pages/user/Orders';

function App() {

  // 선택한 검색 카테고리 관리
  const [selectCategory, setSelectCategory] = useState([])
  const [selectCompany, setSelectCompany] = useState([])

  return (
    <Routes>
      <Route path='/' element={<UserLayout selectCategory={selectCategory} setSelectCategory={setSelectCategory}
        selectCompany={selectCompany} setSelectCompany={setSelectCompany} />} >

        <Route index element={<Main />} />
        <Route path='/mypage' element={<MyPage />}>
          <Route index element={<Orders/>}/>
        </Route>

        <Route path='list' element={<ListPage selectCategory={selectCategory} selectCompany={selectCompany} />} />
        <Route path='test' element={<Test />} />
        <Route path='inquiry' element={<Inquiry />} />

        <Route path='/owner' element={<OwnerLayout />}>
          <Route index element={<OwnerMyPage />} />
          <Route path='product' element={<OwnerProducts />} />
        </Route>

      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

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

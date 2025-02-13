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

function App() {

  // 선택한 검색 카테고리 관리
  const [selectCategory, setSelectCategory] = useState([])

  return (
    <Routes>
      <Route path='/' element={<UserLayout selectCategory={selectCategory} setSelectCategory={setSelectCategory} />} >
        <Route index element={<Main />} />
        <Route path='mypage' element={<MyPage />} />
        <Route path='list' element={<ListPage selectCategory={selectCategory} />} />
        <Route path='test' element={<Test />} />
        <Route path='/owner' element={<OwnerLayout />}>
          <Route index element={<OwnerMyPage />} />
        </Route>
      </Route>
      <Route path='/admin' element={<AdminLayout />}>

        <Route index element={<AdminMain />} />
        <Route path='rentals' element={<Rental />} />

        <Route path='authority' element={<AuthorityLayout />}>
          <Route path='user' element={<AdminUser />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;

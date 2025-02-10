import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import OwnerLayout from './layouts/OwnerLayout';
import AdminLayout from './layouts/AdminLayout';
import Main from './pages/Main'
import MyPage from './pages/user/MyPage';
import OwnerMyPage from './pages/owner/OwnerMyPage';
import Test from './pages/Test';

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Main />} />
        <Route path='mypage' element={<MyPage />} />
        <Route path='test' element={<Test />} />
        <Route path='/owner' element={<OwnerLayout />}>
          <Route index element={<OwnerMyPage />} />
        </Route>
      </Route>
      <Route path='/admin' element={<AdminLayout />}>

      </Route>
    </Routes>
  );
}

export default App;

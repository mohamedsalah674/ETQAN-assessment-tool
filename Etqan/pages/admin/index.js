import ETQAN from '../../components/ETQAN';
import AdminPage from '../../components/admin/adminPage';

import AdminNavbar from '../../components/admin/adminNavbar';

const ProfilePage = () => {
  return (
    <>
      <div className="bg-gray-900 flex flex-col items-center w-full pl-20">
        <ETQAN />

        <AdminPage />

        <AdminNavbar />
      </div>
    </>
  );
};

export default ProfilePage;

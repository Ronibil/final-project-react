import { Routes, Route } from "react-router-dom";
import FCLoginPage from "./Pages/FCLoginPage";
import FCRequestPage from "./Pages/FCRequestPage";
import FCSuperHomePage from "./Pages/FCSuperHomePage";
import FCStudentHomePage from "./Pages/FCStudentHomePage";
import FCAdminHomePage from "./Pages/FCAdminHomePage";
import FCTypeOfUser from "./Pages/FCTypeOfUser";
import FCSearchClassesPage from "./Pages/FCSearchClassesPage";
import FCBuildProfilePage from "./Pages/FCBuildProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import FCStudentRequestPage from './Pages/FCStudentRequestPage';
import FCSuperStudentRequestPage from './Pages/FCSuperStudentRequestPage.jsx';
import FCSuperStudentRequestPage2 from './Pages/FCSuperStudentRequestPage2.jsx';


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/RequestPage" element={<FCRequestPage />} />
        <Route path="/studentHomePage" element={<FCStudentHomePage />} />
        <Route path="/superHomePage" element={<FCSuperHomePage />} />
        <Route path="/adminHomePage" element={<FCAdminHomePage />} />
        <Route path="/searchClassesPage" element={<FCSearchClassesPage />} />
        <Route path="/buildProfilePage" element={<FCBuildProfilePage />} />
        <Route path='/' element={<FCLoginPage />} />
        <Route path='/StudentRequestPage' element={<FCStudentRequestPage />} />
        <Route path='/SuperStudentRequestPage' element={<FCSuperStudentRequestPage />} />
        <Route path='/SuperStudentRequestPage2' element={<FCSuperStudentRequestPage2 />} />
        <Route path='/studentHomePage' element={<FCStudentHomePage />} />
        <Route path='/superHomePage' element={<FCSuperHomePage />} />
        <Route path='/adminHomePage' element={<FCAdminHomePage />} />
        <Route path='/typeOfUser' element={<FCTypeOfUser />} />
      </Routes>
    </div>
  );
};

import {Routes,Route} from 'react-router-dom';
import FCLoginPage from './Pages/FCLoginPage';
import FCRequestPage from './Pages/FCRequestPage';
import FCSuperHomePage from './Pages/FCSuperHomePage';
import FCStudentHomePage from './Pages/FCStudentHomePage';
import FCAdminHomePage from './Pages/FCAdminHomePage';
import FCTypeOfUser from './Pages/FCTypeOfUser';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<FCLoginPage/>}/>
        <Route path='/RequestPage' element={<FCRequestPage/>}/>
        <Route path='/studentHomePage' element={<FCStudentHomePage/>}/>
        <Route path='/superHomePage' element={<FCSuperHomePage/>}/>
        <Route path='/adminHomePage' element={<FCAdminHomePage/>}/>
        <Route path='/typeOfUser' element={<FCTypeOfUser/>}/>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login';
import Checkstatus from './user_pages/status'
import Contact from './user_pages/contact';
import Dashboard  from './user_pages/Dashboard';
import Errorpage from './pages/Errorpage';
import Protected from './protected';
import Trash from './user_pages/trash';
import Sharedlayout from './user_pages/shared_dashboard';
import Profile from './user_pages/profile';
import Register from './pages/Register'
import Water from './user_pages/water';
import Electicity from './user_pages/electicity';
import Pothole from './user_pages/pothole';
import Streetlight from './user_pages/streetlight';
import Admin from './admin/admin';
import Adelectricity from './admin/adelectricity';
import Adwater from './admin/adwater';
import Adwaste from './admin/adwaste';
import Adpothole from './admin/adpothole';
import Adstreetlight from './admin/adstreetlight';
import Adminnav from './components/adminnav';


function App() {
  return (
    <>
      <BrowserRouter>

      <Routes>
            <Route exact path="/" element={<Login />} />

            {/* admin */}

            <Route path='/admin' element={<Adminnav />}>

              <Route index exact element={<Protected Component={Adelectricity}/>}/>
              <Route path='water' element={<Protected Component={Adwater}/>}/>
              <Route path='waste' element={<Protected Component={Adwaste}/>}/>
              <Route path='pothole' element={<Protected Component={Adpothole}/>}/>
              <Route path='streetlight' element={<Protected Component={Adstreetlight}/>}/>
              <Route path='createAdmin'  element={<Protected Component={Admin}/>}/>

            </Route>
            {/* USER DASHBOARD */}

            <Route path='/dashboard' element={<Sharedlayout/>}>
                <Route index exact element={<Protected Component={Dashboard} />} />
                <Route path='profile' element={<Protected Component={Profile}/>} />
                <Route path='status' element={<Protected Component={Checkstatus}/>} />
                <Route path='contact' element={<Protected Component={Contact}/>} />
            </Route>

            <Route path='/gar_complaint' element={<Trash/>} />
            <Route path='/water_complaint' element={<Protected Component={Water}/>} />
            <Route path='/electicity_complaint' element={<Protected Component={Electicity}/>} />
            <Route path='/pothole_complaint' element={<Protected Component={Pothole}/>} />
            <Route path='/streetlight_complaint' element={<Protected Component={Streetlight}/>} />

            <Route path='/error' element={<Errorpage/>}/>
            <Route path='/register' element={<Register/>}/>
            

            <Route path='*' element={<h1>ERROR 404!<br/>PAGE NOT FOUND</h1>}/>

          </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

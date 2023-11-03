import Register from './main/register'
import Login from './main/login';
import Index1 from './main/index';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './main/style/style.css';
import Cookies from 'universal-cookie';

const App = () => {

  const cookies = new Cookies();

  return (
    <>
      <HashRouter>
        <Routes>
          {/* Will navigate to main page if cookies was saved after login. will persist navigation on login if no cookies has been saved yet (not yet logged in) */}
          <Route path="/" element= {<Navigate to="/login"/>} />
          {/* This is an "if" function.== if ..................................?.. true ...................:.. false*/}
          <Route path='/login' element={cookies.get(btoa('user_session')) == 1 ? <Navigate to="/index1" /> : <Login/>} />
          <Route path='/register' element={cookies.get(btoa('user_session')) == 1 ? <Navigate to="/index1" /> : <Register/>} />
          <Route path='/index1' element={cookies.get(btoa('user_session')) == 1 ? <Index1/> : <Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;

//side notes: the btoa() will encrypt the value in base64. while atob() will decrypt value from base64.
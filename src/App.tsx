import './App.css';
import Login from './componant/pages/loginRegistration/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from "./componant/pages/loginRegistration/registration";
import Dashboard from './componant/pages/Doctor/pages/Dashboard';
import Appointment from "./componant/pages/patient/Appointment";
import UpcomingAppointments from "./componant/pages/patient/PatientDashboaed";
import PreviousHistory from "./componant/pages/patient/PatientHistory";
import Header from "./componant/pages/commonuser/Header";
import Main from "./componant/pages/commonuser/Main";

function App() {
  return (
    <div className="App">
      <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/doctor" element={<Dashboard />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/patientDashboard" element={<UpcomingAppointments />} />
          <Route path="/patientHistory" element={<PreviousHistory />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/Main" element={<Main />} />
          

          {/* <Route path="/patient" element={<UpcomingAppointments />} /> */}
        </Routes>
    </Router>
    </div>
    </div>
  );
}

export default App;
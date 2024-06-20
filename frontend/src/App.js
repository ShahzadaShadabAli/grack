import "../src/bootstrap.min.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoginScreen from "./screens/authentication/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterScreen from "./screens/authentication/RegisterScreen";
import Main from "./screens/dashboard/Main";
import PageNotFound from "./PageNotFound";
import TrackHistory from "./screens/trackHistory/TrackHistory";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" Component={LoginScreen} />
          <Route exact path="/login" Component={LoginScreen} />
          <Route exact path="/register" Component={RegisterScreen} />
          <Route exact path="/track/:date" Component={Main} />
          <Route exact path="/dashboard" Component={TrackHistory} />
          <Route path="*" Component={PageNotFound} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

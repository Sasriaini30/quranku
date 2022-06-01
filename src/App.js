import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom"
import NavbarCom from "./component/navbar";
import FooterCom from "./component/footer";
import HomeComp from "./halaman/home";
import SurahComp from "./halaman/surah";
import InfoComp from "./halaman/info";
import JuzComp from "./halaman/juz";

function App() {
    return (
        <div className="App">
            <NavbarCom/>
            <Routes>
                <Route path="/" element={<HomeComp/>}/>
                <Route path="surah/:id" element={<SurahComp/>}/>
                <Route path="juz/:id" element={<JuzComp/>}/>
                <Route path="info/:id" element={<InfoComp/>}/>
                <Route path="*" element={<HomeComp/>}/>
            </Routes>
            <FooterCom/>
        </div>
    );
}

export default App;


import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Join from "./Component/Join/Join"
import Chat from "./Component/Chat/Chat"


function App() {
 
  return (
    <div className="App">
    
     <Router>
      <Routes>
      <Route path='/' element ={<Join/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Main} from "./Components/Main/Main";

const App = () => {
  return (
    <div className="app-wrapper">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;

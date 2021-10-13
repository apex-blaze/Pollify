import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/auth" component={Auth}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import UserProvider from "./firebase/UserProvider";
import PrivateRoute from "./components/PrivateRoute";
import Poll from "./components/Poll";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Home}></PrivateRoute>
            <Route exact path="/auth" component={Auth}></Route>
            <PrivateRoute exact path="/:id" component={Poll} />
            <PrivateRoute exact path="/results/:id" component={Results} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;

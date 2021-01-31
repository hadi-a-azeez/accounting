import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomerHistory from "./pages/customers/customerHistory";
import Customers from "./pages/customers/customersList";
import Entry from "./pages/entry/entry";
import Home from "./pages/home";
import Reports from "./pages/reports";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/entry" component={Entry} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/customer_history/:id" component={CustomerHistory} />
        <Route exact path="/reports" component={Reports} />
      </Switch>
    </Router>
  );
}

export default App;

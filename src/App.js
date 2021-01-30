import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomerHistory from "./pages/customerHistory";
import Customers from "./pages/customers";
import Entry from "./pages/entry";
import Home from "./pages/home";
import Reports from "./pages/reports";
import FormSample from "./pages/formsample";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/entry" component={Entry} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/customer_history" component={CustomerHistory} />
        <Route exact path="/reports" component={Reports} />
        <Route exact path="/test" component={FormSample} />
      </Switch>
    </Router>
  );
}

export default App;

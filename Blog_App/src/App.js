import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import { Home, DetailPost } from "./pages/index";

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:id">
          <DetailPost />
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;

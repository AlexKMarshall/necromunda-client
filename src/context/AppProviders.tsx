import { Auth0Provider } from "@auth0/auth0-react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const AuthProvider: React.FC = ({ children }) => (
  <Auth0Provider
    domain="alexkmarshall.eu.auth0.com"
    clientId="CFLjgSzY7b8qckm2Hditn3A4gZKjD7i3"
    redirectUri={window.location.origin}
    audience="https://necromunda/api"
    children={children}
  />
);

const queryCache = new QueryCache();

const QueryCacheProvider: React.FC = ({ children }) => (
  <ReactQueryCacheProvider queryCache={queryCache} children={children} />
);

const AppProviders: React.FC = ({ children }) => (
  <QueryCacheProvider>
    <AuthProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthProvider>
  </QueryCacheProvider>
);

export default AppProviders;

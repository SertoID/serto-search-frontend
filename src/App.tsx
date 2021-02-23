import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { PhonebookContext } from "./context/PhonebookProvider";
import { PhonebookService } from "./services/PhonebookService";
import { IdentityThemeProvider, fonts } from "serto-ui";
import { routes } from "./constants";
import { HomePage } from "./views/Home/HomePage";
import { RegisterPage } from "./views/Register/RegisterPage";
import { DomainListingPage } from "./views/DomainListing/DomainListingPage";
import { Global } from "./components/layout";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    font-family: ${fonts.sansSerif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`;

export const App = () => {
  const phonebook = React.useMemo(() => new PhonebookService(), []);
  return (
    <BrowserRouter>
      <PhonebookContext.Provider value={phonebook}>
        <React.Suspense fallback={<></>}>
          <IdentityThemeProvider>
            <GlobalStyle />
            <Global>
              <Switch>
                <Route exact path={routes.HOMEPAGE} component={HomePage} />
                <Route path={routes.DOMAIN_LISTING_PAGE} component={DomainListingPage} />
                <Route path={routes.REGISTER} component={RegisterPage} />
              </Switch>
            </Global>
          </IdentityThemeProvider>
        </React.Suspense>
      </PhonebookContext.Provider>
    </BrowserRouter>
  );
};

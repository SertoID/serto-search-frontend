import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { PhonebookContext } from "./context/PhonebookProvider";
import { PhonebookService } from "./services/PhonebookService";
import { IdentityThemeProvider, fonts } from "serto-ui";
import { routes } from "./constants";
import { PhonebookPage } from "./views/PhonebookPage";
import { RegisterPage } from "./views/RegisterPage";
import { DomainListingPage } from "./views/DomainListingPage";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    background-color: #F6F6FE;
    font-family: ${fonts.sansSerif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 24px;
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
            <Switch>
              <Route exact path={routes.HOMEPAGE} component={PhonebookPage} />
              <Route path={routes.DOMAIN_LISTING_PAGE} component={DomainListingPage} />
              <Route path={routes.REGISTER} component={RegisterPage} />
            </Switch>
          </IdentityThemeProvider>
        </React.Suspense>
      </PhonebookContext.Provider>
    </BrowserRouter>
  );
};

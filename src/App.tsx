import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { PhonebookContext } from "./context/PhonebookProvider";
import { PhonebookService } from "./services/PhonebookService";
import { IdentityThemeProvider, fonts } from "serto-ui";
import { routes } from "./constants";

import { HomePage } from "./views/Home/HomePage";
import { RegisterPage } from "./views/Register/RegisterPage";
import { DomainPage } from "./views/Domain/DomainPage";
import { SearchPage } from "./views/Search/SearchPage";
import { NftSearchPage } from "./views/NftSearch/NftSearchPage";
import { HowItWorksPage } from "./views/HowItWorks/HowItWorksPage";
import { VcValidatorPage } from "./views/VcValidator/VcValidatorPage";

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
            <Switch>
              <Route exact path={routes.HOMEPAGE} component={HomePage} />
              <Route path={routes.DOMAIN_PAGE} component={DomainPage} />
              <Route path={routes.REGISTER} component={RegisterPage} />
              <Route path={routes.SEARCH} component={SearchPage} />
              <Route path={routes.VC_VALIDATOR} component={VcValidatorPage} />
              <Route path={routes.NFT_SERACH} component={NftSearchPage} />
              <Route path={routes.HOW_IT_WORKS} component={HowItWorksPage} />
            </Switch>
          </IdentityThemeProvider>
        </React.Suspense>
      </PhonebookContext.Provider>
    </BrowserRouter>
  );
};

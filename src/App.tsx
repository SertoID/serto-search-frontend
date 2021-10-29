import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { PhonebookContext } from "./context/PhonebookProvider";
import { PhonebookService } from "./services/PhonebookService";
import { IdentityThemeProvider, fonts, RENDER_CONTEXT } from "serto-ui";
import { routes } from "./constants";
import { SertoUiWrapper } from "./context/SertoUiWrapper";

import { HomePage } from "./views/Home/HomePage";
import { PreRegistrationPage } from "./views/Register/PreRegistrationPage";
import { RegisterDomainPage } from "./views/Register/RegisterDomainPage";
import { RegisterSocialPage } from "./views/Register/RegisterSocialPage";
import { DomainPage } from "./views/Domain/DomainPage";
import { SearchPage } from "./views/Search/SearchPage";
import { NftSearchPage } from "./views/NftSearch/NftSearchPage";
import { HowItWorksPage } from "./views/HowItWorks/HowItWorksPage";
import { VcValidatorPage } from "./views/VcValidator/VcValidatorPage";
import { AddOrgProfilePage } from "./views/AddOrgProfile/AddOrgProfilePage";
import { VcEmbed } from "./views/Embed/VcEmbed";
import { SignCredentialPage } from "./views/Register/SignCredentialPage";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    height: 100%;
  }
  body {
    font-family: ${fonts.sansSerif};
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  *, :after, :before {
    box-sizing: inherit;
  }
  #root {
    height: 100%;
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
            <SertoUiWrapper renderContext={RENDER_CONTEXT.SEARCH}>
              <Switch>
                <Route exact path={routes.HOMEPAGE} component={HomePage} />
                <Route path={routes.DOMAIN_PAGE} component={DomainPage} />
                <Route path={routes.PRE_REGISTRATION} component={PreRegistrationPage} />
                <Route path={routes.REGISTER_DOMAIN} component={RegisterDomainPage} />
                <Route path={routes.REGISTER_SOCIAL} component={RegisterSocialPage} />
                <Route path={routes.SIGN_CREDENTIAL} component={SignCredentialPage} />
                <Route path={routes.ADD_ORG_PROFILE} component={AddOrgProfilePage} />
                <Route path={routes.SEARCH} component={SearchPage} />
                <Route path={routes.VC_VALIDATOR} component={VcValidatorPage} />
                <Route path={routes.NFT_SERACH} component={NftSearchPage} />
                <Route path={routes.HOW_IT_WORKS} component={HowItWorksPage} />
              </Switch>
            </SertoUiWrapper>
            <SertoUiWrapper renderContext={RENDER_CONTEXT.VC_EMBED}>
              <Switch>
                <Route path={routes.VC_EMBED} component={VcEmbed} />
              </Switch>
            </SertoUiWrapper>
          </IdentityThemeProvider>
        </React.Suspense>
      </PhonebookContext.Provider>
    </BrowserRouter>
  );
};

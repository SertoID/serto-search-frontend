import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { IdentityThemeProvider, fonts } from "./components";
import { routes } from "./constants";

import { Phonebook } from "./views/Phonebook";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    background-color: #F6F6FE;
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
  return (
    <BrowserRouter>
      <React.Suspense fallback={<></>}>
        <IdentityThemeProvider>
          <GlobalStyle />
          <Switch>
            <Route path={routes.HOMEPAGE} component={Phonebook} />
          </Switch>
        </IdentityThemeProvider>
      </React.Suspense>
    </BrowserRouter>
  );
};

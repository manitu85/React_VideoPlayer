import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after{
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; 
  }

  body {
    box-sizing: border-box; 
    font-size: 1rem;
    font-family: 'Roboto Condensed', sans-serif;
  }
`

export default GlobalStyle

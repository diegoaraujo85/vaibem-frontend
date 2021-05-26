import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  body{

    max-height: calc(100vh - 70px);
    max-width:100vw;

    width:100%;
    height:100%;

    background-color: var(--background);
    color: var(--snow);
    -webkit-font-smoothing: antialiased;

  }

  body, input, button {
    /* font-family: "Roboto Slab",serif; */
    font-family: Poppins,sans-serif;
    font-size: 16px;
    @media screen and (max-width: 540px) {
      font-size: 12px;
    }
  }
/*
  padding: 16px 16px 0 16px; top right bottom left
 */
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button{
    cursor:pointer;
  }

  :root {
    --primary: #7b18c1;
    --secondary: #13f484;
    --background: #ffffff;
    --white: #f4ede8;
    --snow: #ffffff;
    --gray: #737380;
    --light-gray: #ccc;
    --outline: #2F3336;
    --success: #00C06B;
    --info: #006BC0;
    --red: #c53030;

  }
`;

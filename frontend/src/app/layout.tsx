import "./style.css";
import App from "./page";
import { Header } from "../components/header";
import {Devs} from "../components/devs";
export default function RootLayout() {
  return (
    <html lang="pt_br">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <title>Document</title>
      </head>
      <body>
        <Header />
        <Devs/>
      </body>
    </html>
  );
}

import { useEffect } from 'react'
import * as Ably from 'ably/promises'
import { configureAbly } from "@ably-labs/react-hooks";
import type { AppProps } from 'next/app'
import "../styles/globals.css";

const prefix = process.env.API_ROOT || "";
const clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

configureAbly({ authUrl: `${prefix}/api/createTokenRequest?clientId=${clientId}`, clientId: clientId });

function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps}/>;
}

export default MyApp;

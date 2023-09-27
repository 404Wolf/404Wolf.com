import "@/styles/globals.css";
import "@/styles/markdown.css";
import "@/styles/tagInputs.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-tooltip/dist/react-tooltip.css'

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>

            <Component {...pageProps} />
        </SessionProvider>
    );
}

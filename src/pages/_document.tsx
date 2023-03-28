import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className="p-[4.5%] lg:px-[10%] xl:px-[15%] max-w-[100rem] mx-auto">
            <Head>
                <title>Wolf Mermelstein</title>
                <meta name="description" content="Wolf Mermelstein Personal Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

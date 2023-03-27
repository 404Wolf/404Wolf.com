import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className="p-[4.5%] lg:px-[10%] xl:px-[15%] max-w-[91rem] mx-auto">
            <Head/>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

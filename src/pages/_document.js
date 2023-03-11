import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className="p-[4.5%] lg:px-[10%] xl:px-[12.5%] bg-gradient-to-tr from-[#1d4480] to-[#1d4480]">
            <Head/>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

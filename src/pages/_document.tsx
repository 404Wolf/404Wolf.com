import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className="p-[4.5%] lg:px-[10%] xl:px-[15%] max-w-[100rem] mx-auto">
            <Head>
                <title>Wolf Mermelstein</title>
                <meta name="title" content="Wolf Mermelstein Personal Website"/>
                <meta name="description" content="Enter the world of a creative student with a passion for tinkering, code, Latin tabletop, and more. Discover a portfolio of projects, blogs, and more."/>
                <meta name="keywords" content="portfolio, personal, creative, curious, expansive, projects, blogs, Wolf Mermelstein, Mermelstein, New York, Brooklyn, engineering, design, tinkering, exploration, STEM, interdisciplinary, maker, explorer, contrive, create, empassion"/>
                <meta name="robots" content="index, follow"/>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="author" content="Wolf Mermelstein"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

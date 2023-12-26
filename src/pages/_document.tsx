import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html
            lang="en"
            className="py-[6%] px-[4.5%] md:px-[6%] lg:px-[11%] xl:px-[15%] max-w-[100rem] mx-auto"
        >
            <Head>
                <meta
                    name="keywords"
                    content="portfolio, personal, creative, curious, expansive, projects, blogs, Wolf Mermelstein, Mermelstein, New York, Brooklyn, engineering, design, tinkering, exploration, STEM, interdisciplinary, maker, explorer, contrive, create, empassion"
                />
                <meta name="robots" content="index, follow"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="author" content="Wolf Mermelstein"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}

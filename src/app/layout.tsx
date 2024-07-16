import {Metadata} from "next";
import {Wrappers} from "./wrappers";
import "@/styles/globals.css";
import "@/styles/markdown.css";
import "@/styles/tagInputs.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-tooltip/dist/react-tooltip.css";
import Script from "next/script";
import BasicContacts from "@/components/contacts/BasicContacts";
import {createContext} from "react";

export const metadata: Metadata = {
  keywords:
    "portfolio, personal, creative, curious, expansive, projects, blogs, Wolf Mermelstein, Mermelstein, New York, Brooklyn, engineering, design, tinkering, exploration, STEM, interdisciplinary, maker, explorer, contrive, create, empassion",
  robots: "index, follow",
};

export default function Document({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
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

        <div
          className="right-10 top-2 hidden sm:block"
          style={{
            position: "fixed",
            transform: "rotate(-90deg)",
            transformOrigin: "top right",
          }}
        >
          <BasicContacts />
        </div>

        <div className="py-[6%] px-[4.5%] md:px-[10%] lg:px-[16%] xl:px-[15%] max-w-[170rem] mx-auto">
          <Wrappers>{children}</Wrappers>
        </div>
        <Script
          async
          defer
          src="https://www.recurse-scout.com/loader.js?t=1a9819584f6b47bb6e25db8483543a8f"
        />
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import "@designcodeio/threeui/style.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isFullPage = router.pathname === "/";

  if (isFullPage) {
    return <Component {...pageProps} />;
  }

  return (
    <ThemeProvider>
      <LenisProvider>
        <div className={inter.className}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </LenisProvider>
    </ThemeProvider>
  );
}

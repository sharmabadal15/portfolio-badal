import Head from "next/head";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import ScrollDivider from "@/components/sections/ScrollDivider";
import { personalInfo } from "@/data/resume";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${personalInfo.name} | ${personalInfo.role}`}</title>
        <meta name="description" content={personalInfo.tagline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={`${personalInfo.name} | ${personalInfo.role}`}
        />
        <meta property="og:description" content={personalInfo.tagline} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <ScrollDivider />
        <About />
        <ScrollDivider />
        <Skills />
        <ScrollDivider />
        <Projects />
      </main>
    </>
  );
}

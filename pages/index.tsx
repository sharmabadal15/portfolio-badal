import dynamic from "next/dynamic";
import Head from "next/head";

const KageLandingPage = dynamic(
  () =>
    import("@designcodeio/threeui/components/KageLandingPage").then(
      (m) => m.KageLandingPage
    ),
  { ssr: false }
);

export default function KagePage() {
  return (
    <>
      <Head>
        <title>Badal Sharma | Frontend Engineer | Cloud &amp; DevOps</title>
        <meta name="description" content="4+ years building high-complexity React & Next.js apps. Cloud-native deployments & CI/CD pipelines. AI-assisted development." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%" }}>
        <KageLandingPage />
      </div>
    </>
  );
}

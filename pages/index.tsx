import dynamic from "next/dynamic";

const KageLandingPage = dynamic(
  () =>
    import("@designcodeio/threeui/components/KageLandingPage").then(
      (m) => m.KageLandingPage
    ),
  { ssr: false }
);

export default function KagePage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <KageLandingPage />
    </div>
  );
}

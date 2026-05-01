import PageWrapper from "@/components/global/page-wrapper";

export default function ResourcesPage() {
  return (
    <PageWrapper
      title="Resources"
      subtitle="Learn how to build powerful automations."
    >
      <div className="space-y-4">
        {["Getting Started", "API Guide", "Best Practices"].map((item) => (
          <div
            key={item}
            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500 transition"
          >
            {item}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
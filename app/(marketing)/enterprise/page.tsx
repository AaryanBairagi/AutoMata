import PageWrapper from "@/components/global/page-wrapper";

export default function EnterprisePage() {
  return (
    <PageWrapper
      title="Enterprise"
      subtitle="Built for scale, security, and performance."
    >
      <div className="space-y-4 text-gray-400">
        <p>• Dedicated infrastructure</p>
        <p>• SLA guarantees</p>
        <p>• Custom integrations</p>
      </div>
    </PageWrapper>
  );
}
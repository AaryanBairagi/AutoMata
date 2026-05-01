import PageWrapper from "@/components/global/page-wrapper";

export default function ClientsPage() {
  return (
    <PageWrapper
      title="Clients"
      subtitle="Trusted by teams building modern automation systems."
    >
      <div className="grid md:grid-cols-4 gap-6 text-center text-gray-400">
        {["Google", "Stripe", "Notion", "Slack"].map((c) => (
          <div
            key={c}
            className="p-6 rounded-xl bg-white/5 border border-white/10"
          >
            {c}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
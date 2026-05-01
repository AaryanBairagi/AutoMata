import PageWrapper from "@/components/global/page-wrapper";

export default function ProductsPage() {
  return (
    <PageWrapper
      title="Products"
      subtitle="Explore everything AutoMata can automate for you."
    >
      <div className="grid md:grid-cols-3 gap-6">

        {[
          "Workflow Automation",
          "AI Integrations",
          "Real-time Triggers",
          "Custom API Nodes",
          "Team Collaboration",
          "Analytics Dashboard",
        ].map((item) => (
          <div
            key={item}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500 transition"
          >
            <h3 className="font-semibold text-lg mb-2">{item}</h3>
            <p className="text-gray-400 text-sm">
              Powerful tools designed to automate and scale your workflows.
            </p>
          </div>
        ))}

      </div>
    </PageWrapper>
  );
}
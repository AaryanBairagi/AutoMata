import PageWrapper from "@/components/global/page-wrapper";

const plans = [
  {
    name: "Developer",
    price: "Free",
    features: ["100 Credits", "Basic Workflows", "Community Support"],
  },
  {
    name: "Startup",
    price: "$19/mo",
    features: ["5000 Credits", "Advanced Workflows", "Priority Support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited Credits", "Dedicated Support", "Custom Integrations"],
  },
];

export default function PricingPage() {
  return (
    <PageWrapper
      title="Pricing"
      subtitle="Simple, transparent pricing that scales with you."
    >
      <div className="grid md:grid-cols-3 gap-6">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>

            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
              Get Started
            </button>
          </div>
        ))}

      </div>
    </PageWrapper>
  );
}
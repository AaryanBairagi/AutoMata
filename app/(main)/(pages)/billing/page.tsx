import React from "react";
import { Stripe } from "stripe";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import BillingDashboard from "./_components/billing-dashboard";
import PageHeader from "@/components/global/page-header";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Billing = async ({ searchParams }: Props) => {
  const session_id =
    typeof searchParams.session_id === "string"
      ? searchParams.session_id
      : "";

  if (session_id) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2025-07-30.basil",
    });

    const session = await stripe.checkout.sessions.listLineItems(session_id);
    const user = await currentUser();

    const description = session.data?.[0]?.description;

    if (user && description) {
      let credits = "0";

      if (description === "Developer") credits = "100";
      else if (description === "Startup") credits = "5000";
      else if (description === "Enterprise") credits = "Unlimited";

      await db.user.update({
        where: { clerkId: user.id },
        data: { tier: description, credits },
      });
    }
  }

  return (
    <div className="w-full px-6 py-10 space-y-8">
      <PageHeader
        title="Billing"
        subtitle="Manage your subscription and track your credits"
      />
      <BillingDashboard />
    </div>
  );
};

export default Billing;

// import React from "react";
// import { Stripe } from "stripe";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import BillingDashboard from "./_components/billing-dashboard";
// import PageHeader from "@/components/global/page-header";

// type Props = {
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// const Billing = async ({ searchParams }: Props) => {
//   const session_id = typeof searchParams?.session_id === "string"
//     ? searchParams.session_id
//     : "";

//   if (session_id) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET!, {
//       typescript: true,
//       apiVersion: "2025-07-30.basil",
//     });

//     const session = await stripe.checkout.sessions.listLineItems(session_id);
//     const user = await currentUser();

//     const description = session.data?.[0]?.description;

//     if (user && description) {
//       let credits = "0";

//       if (description === "Developer") credits = "100";
//       else if (description === "Startup") credits = "5000";
//       else if (description === "Enterprise") credits = "Unlimited";

//       await db.user.update({
//         where: { clerkId: user.id },
//         data: { tier: description, credits },
//       });
//     }
//   }

//   return (
//     <div className="w-full px-6 py-10 space-y-8">
//       <PageHeader
//         title="Billing"
//         subtitle="Manage your subscription and track your credits"
//       />
//       <BillingDashboard />
//     </div>
//   );
// };

// export default Billing;
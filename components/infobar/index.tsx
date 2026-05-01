"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { UserButton } from "@clerk/nextjs";
import { useBilling } from "@/providers/billing-provider";
import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connections";

const InfoBar = () => {
  const { credits, tier, setCredits, setTier } = useBilling();

  useEffect(() => {
    const fetchBilling = async () => {
      const response = await onPaymentDetails();
      if (response) {
        setCredits(response.credits ?? "100");
        setTier(response.tier ?? "Developer");
      }
    };
    fetchBilling();
  }, [setCredits, setTier]);

  return (
    <div className="flex items-center justify-between h-25 px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-xl">

      {/* LEFT — CREDITS */}
      <div className="text-sm text-gray-300">
        <span className="opacity-60 mr-2">Credits :</span>
        <span className="font-semibold text-white">
          {tier === "Unlimited"
            ? "Unlimited"
            : `${credits} / ${
                tier === "Developer" ? 100 : tier === "Startup" ? 5000 : "∞"
              }`}
        </span>
      </div>

      {/* CENTER — SEARCH */}
      <div className="relative w-[420px]">
        <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
        />

        <Input
            placeholder="Search workflows, apps..."
            className="
            w-full h-12 pl-12 pr-4 rounded-xl
            bg-zinc-900/60 border border-white/10
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
            placeholder:text-gray-500
            transition-all
            " 
        />
     </div>

      {/* RIGHT — ACTIONS */}
      <div className="flex items-center gap-6">

        <Link
          href="/support"
          className="text-sm underline underline-offset-2 text-gray-300 hover:text-purple-400 transition"
        >
          Contact Support
        </Link>

        <Link
          href="/docs"
          className="text-sm underline underline-offset-2 text-gray-300 hover:text-purple-400 transition"
        >
          Guide
        </Link>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonBox:
                "border border-white/10 rounded-full hover:border-purple-500 transition",
            },
          }}
        />
      </div>
    </div>
  );
};

export default InfoBar;


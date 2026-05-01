"use client";

type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="
      flex items-center justify-between
      bg-gradient-to-r from-black/30 to-black/30
      border border-white/10
      rounded-xl p-5
      shadow-lg
    ">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          {title}
        </h1>

        <p className="text-sm text-zinc-400 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
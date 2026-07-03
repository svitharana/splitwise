import { Sparkles } from "lucide-react";

export default function TopHeader() {
  return (
    <header className="flex px-3 py-2 gap-20 bg-blue-400 w-full">
      <Sparkles size={32} />
      <span className="text-3xl uppercase tracking-wider font-bold">
        Splitwise
      </span>
    </header>
  );
}

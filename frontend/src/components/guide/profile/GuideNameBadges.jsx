import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function GuideNameBadges({ guide }) {
  return (
    <div className="flex items-center gap-2">

      <h1 className="text-3xl text-primary font-bold font-mono">
        {guide?.name}
      </h1>

      {guide?.isVerified && (
        <CheckCircle2 size={20} className="text-primary" title="Verified" />
      )}
      
      {guide?.isTrusted && (
        <ShieldCheck size={20} className="text-amber-500" title="Trusted" />
      )}
    </div>
  );
}
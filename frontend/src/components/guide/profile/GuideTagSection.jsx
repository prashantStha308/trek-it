import Badge from "@/components/ui/Badge";


export default function GuideTagSection({ title, items, variant = "default", icon: Icon, capitalize = false }) {
  
  if (!items?.length) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-text/50 uppercase tracking-wide">
        {title}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item} variant={variant} className={capitalize ? "capitalize" : ""}>
            {Icon && <Icon size={11} className="mr-1" />}
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
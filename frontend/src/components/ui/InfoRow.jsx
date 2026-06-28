export default function InfoRow ({ label, value }){

    return (
        <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
            
            <span
                className="text-xs text-text/75 uppercase tracking-wide"
            >
                {label}
            </span>
            
            <span
                className="text-sm font-medium text-text"
            >
                {value}
            </span>

        </div>
    );

}

export default function Card({ title, children }) {
    return (
        <div className="border border-border rounded-lg px-4 py-4 flex flex-col gap-3">
            <h2 className="font-semibold text-text text-base">{title}</h2>
            {children}
        </div>
    );
}
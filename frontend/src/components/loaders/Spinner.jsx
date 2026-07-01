export default function Spinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
        </div>
    );
}
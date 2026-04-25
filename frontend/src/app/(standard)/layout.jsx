import Navbar from "@/components/layout/Navbar";


export default function StandardLayout({ children }) {
    return (
        <section
            className="flex flex-col gap-2 justify-between min-h-screen"
        >
            <Navbar />
            
            <main className="isolate w-full px-4 py-2 flex-1 flex flex-col">
                {children}
            </main>
        </section>
    )
}
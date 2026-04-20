import Navbar from "@/components/layout/Navbar"

export default function LandingLayout({ children }) {
    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 z-50 mb-5"
            >
                <Navbar />
            </div>

            <main className="mt-14">
                {children}
            </main>
        </>
    )
}
export default function BookingCard({pkg}) {
    return (
        <section
            className="border border-border rounded-xl p-4 flex flex-col sticky left-5 top-15 w-md "
        >
            <header
                className="w-full h-44 rounded-t-xl bg-primary/45"
            >
                {pkg.name}
            </header>
            

        </section>
    )
}

import SkeletonBlock from "@/components/loaders/SkeletonBlock";


export default function GuideProfieSkeleton() {
    return (
        <section className="w-xs 2xl:w-lg 2xl:w-80 rounded-lg px-4 py-2 overflow-hidden flex flex-col rounded-t-lg">

            <header className="relative w-full py-2 flex flex-col items-center gap-1 bg-neutral-900/15 rounded-t-lg border border-border/60 border-b-transparent">


                <div className="flex justify-end w-full relative px-3">
                    <SkeletonBlock className="rounded-full h-5 w-20" />
                </div>


                <SkeletonBlock className="rounded-full w-32 h-32" />


                <div className="flex justify-start w-full relative px-3">
                    <SkeletonBlock className="rounded-full h-5 w-16" />
                </div>
            </header>

            <section className="bg-white dark:bg-slate-700/15 w-full min-h-24 flex flex-col gap-4 px-4 py-2 pb-4 rounded-b-lg border border-border border-t-transparent">

                <article className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <SkeletonBlock className="w-24 h-3.5 rounded-xs" />
                        <SkeletonBlock className="rounded-full h-5 w-16" />
                    </div>

                    <div className="flex items-center gap-1">
                        <SkeletonBlock className="w-12 h-2.5 rounded-xs" />
                        <SkeletonBlock className="w-10 h-2.5 rounded-xs" />
                        <SkeletonBlock className="w-16 h-2.5 rounded-xs" />
                    </div>
                </article>

                <article className="flex gap-1 flex-wrap">
                    {[1, 2, 3, 4].map((_, index) => (
                        <SkeletonBlock key={index} className="rounded-full h-4 w-12" />
                    ))}
                </article>

                <article className="flex justify-between items-center">
                    <SkeletonBlock className="rounded-md h-9 w-20" />
                    <SkeletonBlock className="rounded-md h-9 w-20" />
                </article>

                <SkeletonBlock className="rounded-md h-9 w-full" />

            </section>

        </section>
    );
};
import SkeletonBlock from "@/components/loaders/SkeletonBlock";


export default function PackageCardSkeleton (){
    return (
        <article className="w-xs bg-secondary/16 rounded-xl border border-black/10 overflow-hidden">

            <SkeletonBlock className="w-full h-44" />

            <div className="p-4 flex flex-col gap-3">

                <SkeletonBlock className="w-32 h-4 rounded-xs" />


                <div className="flex items-center gap-2">
                    <SkeletonBlock className="w-8 h-8 rounded-full" />
                    <SkeletonBlock className="w-28 h-2 rounded-xs" />
                </div>


                <div className="flex flex-wrap gap-1">
                    {[1, 2].map((_, index) => (
                        <SkeletonBlock key={index} className="rounded-full h-4 w-14" />
                    ))}
                </div>

                <div className="flex flex-wrap gap-1">
                    {[1, 2, 3].map((_, index) => (
                        <SkeletonBlock key={index} className="rounded-full h-4 w-14" />
                    ))}
                </div>

                <div className="border-t border-black/8 pt-3 flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <SkeletonBlock className="w-32 h-2 rounded-xs" />
                        <SkeletonBlock className="w-32 h-4 rounded-xs" />
                    </div>
                    <SkeletonBlock className="w-18 h-7 rounded-sm" />
                </div>
            </div>
        </article>
    );
};

import GuideProfieSkeleton from "@/components/loaders/GuideProfieSkeleton"
import PackageCardSkeleton from "@/components/loaders/PackageCardSkeleton"


export default function LoadingSection({
    label,
    card = "package",
    count = 4,
    gridColsClasses = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
}) {
    const Skeleton = card === "package" ? PackageCardSkeleton : GuideProfieSkeleton;
 
    return (
        <section className="flex flex-col items-center w-full gap-4 px-5">
            {label && (
                <h2 className="text-text text-2xl font-bold text-left w-full">
                    {label}
                </h2>
            )}
 
            <section className={`w-full grid gap-8 ${gridColsClasses} justify-items-center`}>
                {Array.from({ length: count }).map((_, index) => (
                    <Skeleton key={index} />
                ))}
            </section>
        </section>
    );
}

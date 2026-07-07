import PackageDetailedCard from "@/components/package/PackageDetailedCard";
import PackageCardSkeleton from "@/components/loaders/PackageCardSkeleton";
import EmptySection from "@/components/layout/EmptySection";

export default function GuidePackagesSection({
    packages = [], isLoading = false,
    skeletonCount = 3,
    user
}) {
    if (isLoading) {
        return (
            <section className="flex flex-col gap-4">
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <PackageCardSkeleton key={index} />
                ))}
            </section>
        );
    }

    if (!packages?.length) {
        return <EmptySection />;
    }

    return (
        <section className="grid grid-cols-2 gap-4">
            {packages.map((pkg) => (
                <PackageDetailedCard key={pkg?._id} item={pkg} me={user}/>
            ))}
        </section>
    );
}
import { Bookmark } from "lucide-react";

export default function TouristWishlistBadge({ tourist }) {

    const total = tourist?.wishlist?.length ?? 0;

    return (
        <span className="w-fit flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary">

            <Bookmark size={13} />

            {total} wishlist {total === 1 ? "item" : "items"}

        </span>
    );

}
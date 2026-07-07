import { Heart } from "lucide-react";

export default function TouristInterestsRow({ tourist }) {

    const interests = tourist?.interests ?? [];

    return (
        <div className="flex items-center gap-2 text-sm text-text/70">

            <Heart
                size={14}
                className="text-red-400 fill-red-400"
            />

            <span className="font-medium">
                Interests:
            </span>

            <span>

                {interests.length
                    ? interests.join(", ")
                    : "None added"}

            </span>

        </div>
    );

}
import { Languages } from "lucide-react";

export default function TouristLanguagesRow({ tourist }) {

    const langs = tourist?.preferredLanguages ?? [];

    return (
        <div className="flex items-center gap-2 text-sm text-text/70">

            <Languages size={14} />

            <span className="font-medium">
                Languages:
            </span>

            <span>

                {langs.length
                    ? langs.join(", ")
                    : "None added"}

            </span>

        </div>
    );

}
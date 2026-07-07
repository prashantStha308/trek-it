import {
    MapPin,
    Venus,
    Mars,
} from "lucide-react";

export default function TouristMetaRow({ tourist }) {

    return (
        <div className="flex items-center gap-3 text-sm text-text/60">

            <span className="capitalize">
                {tourist?.role}
            </span>

            {tourist?.address?.country && (

                <span className="flex items-center gap-1 capitalize">

                    <MapPin size={13} />

                    {tourist.address.country}

                </span>

            )}

            {tourist?.gender &&
                tourist?.age && (

                <span className="flex items-center gap-1 capitalize">

                    {tourist.gender === "female"
                        ? <Venus size={13} />
                        : <Mars size={13} />}

                    {tourist.gender}, {tourist.age}

                </span>

            )}

        </div>
    );

}
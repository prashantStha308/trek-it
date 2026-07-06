import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import CitySelector from "@/components/input/CitySelector";
import TextInput from "@/components/input/TextInput";

const STOP_TYPES = ["meetpoint", "overnight", "rest", "checkpoint", "other"];

const createEmptyStop = ({ stopIndex, nearestCity = null, type = "meetpoint" }) => ({
    day: stopIndex + 1,
    landmark: "",
    nearestCity: nearestCity,
    type: type,
    customType: "",
});


function ItineraryStop({ stop, stopIndex, onStopChange, onStopRemove, onAddStop, isLastStop, atLimit }) {

    const handleFieldChange = ({ target: { name, value } }) => {
        onStopChange(stopIndex, { ...stop, [name]: value });
    };

    const handleNearestCityChange = (selectedCity) => {
        onStopChange(stopIndex, {
            ...stop,
            nearestCity: selectedCity,
        });
    };

    const handleTypeChange = ({ target: { value } }) => {
        onStopChange(stopIndex, {
            ...stop,
            type: value,
            customType: "",
        });
    };

    return (
        <div className="flex flex-col gap-3 border border-border rounded-lg p-4 bg-primary/5">

            {/* Stop number + remove */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Stop {stopIndex + 1}
                </span>
                <button
                    type="button"
                    onClick={() => onStopRemove(stopIndex)}
                    className="text-text/40 hover:text-red-500 transition-colors cursor-pointer p-1 border rounded-md"
                >
                    <Trash2 size={15} />
                </button>
            </div>

            {/* Day + Stop type row */}
            <div className="flex gap-3">
                <TextInput
                    type="number"
                    name="day"
                    label="Day"
                    placeholder="1"
                    value={stop.day}
                    handleChange={handleFieldChange}
                />

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-text/75 pl-1">Stop Type:</label>
                    <div className="flex items-center border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-1">
                        <select
                            name="type"
                            value={stop.type}
                            onChange={handleTypeChange}
                            className="outline-none flex-1 bg-transparent text-sm text-text/75 cursor-pointer"
                        >
                            {STOP_TYPES.map((stopType) => (
                                <option key={stopType} value={stopType}>
                                    {stopType.charAt(0).toUpperCase() + stopType.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Custom type — only visible when "other" is selected */}
            {stop.type === "other" && (
                <TextInput
                    name="customType"
                    label="Describe the stop type"
                    placeholder="e.g. Scenic viewpoint, Prayer ceremony..."
                    value={stop.customType}
                    handleChange={handleFieldChange}
                />
            )}

            {/* Landmark — specific trekking spot, free text */}
            <TextInput
                name="landmark"
                label="Landmark / Spot"
                placeholder="e.g. Thorong La Pass, Annapurna Base Camp..."
                value={stop.landmark}
                handleChange={handleFieldChange}
            />

            {/* Nearest town + Add stop button row */}
            <div className="flex justify-between items-end">
                <CitySelector
                    label="Nearest City:"
                    city={stop.nearestCity}
                    setCity={handleNearestCityChange}
                />

                {isLastStop && !atLimit && (
                    <Button
                        type="button"
                        size="sm"
                        className="w-fit"
                        onClick={onAddStop}
                    >
                        <Plus size={13} />
                        <span>Add Stop</span>
                    </Button>
                )}
            </div>

        </div>
    );
}

export default function ItineraryBuilder({ stops, daysAlloted, onChange }) {

    const atLimit = daysAlloted > 0 && stops.length >= daysAlloted;

    const handleAddStop = () => {
        if (atLimit) return;

        const lastStop = stops[stops.length - 1];

        onChange([
            ...stops,
            createEmptyStop({
                stopIndex: stops.length,
                nearestCity: lastStop?.nearestCity ?? null,
                type: lastStop?.type ?? "meetpoint" 
            })
        ]);
    };

    const handleStopChange = (stopIndex, updatedStop) => {
        const updatedStops = stops.map((stop, index) =>
            index === stopIndex ? updatedStop : stop
        );
        onChange(updatedStops);
    };

    const handleStopRemove = (stopIndex) => {
        const remainingStops = stops.filter((_, index) => index !== stopIndex);
        onChange(remainingStops);
    };

    return (
        <div className="flex flex-col gap-3 w-full">

            <label className="text-xs text-text/75 pl-1">Itinerary / Milestones:</label>

            {stops.length === 0 ? (
                <div
                    onClick={handleAddStop}
                    className="border border-dashed border-border rounded-lg px-4 py-8 flex flex-col items-center gap-2 text-text/40 cursor-pointer hover:border-primary/50 hover:text-primary/50 transition-colors"
                >
                    <Plus size={20} />
                    <span className="text-xs">Click to add your first stop</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {stops.map((stop, stopIndex) => (
                        <ItineraryStop
                            key={stopIndex}
                            stop={stop}
                            stopIndex={stopIndex}
                            onStopChange={handleStopChange}
                            onStopRemove={handleStopRemove}
                            onAddStop={handleAddStop}
                            isLastStop={stopIndex === stops.length - 1}
                            atLimit={atLimit}
                        />
                    ))}
                </div>
            )}

            {atLimit && (
                <p className="text-xs text-text/50 pl-1">
                    Max stops ({daysAlloted}) reached for the days allotted.
                </p>
            )}

        </div>
    );
}
"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { showToast } from "@/store/ui.store";
import { useCreateBooking } from "@/queries/booking.query";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const getDefaultDateTime = () => {
  const nextTime = new Date();
  nextTime.setMinutes(nextTime.getMinutes() + 60);

  return nextTime
    .toLocaleString("sv-SE", { hour12: false })
    .replace(" ", "T")
    .slice(0, 16);
};

export default function BookingForm({ pkg }) {
  const [travelDate, setTravelDate] = useState(getDefaultDateTime());
  const [groupSize, setGroupSize] = useState(2);
  const [customRequest, setCustomRequest] = useState("");
  const createBooking = useCreateBooking();

  const estimate = useMemo(() => {
    if (!pkg) return 0;

    const people = Number(groupSize) || 1;
    const subtotal = (pkg.pricePerPerson || 0) * people;
    const baseCost = Math.max(subtotal, pkg.startingPrice || 0);

    return baseCost + baseCost * 0.15;
  }, [groupSize, pkg]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pkg?._id) {
      showToast({
        title: "Booking unavailable",
        message: "This package is not ready to book yet.",
      });
      return;
    }

    const selectedSize = Number(groupSize);

    if (!Number.isFinite(selectedSize) || selectedSize < 1) {
      showToast({
        title: "Invalid group size",
        message: "Please choose at least one traveler.",
      });
      return;
    }

    if (pkg.maxGroupSize && selectedSize > pkg.maxGroupSize) {
      showToast({
        title: "Group size exceeded",
        message: `This package allows up to ${pkg.maxGroupSize} travelers.`,
      });
      return;
    }

    const payload = {
      packageId: pkg._id,
      date: new Date(travelDate).toISOString(),
      groupSize: selectedSize,
      customRequest: customRequest.trim() || undefined,
    };

    try {
      await createBooking.mutateAsync(payload);
      setCustomRequest("");
    } catch {
      // The mutation hook already surfaces the toast error message.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-primary/5 px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-text/50">
          Estimated total
        </p>
        <p className="mt-1 text-xl font-semibold text-text">
          {formatCurrency(estimate)}
        </p>
        <p className="mt-1 text-xs text-text/60">
          {pkg?.startingPrice
            ? `From ${formatCurrency(pkg.startingPrice)} • `
            : ""}
          {pkg?.pricePerPerson
            ? `${pkg.pricePerPerson} per person`
            : "Custom pricing"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="travelDate" className="text-xs text-text/70">
          Travel date
        </label>
        <input
          id="travelDate"
          type="datetime-local"
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          min={getDefaultDateTime()}
          className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-text outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="groupSize" className="text-xs text-text/70">
          Group size
        </label>
        <input
          id="groupSize"
          type="number"
          min="1"
          max={pkg?.maxGroupSize || 20}
          value={groupSize}
          onChange={(event) => setGroupSize(Number(event.target.value) || 1)}
          className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-text outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="customRequest" className="text-xs text-text/70">
          Special requests (optional)
        </label>
        <textarea
          id="customRequest"
          rows={4}
          value={customRequest}
          onChange={(event) => setCustomRequest(event.target.value)}
          placeholder="Add dietary preferences, pickup notes, or anything your guide should know."
          className="w-full resize-none rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-text outline-none focus:border-primary"
        />
      </div>

      <Button type="submit" variant="form" disabled={createBooking.isPending}>
        {createBooking.isPending ? "Submitting..." : "Confirm booking"}
      </Button>

      <p className="text-[11px] text-text/50">
        Your booking request will be created and a guide will be assigned
        automatically.
      </p>
    </form>
  );
}

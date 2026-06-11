"use client";
import { motion } from "motion/react";
import Image from "next/image"

import Badge from "@/components/ui/Badge";
import Card from "@/components/layout/Card";
import {Button} from "@/components/ui/Button";
import MiniCard from "@/components/ui/MiniCard";

const booking = {
  _id: "6a26e380ca69db63dc038f5d",
  name: "Manaslu Circuit",
  tourist: {
    _id: "6a144926010308d7d3ff3e85",
    name: "Test",
    profilePicture: { publicId: "" },
    gender: "male",
    age: 23,
    address: { country: "nepal", city: "dharan" },
  },
  guide: {
    _id: "69fce49a83f3f3d3f619f658",
    name: "Sita Gurung",
    profilePicture: {
      src: "https://res.cloudinary.com/dgcak4aqm/image/upload/v1778181273/image/iju9ldlkywzfp5wwg4nc.jpg",
      publicId: "image/iju9ldlkywzfp5wwg4nc",
    },
    gender: "female",
    age: 28,
    address: { country: "nepal" },
    rating: 4.8,
    isVerified: true,
  },
  package: {
    _id: "69fce4c383f3f3d3f619f65c",
    name: "Manaslu Circuit",
    guide: "69fce49a83f3f3d3f619f658",
    keywords: ["culture", "scenic", "nature"],
    regions: ["Pokhara", "Dharan"],
    activities: ["cultural immersion"],
    maxGroupSize: 6,
    daysAlloted: 11,
    thumbnail:
      "https://res.cloudinary.com/dgcak4aqm/image/upload/v1778181314/image/s0drwaabsyatcthqbkky.jpg",
    verified: false,
    requiresPermit: true,
  },
  customRequest: null,
  status: "pending",
  date: "2026-06-10T00:00:00.000Z",
  groupSize: 34,
  payment: null,
  totalPrice: 4066.4,
  createdAt: "2026-06-08T15:45:04.897Z",
  updatedAt: "2026-06-08T15:45:04.897Z",
  __v: 0,
};

const STATUS_VARIANT = {
  pending: "amber",
  confirmed: "blue",
  completed: "green",
  cancelled: "red",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
      <span className="text-xs text-text/75 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-medium text-text">{value}</span>
    </div>
  );
}

// function BookingTile(){
// 	return(
		
// 	)
// }


export default function BookingPage() {
  const pkg = booking.package;
  const statusVariant = STATUS_VARIANT[booking.status] || "default";
  const perPerson = (booking.totalPrice / booking.groupSize).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Hero */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={pkg.thumbnail}
          alt={pkg.name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />

        <section className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow">{pkg.name}</h1>
            <p className="text-sm text-white/70 mt-0.5">
              Trek date: {formatDate(booking.date)}
            </p>
          </div>
          <div className="bg-white/75 rounded-xl w-fit" >
          	<Badge variant={statusVariant} size="sm">{booking.status}</Badge>
          </div>
        </section>

      </div>

      {/* Regions & Keywords */}
      <div className="px-4 pt-3 flex flex-wrap gap-2">
        {pkg.regions.map((r) => (
          <Badge key={r} variant="blue" size="xs">{r}</Badge>
        ))}
        {pkg.keywords.map((k) => (
          <Badge key={k} variant="blue" size="xs">{k}</Badge>
        ))}
        {pkg.requiresPermit && <Badge variant="red" size="xs">Permit required</Badge>}
        {pkg.verified && <Badge variant="green" size="xs">Verified</Badge>}
      </div>

      {/* Main grid */}
      <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Left */}
        <div className="md:col-span-2 flex flex-col gap-4">

          <Card title="Your Guide">
            <MiniCard person={booking.guide} subtitle="Lead Guide" />
          </Card>

          <Card title="Package Details">
            <InfoRow label="Activities" value={pkg.activities.join(", ")} />
            <InfoRow label="Duration" value={`${pkg.daysAlloted} days`} />
            <InfoRow label="Max group size" value={pkg.maxGroupSize} />
            <InfoRow
              label="Permit"
              value={
                pkg.requiresPermit
                  ? <Badge variant="red" size="xs">Required</Badge>
                  : <Badge variant="green" size="xs">Not required</Badge>
              }
            />
            <InfoRow
              label="Verified"
              value={
                pkg.verified
                  ? <Badge variant="green" size="xs">Yes</Badge>
                  : <Badge variant="blue" size="xs">Unverified</Badge>
              }
            />
          </Card>

          {booking.customRequest && (
            <Card title="Custom Request">
              <p className="text-sm text-text/70">{booking.customRequest}</p>
            </Card>
          )}

          <Card title="Timeline">
            <div className="flex flex-col gap-3">
              {[
                { label: "Booked on", date: booking.createdAt, color: "bg-accent" },
                { label: "Trek date", date: booking.date, color: "bg-primary" },
              ].map(({ label, date, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                  <div>
                    <p className="text-xs text-text/50 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-medium text-text">{formatDate(date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right sticky */}
        <div className="flex flex-col gap-4 md:sticky md:top-4 md:self-start">

          <Card title="Price Summary">
            <InfoRow label="Group size" value={`${booking.groupSize} people`} />
            <InfoRow label="Per person" value={`$${perPerson}`} />
            <div className="flex items-center justify-between pt-2 mt-1">
              <span className="text-sm font-semibold text-text">Total</span>
              <span className="text-lg font-bold text-primary">${booking.totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-text/40 mt-1">
              Includes 15% platform commission. Held in escrow until trek completion.
            </p>
          </Card>

          <Card title="Booking Status">
            <div className="flex items-center gap-2">
              <Badge variant={statusVariant} size="sm">{booking.status}</Badge>
              <Badge variant={booking.payment ? "green" : "red"} size="sm">
                {booking.payment ? "Paid" : "Unpaid"}
              </Badge>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {!booking.payment && (
                <Button variant="primary" size="sm">Pay now</Button>
              )}
              {booking.status === "pending" && (
                <Button variant="outline" size="sm">Cancel booking</Button>
              )}
            </div>
          </Card>

        </div>
      </div>
    </motion.div>
  );
}
import {Link} from "next/navigation";
import {motion} from "motion/react";
import {useRouter} from "next/navigation";

import {useGetMe} from "@/queries/auth.query.js";
import useChatStore from "@/store/chat/chat.store.js";

import {
  MapPin, Calendar,
  Clock, ArrowRight, UserRound
} from "lucide-react"
import {
  LinkButton,
  Button
} from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";


const STATUS_CONFIG = {
  active:    { label: "Ongoing", badge: "blue", card: "bg-accent/10 border-accent/40" },
  confirmed: { label: "Confirmed", badge: "green", card: "bg-primary/15 border-primary/40" },
  pending:   { label: "Pending", badge: "amber", card: "bg-amber-400/10 border-amber-400/50" },
  completed: { label: "Completed", badge: "default", card: "bg-secondary/20 border-secondary-dark/40" },
  cancelled: { label: "Cancelled", badge: "red", card: "bg-red-500/10 border-red-500/40" },
  expired:   { label: "Expired", badge: "red", card: "bg-red-500/10 border-red-500/40" },
};

const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });



function GuideInfo({ guide }) {
  if (!guide)
    return (
      <span className="text-[13px] text-muted italic flex items-center gap-1.5">
      <Avatar size="xs" />
        Guide pending assignment
      </span>
    );


  return (
    <div className="flex items-center gap-2">
      <Avatar src={guide?.profilePicture?.src} alt={guide?.name} size="xs" />
      <span className="text-[13px] text-muted">{guide.name}</span>
    </div>
  );
}


export default function BookingMiniCard({ booking }) {

    const { data:me, isLoading } = useGetMe();
    const openDirectChat = useChatStore(store => store.openDirectChat);
    const router = useRouter();

    const handleChat = () => {
        const target = me._id === booking.guide?._id ? booking.tourist : booking.guide;
        openDirectChat(target, () => {
            router.push('/chat');
        });
    };

    // status haru
    const isOngoing = booking?.status === "active";
    const isCancelled = booking?.status === "cancelled";
    const isExpired = booking?.status === "expired";

    const cfg = STATUS_CONFIG[booking?.status] ?? STATUS_CONFIG.pending;

    console.log("Booking tourist", booking.tourist);
    console.log("Booking Guide", booking.guide);

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`rounded-xl border p-4 transition-colors ${cfg.card} ${isOngoing ? "border-l-[3px] border-l-success" : ""}`}
    >
      <section className="flex justify-between items-start gap-3 flex-wrap">

        <div className="flex-1 min-w-0">
          {isOngoing && (
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[11px] font-medium text-success">Ongoing trek</span>
            </div>
          )}

          <p className="font-semibold text-[15px] text-foreground mb-0.5 truncate">
            {booking?.package?.name}
          </p>

          <p className="text-[12px] text-muted mb-2.5 flex items-center gap-1">
            <MapPin size={12} className="shrink-0" />
            {
                booking?.package?.regions.map((item, index) => (
                  <span key={index}>{item}{index < booking.package.regions.length - 1 ? "," : ""} </span>
                ))
            }

          </p>
          <GuideInfo guide={booking?.guide} />
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">

          <Badge size="sm" variant={cfg.badge} >
            {cfg.label}
          </Badge>

          <p className="text-[16px] font-bold text-foreground">
            ${booking?.totalPrice.toLocaleString()}
          </p>

        </div>

      </section>

      <div className="border-t border-border/60 mt-3 pt-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[12px] text-muted flex items-center gap-1.5">
            <Calendar size={12} />
            {formatDate(booking?.date)}
          </span>
          <span className="text-[12px] text-muted flex items-center gap-1.5">
            <Clock size={12} />
            {booking?.package?.daysAlloted} days
          </span>
        </div>

        <section className="flex-1 flex justify-end items-center gap-2" >

          {
            (!isCancelled && !isExpired) && (
              <Button
               size="sm"
               variant="primary"
               className="w-fit"
               onClick={handleChat}
             >
                Chat with {me?._id === booking?.guide?._id ? "Tourist" : "Guide"}
              </Button>
              )
          }

              <LinkButton href={`/booking/${booking?._id}`} size="sm" variant="outline">
                <div className="flex  items-center gap-2" >
                  View details <ArrowRight size={12} />
                </div>
              </LinkButton>

        </section>

      </div>
    </motion.section>
  );
}
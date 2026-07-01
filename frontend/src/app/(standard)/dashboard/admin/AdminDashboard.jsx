"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/config/axios.config";
import { useGetMe } from "@/queries/auth.query";
import DashboardHero from "@/components/dashboard/DasboardHero";
import RoleGuard from "@/components/auth/RoleGuard";
import { Button } from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Loader,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("pending"); // pending, approved, rejected
  const [pendingGuides, setPendingGuides] = useState([]);
  const [approvedGuides, setApprovedGuides] = useState([]);
  const [rejectedGuides, setRejectedGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(null);
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [error, setError] = useState(null);

  // Fetch unverified (pending) guides
  const fetchPendingGuides = async () => {
    try {
      const response = await axiosInstance.get("/guide/admin/unverified");
      setPendingGuides(response.data?.data?.docs || []);
    } catch (err) {
      console.error("Failed to fetch pending guides:", err?.response?.data || err);
      setError("Failed to fetch pending guides");
      setPendingGuides([]);
    }
  };

  // Fetch verified (approved) guides
  const fetchApprovedGuides = async () => {
    try {
      const response = await axiosInstance.get("/guide", {
        params: { verified: true },
      });
      setApprovedGuides(response.data?.data?.docs || response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch approved guides:", err?.response?.data || err);
      setApprovedGuides([]);
    }
  };

  // Fetch all guides and filter for rejected status
  const fetchRejectedGuides = async () => {
    try {
      // Get all guides and filter those with isVerified: false but not in pending
      const response = await axiosInstance.get("/guide");
      const allGuides = response.data?.data?.docs || response.data?.data || [];
      // For now, we'll show guides that are not verified
      const filtered = allGuides.filter((g) => !g.isVerified);
      setRejectedGuides(filtered);
    } catch (err) {
      console.error("Failed to fetch rejected guides:", err?.response?.data || err);
      setRejectedGuides([]);
    }
  };

  // Approve guide
  const handleApprove = async (guideId) => {
    setApproving(guideId);
    try {
      const response = await axiosInstance.put(`/guide/admin/${guideId}/verify`);
      if (response.data?.data) {
        setPendingGuides(pendingGuides.filter((g) => g._id !== guideId));
        // Fetch updated lists
        await fetchApprovedGuides();
        setError(null);
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to approve guide";
      console.error("Failed to approve guide:", errorMsg);
      setError(errorMsg);
    }
    setApproving(null);
  };

  // Reject guide
  const handleReject = async (guideId) => {
    setApproving(guideId);
    try {
      const response = await axiosInstance.put(`/guide/admin/${guideId}/reject`);
      if (response.data?.data) {
        setPendingGuides(pendingGuides.filter((g) => g._id !== guideId));
        // Fetch updated lists
        await fetchRejectedGuides();
        setError(null);
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to reject guide";
      console.error("Failed to reject guide:", errorMsg);
      setError(errorMsg);
    }
    setApproving(null);
  };

  // Load all data on mount
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPendingGuides(),
        fetchApprovedGuides(),
        fetchRejectedGuides(),
      ]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  // Render guide card
  const renderGuideCard = (guide, showActions = true) => (
    <div
      key={guide._id}
      className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            {/* Avatar */}
            <Avatar
              src={guide?.profilePicture?.src}
              alt={guide.name}
              size="lg"
            />

            {/* Guide Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{guide.name}</h3>
              <p className="text-sm text-muted-foreground">{guide.email}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Gender</p>
                  <p className="text-sm font-semibold capitalize">
                    {guide?.gender || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Age</p>
                  <p className="text-sm font-semibold">{guide?.age || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Location</p>
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <MapPin size={14} />
                    {guide?.address?.city}, {guide?.address?.country}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Registered
                  </p>
                  <p className="text-sm font-semibold">
                    {new Date(guide.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expand Button */}
          <button
            onClick={() =>
              setExpandedGuide(expandedGuide === guide._id ? null : guide._id)
            }
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {expandedGuide === guide._id ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {expandedGuide === guide._id && (
        <div className="p-6 border-t border-border space-y-4 bg-muted/30">
          {/* About */}
          {guide?.aboutMe && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">About</p>
              <p className="text-sm text-muted-foreground">{guide.aboutMe}</p>
            </div>
          )}

          {/* Languages */}
          {guide?.languages?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.languages.map((lang, idx) => (
                  <Badge key={idx} variant="blue" size="sm">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Regions */}
          {guide?.regions?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Operating Regions
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.regions.map((region, idx) => (
                  <Badge key={idx} variant="blue" size="sm">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Specialities */}
          {guide?.specialities?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Specialities
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.specialities.map((spec, idx) => (
                  <Badge key={idx} variant="green" size="sm">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 bg-card rounded p-3 border border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Packages</p>
              <p className="text-lg font-bold">{guide?.packageCount || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Treks</p>
              <p className="text-lg font-bold">{guide?.trekCount || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="text-lg font-bold">{guide?.rating || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons - Only show for pending guides */}
      {showActions && activeTab === "pending" && (
        <div className="p-6 bg-muted/50 border-t border-border flex gap-3">
          <Button
            onClick={() => handleReject(guide._id)}
            disabled={approving === guide._id}
            variant="outline"
            color="red"
            size="md"
            className="flex-1"
          >
            <XCircle size={18} />
            Reject
          </Button>
          <Button
            onClick={() => handleApprove(guide._id)}
            disabled={approving === guide._id}
            variant="primary"
            color="green"
            size="md"
            className="flex-1"
          >
            <CheckCircle size={18} />
            Approve
          </Button>
        </div>
      )}
    </div>
  );

  const currentGuides =
    activeTab === "pending"
      ? pendingGuides
      : activeTab === "approved"
        ? approvedGuides
        : rejectedGuides;

  return (
    <RoleGuard roles={["admin"]}>
      <section className="px-20 flex flex-col gap-12 py-8">
        {/* Hero Section */}
        <DashboardHero user={user} />

        {/* Admin Section Title */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Guide Management
          </h2>
          <p className="text-muted-foreground">
            Manage guide registrations, approvals, and rejections
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-500">Error</p>
              <p className="text-sm text-red-500/80">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border border-border p-6 bg-card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveTab("pending")}>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {Array.isArray(pendingGuides) ? pendingGuides.length : 0}
            </p>
          </div>
          <div className="rounded-lg border border-border p-6 bg-card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveTab("approved")}>
            <p className="text-sm text-muted-foreground">Approved Guides</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {Array.isArray(approvedGuides) ? approvedGuides.length : 0}
            </p>
          </div>
          <div className="rounded-lg border border-border p-6 bg-card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveTab("rejected")}>
            <p className="text-sm text-muted-foreground">Rejected Guides</p>
            <p className="text-3xl font-bold text-red-500 mt-2">
              {Array.isArray(rejectedGuides) ? rejectedGuides.length : 0}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 border-b border-border">
          {[
            { id: "pending", label: "Pending Approval", icon: "⏱️" },
            { id: "approved", label: "Approved", icon: "✓" },
            { id: "rejected", label: "Rejected", icon: "✕" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Guides List */}
        <div className="space-y-4">
          {/* Refresh Button */}
          <Button
            onClick={async () => {
              setLoading(true);
              await Promise.all([
                fetchPendingGuides(),
                fetchApprovedGuides(),
                fetchRejectedGuides(),
              ]);
              setLoading(false);
            }}
            disabled={loading}
            variant="primary"
            size="md"
            className="w-fit"
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="animate-spin text-primary mr-2" size={24} />
              <span className="text-muted-foreground">Loading guides...</span>
            </div>
          )}

          {/* Empty State */}
          {!loading && Array.isArray(currentGuides) && currentGuides.length === 0 && (
            <div className="rounded-lg border border-border p-12 text-center bg-card">
              <p className="text-2xl mb-2">
                {activeTab === "pending"
                  ? "✓"
                  : activeTab === "approved"
                    ? "👥"
                    : "⚠️"}
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                {activeTab === "pending"
                  ? "All caught up!"
                  : activeTab === "approved"
                    ? "No approved guides yet"
                    : "No rejected guides"}
              </h3>
              <p className="text-muted-foreground mt-2">
                {activeTab === "pending"
                  ? "No pending guide approvals at the moment"
                  : activeTab === "approved"
                    ? "Guides will appear here once approved"
                    : "Guides will appear here once rejected"}
              </p>
            </div>
          )}

          {/* Guides Cards */}
          {!loading &&
            Array.isArray(currentGuides) &&
            currentGuides.map((guide) =>
              renderGuideCard(guide, activeTab === "pending")
            )}
        </div>
      </section>
    </RoleGuard>
  );
}

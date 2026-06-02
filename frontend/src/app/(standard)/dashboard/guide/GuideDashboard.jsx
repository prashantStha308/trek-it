import RoleGuard from "@/components/auth/RoleGuard";
import DashboardHero from "@/components/dashboard/DasboardHero";
import { useGetMe } from "@/queries/auth.query";

export default function GuideDashboard({ user }) {
    return (
        <RoleGuard roles={["guide"]}>
            <section>
                <DashboardHero user={user} />
            </section>
        </RoleGuard>
    );
}

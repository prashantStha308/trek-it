import AuthGuard from "@/components/auth/AuthGuard";
import RoleGuard from "@/components/auth/RoleGuard";

export default function CreateBookingLayout({children}){
	return(
		<AuthGuard>
			<RoleGuard roles={["tourist"]} >
				{children}
			</RoleGuard>
		</AuthGuard>
	)
} 
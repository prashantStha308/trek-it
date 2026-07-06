import AuthGuard from "@/components/auth/AuthGuard";
import RoleGuard from "@/components/auth/RoleGuard";


export default function CollaborationPage({children}){
	return(
		<AuthGuard>
			<RoleGuard roles={["guide"]}>
				{children}
			</RoleGuard>
		</AuthGuard>
	)
}
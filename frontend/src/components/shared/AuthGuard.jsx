import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
    
    const { isLoggedIn } = useAuthStore(store => store.isLoggedIn);
    const router = useRouter();

    // enable this later on

    // if (!isLoggedIn) {
    //     router.push("/login") //create login page later
    // }

    return children;
}
import { useLogout } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import Avatar from "../ui/Avatar";
import { Button } from "../ui/Button";

export default function DashboardHero({ user }) {
  const logout = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout.mutate( undefined,{
      onSettled: () => router.push("/")
    } );
  };

  return (
    <header className="flex items-start gap-14 px-52 ">
      <Avatar src={user?.profilePicture?.src} size={"lg"} />

      <section className="flex flex-col gap-4">
        <section className="flex flex-col gap-0.5">
          <h1 className="text-3xl text-primary font-bold font-mono">
            {" "}
            {user?.name}{" "}
          </h1>
          <span className="capitalize text-sm text-text/60">
            {" "}
            {user?.role}{" "}
          </span>
        </section>

        <textarea
          className="text-sm text-text/85 resize-none w-sm outline-none caret-transparent"
          value={user?.description || "User has not set a description"}
          readOnly
        ></textarea>
      </section>
      <Button variant={"primary"} color={"red"} size={"md"} className={"w-fit"} onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}

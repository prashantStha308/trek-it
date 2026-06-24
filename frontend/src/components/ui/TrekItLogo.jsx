import Link from "next/link";
import Image from "next/image";


export default function TrekItLogo({ src = "/assets/svg/ico_3.svg", size=30 , withText = true }){
	return(
        <Link href="/" className="flex items-center gap-3 w-fit">
            <Image src={src} alt="Trek-It Logo" width={size} height={size} />

            {
            	withText && (
		            <span className="text-2xl font-bold tracking-tight text-text">
		                Trek<span className="text-primary">-It</span>
		            </span>
            	)
            }

        </Link>
	)
}
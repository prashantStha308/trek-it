import { optimizeImageUrl } from "@/utils/utils.helper";
import Image from "next/image";


const sizeClasses = {
	xs: "w-6",
	sm: "w-12",
	md: "w-20",
	lg: "w-32",
	xl: "w-48",
};

export default function Avatar({ src, size = "lg", alt = "Profile Picture" }) {
	return (
		<figure
			className={`relative aspect-square ${
				sizeClasses[size] || sizeClasses.lg
			}`}
		>
			<Image
				src={optimizeImageUrl(src, 800) || "/assets/svg/defaultPfp.svg"}
				alt={alt}
				fill
				className="object-cover object-top rounded-full"
			/>
		</figure>
	);
}
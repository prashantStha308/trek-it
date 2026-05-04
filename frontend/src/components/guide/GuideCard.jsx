import Image from "next/image"
import { optimizeImageUrl } from "@/utils/utils.helper";



export default function GuideCard() {

    const item = {
        _id: '69f2f8ef9f4ef64690da7aed',
        name: 'Anita Shrestha',
        email: 'guide31777531115539@trek.com',
        profilePicture: {
            src: 'https://res.cloudinary.com/dgcak4aqm/image/upload/v1777531118/image/u1kmdmag9ehiqbou2nqe.jpg',
            publicId: 'image/u1kmdmag9ehiqbou2nqe'
        },
        role: 'guide',
        gender: 'female',
        age: 50,
        address: { country: 'nepal' },
        languages: [ 'english', 'nepali' ],
        regions: [ 'Everest', 'Annapurna' ],
        collaborations: [],
        specialities: [],
        packageCount: 0,
        isVerified: false,
        isAvailable: true,
        rating: 0,
        daysBooked: [],
    }



    return (
        <div className="w-72 border border-border rounded-xl p-4 flex flex-col gap-3 bg-background">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/50 overflow-hidden flex-shrink-0">
                    {
                        item?.profilePicture?.src
                        ?
                        <Image
                            src={optimizeImageUrl(item.profilePicture.src, 800)}
                            alt={item.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            />
                        : 
                        <div className="w-full h-full flex items-center justify-center text-text/40 text-lg font-semibold">{item?.name?.[0]}</div>
                    }
                </div>
                <div>
                    <p className="text-sm font-medium text-text">{item?.name}</p>
                    <p className="text-xs text-text/50">{item?.age} · {item?.gender}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-1">
                {item?.regions?.map(r => (
                    <span key={r} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{r}</span>
                ))}
            </div>
            <div className="flex flex-wrap gap-1">
                {item?.specialities?.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{s}</span>
                ))}
            </div>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-text/50">⭐ {item?.rating ?? 0}</span>
                <button className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg">View Profile</button>
            </div>
        </div>
    );
};
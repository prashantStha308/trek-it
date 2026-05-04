import Image from "next/image";
import { optimizeImageUrl } from "@/utils/utils.helper";
import { Star } from "lucide-react";



const RatingStar = ({ rating, size = 15 }) => {
  // clamp rating between 0 and 5
  const clamped = Math.max(0, Math.min(5, rating));
  const fillPercent = (clamped / 5) * 100;

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      {/* Empty star */}
      <Star
        size={size}
        className="text-neutral-400"
      />

      {/* Filled part */}
      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fillPercent}%` }}
      >
        <Star
          size={size}
          className="text-yellow-400 fill-yellow-400"
        />
      </div>
    </div>
  );
};

const LanguageList = ({guide}) => {
    return (
        <div className='text-xs text-neutral-600 flex gap-1' >
            {
                guide.languages.length > 3 ?
                    (
                        <>
                            { guide.languages.slice(0, 3).map((item, index) => (
                                <span
                                    key={index}
                                    className='bg-neutral-300 rounded-full px-2 py-1 hover:bg-neutral-400 hover:text-neutral-700 cursor-pointer'
                                >
                                    {item }
                                </span>
                            ))}
                            < span
                                className='bg-neutral-300 rounded-full px-2 py-1 hover:bg-neutral-400 hover:text-neutral-700 cursor-pointer'
                            >
                            +{guide.languages.length - 3}
                            </span>
                        </>
                    )
                :

                guide.languages.map((item, index) => (
                    <span
                        key={index}
                        className='bg-neutral-300 rounded-full px-2 py-1 hover:bg-neutral-400 hover:text-neutral-700 cursor-pointer'
                    >
                        {item }
                    </span>
                ) )
            }
        </div>
    )
}


const GuideProfileCard = () => {

    const guide = {
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
        <div className="relative max-w-sm min-h-96 rounded-sm shadow-neutral-400 shadow-md ">

            {/* Availability indicator */}
            <div
                className={` absolute top-4 left-4 w-4 h-4 rounded-full ${guide.isAvailable ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            
            <Image
                src={ optimizeImageUrl(guide.profilePicture.src, 800) } alt={guide.name}
                width={400}
                height={400}
                className="w-full h-72 aspect-video object-cover object-center"
            />
            <div className="px-6 py-4 flex flex-col gap-4 ">
                
                <div className='flex flex-col gap-1.5' >
                    <div className='flex justify-between items-center gap-2' >
                        
                        <div className="font-semibold text-sm ">
                            {guide.name} · { guide.gender ? guide?.gender.at(0)?.toUpperCase() : ""} · {guide.age}
                            {/* {guide.name} · M · {guide.age} */}
                        </div>
                    </div>
                    
                    {/* Location and ratings */}
                    <div className='text-xs font-medium text-neutral-600 flex justify-between items-center' >
                        <div className=' ' >
                            <span>📍</span> {guide.address.country}
                        </div>

                        <div className='flex flex-col items-center gap-0.5' >
                            <RatingStar rating={guide.rating} size={18} />
                            {guide.rating}
                        </div>
                    </div>
                    
                    <LanguageList guide={guide} />
                </div>

                <p className="text-gray-700 text-xs line-clamp-2">
                    {guide.bio}
                </p>

                <button
                    className="inline-flex items-center text-white bg-blue-500 box-border border border-blue-500 hover:bg-white hover:text-blue-500 focus:ring-1 shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-1.5 focus:outline-none cursor-pointer transition-all duration-100 ease-in-out "
                >
                    Book Guide
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </button>
            </div>
        </div>
    )
}

export default GuideProfileCard
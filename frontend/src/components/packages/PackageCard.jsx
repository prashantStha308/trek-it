import LanguageList from './Components/LanguageList.jsx'
import RatingStar from "./Components/RatingStar.jsx";
import { useNavigate } from 'react-router-dom';
import usepkgStore from '../../pkg/store/pkg.store.js';
import Image from 'next/image.js';

const PackageCard = ({ pkg }) => {

    console.log(pkg);

    const navigate = useNavigate();
    const setpkg = usepkgStore.getState().setpkg;

    const handleBookingRedirect = () => {
        setpkg(pkg);
        navigate(`/book/${pkg._id}`)
        console.log("clicked");
    }

    return (
        <div className="relative max-w-sm rounded-sm overflow-hidden shadow-neutral-400 shadow-md ">

            {/* Availability indicator */}
            <div
                className={` absolute top-4 left-4 w-4 h-4 rounded-full ${pkg.isAvailable ? "bg-green-500" : "bg-red-500"}`}
            ></div>

            <div
                className={"absolute top-4 right-4 px-2 py-0.5 text-xs text-white font-medium rounded-full bg-blue-500"}
            >
                {pkg.experienceYears} yrs
            </div>
            
            <Image
                src={ pkg.images[0] } alt={pkg.fullName}
                className="w-full aspect-video object-cover object-center"
            />
            <div className="px-6 py-4 flex flex-col gap-4 ">
                
                <div className='flex flex-col gap-1.5' >
                    <div className='flex justify-between items-center gap-2' >
                        
                        <div className="font-semibold text-sm ">
                            {pkg.fullName} · { pkg.gender ? pkg?.gender[0]?.toUpperCase() : ""} · {pkg.age}
                            {/* {pkg.fullName} · M · {pkg.age} */}
                        </div>
                    </div>
                    
                    {/* Location and ratings */}
                    <div className='text-xs font-medium text-neutral-600 flex justify-between items-center' >
                        <div className=' ' >
                            <span>📍</span> {pkg.city}, {pkg.country}
                        </div>

                        <div className='flex flex-col items-center gap-0.5' >
                            <RatingStar rating={pkg.rating} size={18} />
                            {pkg.rating}
                        </div>
                    </div>
                    
                    <LanguageList pkg={pkg} />
                </div>

                <p className="text-gray-700 text-xs line-clamp-2">
                    {pkg.bio}
                </p>

                <button
                    onClick={handleBookingRedirect}
                    className="inline-flex items-center text-white bg-blue-500 box-border border border-blue-500 hover:bg-white hover:text-blue-500 focus:ring-1 shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-1.5 focus:outline-none cursor-pointer transition-all duration-100 ease-in-out "
                >
                    Book pkg
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </button>
            </div>
        </div>
    )
}

export default PackageCard
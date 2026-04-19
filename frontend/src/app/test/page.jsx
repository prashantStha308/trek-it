"use client"

import { PackageCard } from "@/components/packages/PackageCard"

export default function Test() {

    const dummyGuide = {
    name: "Bikram Thapa",
    gender: "male",
    profilePicture: {
        src: "https://randomuser.me/api/portraits/men/42.jpg",
        publicId: "trek-it/guides/bikram-thapa-pfp"
    },
    regions: ["Annapurna", "Mustang", "Manaslu"],
    languages: ["Nepali", "English", "Hindi"]
    }

    const dummyPackage = {
    name: "Annapurna Base Camp Trek",
    description: "A classic high-altitude trek through rhododendron forests, traditional Gurung villages, and dramatic mountain scenery, ending at the foot of the Annapurna massif at 4,130m.",
    guide: dummyGuide,
    collaborators: [],
    keywords: ["annapurna", "base camp", "high altitude", "classic trek"],
    regions: ["Annapurna"],
    activities: ["trekking", "camping", "photography"],
    type: "hiking",
    startingPrice: 350,
    pricePerPerson: 120,
    maxGroupSize: 12,
    daysAlloted: 14,
    rating: 4.7,
    bookingCount: 38,
    images: [
    { 
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800", 
        publicId: "trek-it/packages/abc-1" 
    },
    { 
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800", 
        publicId: "trek-it/packages/abc-2" 
    },
    ],
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800",
    verified: true,
    requiresPermit: true
    }

    return (
        <section>
            <PackageCard item={dummyPackage} />
            
        </section>
    )
}
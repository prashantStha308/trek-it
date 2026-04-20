"use client"

import { PackageCard } from "@/components/packages/PackageCard"
import PackageList from "@/components/packages/PackageList"

export default function Test() {

    const guides = [
        {
            name: "Bikram Thapa",
            gender: "male",
            profilePicture: {
                src: "https://randomuser.me/api/portraits/men/42.jpg",
                publicId: "trek-it/guides/bikram-thapa-pfp"
            },
            regions: ["Annapurna", "Mustang", "Manaslu"],
            languages: ["Nepali", "English", "Hindi"]
        },
        {
            name: "Sita Gurung",
            gender: "female",
            profilePicture: {
                src: "https://randomuser.me/api/portraits/women/65.jpg",
                publicId: "trek-it/guides/sita-gurung-pfp"
            },
            regions: ["Everest", "Khumbu", "Solukhumbu"],
            languages: ["Nepali", "English", "Sherpa"]
        },
        {
            name: "Ramesh Lama",
            gender: "male",
            profilePicture: {
                src: "https://randomuser.me/api/portraits/men/17.jpg",
                publicId: "trek-it/guides/ramesh-lama-pfp"
            },
            regions: ["Langtang", "Helambu", "Gosaikunda"],
            languages: ["Nepali", "Tibetan", "English"]
        },
    ]

    const dummyPackages = [
        {
            name: "Annapurna Base Camp Trek",
            description: "A classic high-altitude trek through rhododendron forests, traditional Gurung villages, and dramatic mountain scenery, ending at the foot of the Annapurna massif at 4,130m.",
            guide: guides[0],
            keywords: ["annapurna", "base camp", "high altitude", "classic"],
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
                { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800", publicId: "trek-it/packages/abc-1" },
            ],
            thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800",
            verified: true,
            requiresPermit: true
        },
        {
            name: "Everest Base Camp Trek",
            description: "The world's most iconic trek, passing through Sherpa villages, ancient monasteries, and glacial moraines to reach the base of the highest mountain on Earth at 5,364m.",
            guide: guides[1],
            keywords: ["everest", "base camp", "khumbu", "iconic"],
            regions: ["Everest"],
            activities: ["trekking", "acclimatization", "photography"],
            type: "hiking",
            startingPrice: 550,
            pricePerPerson: 180,
            maxGroupSize: 10,
            daysAlloted: 16,
            rating: 4.9,
            bookingCount: 91,
            images: [
                { src: "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=800", publicId: "trek-it/packages/ebc-1" },
            ],
            thumbnail: "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=800",
            verified: true,
            requiresPermit: true
        },
        {
            name: "Langtang Valley Trek",
            description: "A quieter alternative to the classic routes, winding through lush valleys, Tamang villages, and high yak pastures with stunning views of Langtang Lirung.",
            guide: guides[2],
            keywords: ["langtang", "valley", "tamang", "off-beat"],
            regions: ["Langtang"],
            activities: ["trekking", "cultural immersion", "wildlife"],
            type: "hiking",
            startingPrice: 280,
            pricePerPerson: 95,
            maxGroupSize: 8,
            daysAlloted: 10,
            rating: 4.5,
            bookingCount: 24,
            thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800",
            images: [
                { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800", publicId: "trek-it/packages/ltv-1" },
            ],
            verified: false,
            requiresPermit: true
        },
        {
            name: "Langtang Valley Trek",
            description: "A quieter alternative to the classic routes, winding through lush valleys, Tamang villages, and high yak pastures with stunning views of Langtang Lirung.",
            guide: guides[2],
            keywords: ["langtang", "valley", "tamang", "off-beat"],
            regions: ["Langtang"],
            activities: ["trekking", "cultural immersion", "wildlife"],
            type: "hiking",
            startingPrice: 280,
            pricePerPerson: 95,
            maxGroupSize: 8,
            daysAlloted: 10,
            rating: 4.5,
            bookingCount: 24,
            thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800",
            images: [
                { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800", publicId: "trek-it/packages/ltv-1" },
            ],
            verified: false,
            requiresPermit: true
        },
        {
            name: "Annapurna Base Camp Trek",
            description: "A classic high-altitude trek through rhododendron forests, traditional Gurung villages, and dramatic mountain scenery, ending at the foot of the Annapurna massif at 4,130m.",
            guide: guides[0],
            keywords: ["annapurna", "base camp", "high altitude", "classic"],
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
                { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800", publicId: "trek-it/packages/abc-1" },
            ],
            thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800",
            verified: true,
            requiresPermit: true
        },
        {
            name: "Everest Base Camp Trek",
            description: "The world's most iconic trek, passing through Sherpa villages, ancient monasteries, and glacial moraines to reach the base of the highest mountain on Earth at 5,364m.",
            guide: guides[1],
            keywords: ["everest", "base camp", "khumbu", "iconic"],
            regions: ["Everest"],
            activities: ["trekking", "acclimatization", "photography"],
            type: "hiking",
            startingPrice: 550,
            pricePerPerson: 180,
            maxGroupSize: 10,
            daysAlloted: 16,
            rating: 4.9,
            bookingCount: 91,
            images: [
                { src: "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=800", publicId: "trek-it/packages/ebc-1" },
            ],
            thumbnail: "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=800",
            verified: true,
            requiresPermit: true
        },
        {
            name: "Langtang Valley Trek",
            description: "A quieter alternative to the classic routes, winding through lush valleys, Tamang villages, and high yak pastures with stunning views of Langtang Lirung.",
            guide: guides[2],
            keywords: ["langtang", "valley", "tamang", "off-beat"],
            regions: ["Langtang"],
            activities: ["trekking", "cultural immersion", "wildlife"],
            type: "hiking",
            startingPrice: 280,
            pricePerPerson: 95,
            maxGroupSize: 8,
            daysAlloted: 10,
            rating: 4.5,
            bookingCount: 24,
            thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800",
            images: [
                { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800", publicId: "trek-it/packages/ltv-1" },
            ],
            verified: false,
            requiresPermit: true
        },
    ]

    return (
        <section>
            <PackageList pkgs={dummyPackages} />       
        </section>
    )
}
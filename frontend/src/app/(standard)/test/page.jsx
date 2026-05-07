"use client"

import GuideProfileCard from "@/components/guide/GuideProfileCard";

export default function Test() {

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
        languages: [ 'english', 'nepali', 'french' ],
        regions: [ 'Everest', 'Annapurna', 'Dharan' ],
        collaborations: [],
        specialities: [],
        packageCount: 0,
        isVerified: true,
        isAvailable: true,
        isTrusted: true, //add this in model kunai bela
        rating: 0,
        trekCount: 0, //add this in model kunai bela as well
        daysBooked: [],
    }

    return (
        <section
            className="h-screen w-full flex justify-center items-center"
        >
            <GuideProfileCard guide={guide} />
        </section>
    )
}
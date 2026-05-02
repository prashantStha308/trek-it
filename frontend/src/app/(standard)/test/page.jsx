"use client"

import { Button } from "@/components/ui/Button"
import Modal from "@/components/ui/Toast"
import useUIStore from "@/store/ui.store"

export default function Test() {
    const showModal = useUIStore(store => store.showModal);

    return (
        <section>
            <Modal />

            {/* <Button text="Show modal" handleClick={() => {
                console.log("Showing modal");
                showModal({ message: "Test click", title: "Testing this Modal" })
            }} /> */}
        </section>
    )
}
import Navbar from "@/components/Navbar"
import { useRouter } from "next/router"

const page = () => {
    const router = useRouter()
    const { label } = router.query

    return (
        <div className="text-white">
            <Navbar />
            <div>
                This is {label} page
            </div>
        </div>
    )
}

export default page
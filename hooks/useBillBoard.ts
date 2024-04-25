import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useBillBoard = () => {
    const { data, error, isLoading } = useSWR('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    console.log(data);
    return { data, error, isLoading }
}

export default useBillBoard;
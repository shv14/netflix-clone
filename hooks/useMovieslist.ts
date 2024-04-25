import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovieslist = () => {
    const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    console.log(data);
    return { data, error, isLoading }
}

export default useMovieslist;
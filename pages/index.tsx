import BillBoard from "@/components/BillBoard";
import InfoModal from "@/components/InfoModal";
import MoviesList from "@/components/MoviesList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModel from "@/hooks/useInfoModel";
import useMovieslist from "@/hooks/useMovieslist";
// import useCurrentuser from "@/hooks/useCurrentuser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
export default function Home() {
  // const { data:user } = useCurrentuser()
  const { data: movies = [] } = useMovieslist()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModel()
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MoviesList title="Trending Now" data={movies} />
        <MoviesList title="My List" data={favorites} />
      </div>
      {/* <h1 className="text-white text-7xl">Netflix clone</h1>
    <p className="text-white">Logged in as: {user?.name}</p>
    <button onClick={()=> signOut()} className="bg-white h-10 w-full">SignOut</button> */}
    </>
  );
}

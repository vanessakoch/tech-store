import { FavoritesClient } from "@/components/FavoriteClient";
import { Navbar } from "@/components/NavBar";


export default function Favorites() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <FavoritesClient />
    </main>
  )
}

import axios from "axios";
import FavoriteList from "@/components/FavoriteList";

export const metadata = {
    title: "Favorites | Dog Breeds",
};

async function getFavorites() {
  // 여기에 원하는 데이터 형태로 임의 값 리턴
  return [
    {
      id: "1",
      name: "Golden Retriever",
      image_url: "https://example.com/golden.jpg",
    },
    {
      id: "2",
      name: "Pomeranian",
      image_url: "https://example.com/pomeranian.jpg",
    },
  ];
}

export default async function FavoritesPage() {
    const favorites = await getFavorites();

    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-800">

            <section className="max-w-4xl mx-auto px-4 py-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-700 mb-2">❤️ Favorite Breed List</h1>
                    <p className="text-gray-600 text-base">
                        Your favorite dog breeds!
                    </p>
                </div>
                <FavoriteList favorites={favorites} />
            </section>
        </div>
    );
}


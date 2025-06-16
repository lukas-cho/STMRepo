import axios from "axios";
import FavoriteList from "@/components/FavoriteList";

export const metadata = {
    title: "Favorites | Dog Breeds",
};

async function getFavorites() {
  return {
    data: [
      {
        id: "036feed0-da8a-42c9-ab9a-57449b530b13",
        type: "breed",
        attributes: {
          name: "Affenpinscher",
          description:
            "The Affenpinscher is a small and playful breed of dog that was originally bred in Germany for hunting small game. They are intelligent, energetic, and affectionate, and make excellent companion dogs.",
          life: { max: 16, min: 14 },
          male_weight: { max: 5, min: 3 },
          female_weight: { max: 5, min: 3 },
          hypoallergenic: true,
        },
        relationships: {
          group: {
            data: {
              id: "f56dc4b1-ba1a-4454-8ce2-bd5d41404a0c",
              type: "group",
            },
          },
        },
      },
    ],
  };
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


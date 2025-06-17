import { DogBreed } from "@/types/DogBreed";

export async function getBreeds(): Promise<DogBreed[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/breeds`, {
    cache: "no-store", // 항상 fresh 데이터 fetch
  });

  if (!res.ok) {
    throw new Error("Failed to fetch breeds");
  }

  const data = await res.json();
  return data;
}

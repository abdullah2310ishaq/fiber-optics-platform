import { HeroCarousel } from "@/components/public/hero-carousel";
import { HomeSections } from "@/components/public/home-sections";
import { getFeaturedProducts } from "@/lib/firestore/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts(6);

  return (
    <div className="-mt-16 overflow-hidden lg:-mt-[4.5rem]">
      <HeroCarousel />
      <HomeSections products={featured} />
    </div>
  );
}

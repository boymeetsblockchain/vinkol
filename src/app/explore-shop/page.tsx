import { CTA } from "@/components/home/cta";
import { Deliver } from "@/components/home/deliver";
import { Navbar } from "@/components/root/__navbar";
import { ShopHero } from "@/components/shop/hero";
import { ShopList } from "@/components/shop/shop-list";

function ShopperPage() {
  return (
    <section>
      <Navbar shop={true} />
      <ShopHero />
      <ShopList />
      <CTA />
      <Deliver />
    </section>
  );
}
export default ShopperPage;

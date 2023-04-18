import Link from "next/link";
import { ArrowRIcon } from "./Icons";
import ProductCardTwo from "./ProductCardTwo";

export default function TopSellingProducts() {
  return (
    <section className="section-wrapper w-full top-selling-product mb-[60px]">
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none">Los productos más vendidos</h1>
          </div>
          <div>
            <Link href='/'>
              <div className="flex space-x-2 items-center">
                <p className="text-base font-600 text-qblack">Ver mas</p>
                <span className="animate-right-dir">
                  <ArrowRIcon/>
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="section-content">
          <div className="section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ">
            <ProductCardTwo/>
            <ProductCardTwo/>
            <ProductCardTwo/>
            <ProductCardTwo/>
          </div>
        </div>
      </div>
    </section>
  )
}

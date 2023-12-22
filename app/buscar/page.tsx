import Masonry_Productos from "@/components/tarjetas/lista-Tarjetas-productos";
import { Suspense } from "react";
import ProductosSkeleton from "@/components/Skeletons/productoSkeleton";

export default async function name() {
    return (
        <div className=" pt-28 h-full sm:w-[85%] w-full">
            <div className=" min-h-screen h-full bg-transparent">
                <Suspense fallback={<ProductosSkeleton />}>
                    <Masonry_Productos texto={""} />
                </Suspense>
            </div>
        </div>
    );
}

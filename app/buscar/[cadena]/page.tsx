// "use client";

import { Suspense } from "react";
import ProductosSkeleton from "@/components/Skeletons/productoSkeleton";

import Masonry_Productos from "@/components/tarjetas/lista-Tarjetas-productos";

export default function Page({ params }: { params: { cadena: string } }) {
    const { cadena } = params;

    return (
        <div className=" pt-28 h-full sm:w-[85%] w-full">
            <div className=" min-h-screen h-full bg-transparent">
                <Suspense fallback={<ProductosSkeleton />}>
                    <Masonry_Productos texto={cadena} />
                </Suspense>
            </div>
        </div>
    );
}

// "use client";

import { Suspense } from "react";
import ProductosSkeleton from "@/components/Skeletons/productoSkeleton";

import Masonry_Productos from "@/components/tarjetas/lista-Tarjetas-productos";
import Fallback_Tarjeta from "@/components/Skeletons/Fallback-Tarjetas";

export default function Page({ params }: { params: { cadena: string } }) {
    const { cadena } = params;

    return (
        <div className=" pt-28 mb-5 h-full sm:w-[85%] w-full">
            <div className=" h-full bg-transparent sm:mx-0 mx-2">
                <Suspense fallback={<Fallback_Tarjeta />}>
                    <Masonry_Productos texto={cadena} />
                </Suspense>
            </div>
        </div>
    );
}

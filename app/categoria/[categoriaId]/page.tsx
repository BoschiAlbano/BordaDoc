import { Suspense } from "react";
import Fallback_Tarjeta from "@/components/Skeletons/Fallback-Tarjetas";
import Masonry_Productos from "@/components/tarjetas/lista-Tajetas-Producto-Categoria";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categorias | BordaDoc",
};

export default function Page({ params }: { params: { categoriaId: string } }) {
    const { categoriaId } = params;

    return (
        <div className=" pt-28 mb-5 h-full sm:w-[85%] w-full">
            <div className=" h-full bg-transparent sm:mx-0 mx-2">
                <Suspense fallback={<Fallback_Tarjeta />}>
                    <Masonry_Productos categoriaId={categoriaId} />
                </Suspense>
            </div>
        </div>
    );
}

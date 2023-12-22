import { Suspense } from "react";
import ProductosSkeleton from "@/components/Skeletons/productoSkeleton";

import Masonry_Productos from "@/components/tarjetas/lista-Tajetas-Producto-Categoria";

export default function Page({ params }: { params: { categoriaId: string } }) {
    const { categoriaId } = params;

    return (
        <div className=" pt-28 h-full sm:w-[85%] w-full">
            <div className=" min-h-screen h-full bg-transparent">
                <Suspense fallback={<ProductosSkeleton />}>
                    <Masonry_Productos categoriaId={categoriaId} />
                </Suspense>
            </div>
        </div>
    );
}

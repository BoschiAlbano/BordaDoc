import Masonry_Productos from "@/components/tarjetas/lista-Tarjetas-productos";
import { Suspense } from "react";
import Fallback_Tarjeta from "@/components/Skeletons/Fallback-Tarjetas";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Productos | BordaDoc",
};

export default async function name() {
    return (
        <div className=" pt-28 mb-5 h-full sm:w-[85%] w-full">
            <div className=" h-full  bg-transparent sm:mx-0 mx-2">
                <Suspense fallback={<Fallback_Tarjeta />}>
                    <Masonry_Productos texto={""} />
                </Suspense>
            </div>
        </div>
    );
}

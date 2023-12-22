import Link from "next/link";
import React, { useState } from "react";

import { categoria } from "@/lib/definiciones";
export default function Desplegable({
    categorias,
}: {
    categorias: categoria[];
}) {
    const [categoriaOpen, SetCategoriaOpen] = useState<boolean>(false);

    return (
        // {/* Categorias Desplegable */}
        <div className="relative">
            <div
                className="button px-3 text-xl font-[inherit] font-extrabold text-[--Texto-Color] relative"
                onMouseEnter={() => SetCategoriaOpen(true)}
                onMouseLeave={() => SetCategoriaOpen(false)}
                onClick={() => SetCategoriaOpen(!categoriaOpen)}
            >
                Categorias
            </div>

            <div
                className={`absolute left-[-50%] shadow-xls w-[200%]  ${
                    categoriaOpen ? "overflow-visible" : "hidden"
                }`}
                onMouseEnter={() => SetCategoriaOpen(true)}
                onMouseLeave={() => SetCategoriaOpen(false)}
            >
                <div className={`relative EfectoCategoria overflow-hidden `}>
                    <div className="bg-[--Desplegable-Categoria] mt-5 pt-3 shadow-xls w-full  rounded-md text-center overflow-hidden">
                        <div className="w-full flex flex-col items-center">
                            {categorias.map((item) => {
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/categoria/${item.id}`}
                                        className="button mb-4 w-44 rounded-xl flex justify-center items-center text-xl font-[roboto]"
                                    >
                                        {item.descripcion}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import Tarjeta from "./tarjeta-Producto";
import Opacidad from "../FrameMotion/opacidad";

import { fetchGetByCategoria } from "@/lib/data";

export default async function Masonry_Productos_Categoria({
    categoriaId,
}: {
    categoriaId: string;
}) {
    const Productos = await fetchGetByCategoria(categoriaId);

    if (!Productos.length) {
        return (
            <>
                <Opacidad>
                    <div className={`Masonry_Productos justify-items-center`}>
                        <h1 className=" text-rose-400">
                            No se encontraron Productos Relacionados...
                        </h1>
                    </div>
                </Opacidad>
            </>
        );
    }

    return (
        <>
            <Opacidad>
                <div
                    className={`Masonry_Productos ${
                        Productos.length >= 1
                            ? "justify-items-center"
                            : "justify-items-start"
                    }`}
                >
                    {Productos.map((item, index) => {
                        return <Tarjeta key={index} item={item} />;
                    })}
                </div>
            </Opacidad>
        </>
    );
}

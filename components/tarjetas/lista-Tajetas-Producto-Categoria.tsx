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

    return (
        <>
            <Opacidad>
                <div className="Masonry_Productos">
                    {Productos.map((item, index) => {
                        return <Tarjeta key={index} item={item} />;
                    })}
                </div>
            </Opacidad>
        </>
    );
}

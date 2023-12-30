import React from "react";
import Tarjeta from "./tarjeta-Producto";
import Opacidad from "../FrameMotion/opacidad";

import { fetchGetByCadena } from "@/lib/data";

export default async function Masonry_Productos({ texto }: { texto: string }) {
    const Productos = await fetchGetByCadena(texto);

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

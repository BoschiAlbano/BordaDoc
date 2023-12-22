import React from "react";
import Agregar from "../bonotes/btn-Agregar-Carrito";
import Corazon from "../bonotes/corazon";

import { producto } from "@/lib/definiciones";

const Tarjeta = ({ item }: { item: producto }) => {
    return (
        <div className="card-productos vibrar">
            <div className="card_box shadow-xl">
                <div className="flex flex-col justify-center items-center overflow-hidden">
                    <div className="absolute left-0 top-0 p-2">
                        <Corazon item={item} />
                        {/* <h1>Corazon</h1> */}
                    </div>

                    <img
                        src={item.url}
                        alt={item.titulo}
                        loading="lazy"
                        className="rounded-t-[0.5rem] w-full"
                    />

                    <p className="font-[roboto] font-extrabold uppercase text-xs sm:text-base text-[--color-Texto] mt-4">
                        ${item.precio} arg
                    </p>

                    <h1
                        className=" w-full px-1 text-center font-[roboto] font-extrabold uppercase text-xs sm:text-base text-[--Texto-Color] mt-2"
                        title={item.titulo}
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {item.titulo}
                    </h1>

                    <div className="mt-4">
                        <Agregar producto={item} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tarjeta;

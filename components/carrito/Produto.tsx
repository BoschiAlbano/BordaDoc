"use client";

import React from "react";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { useFavoritosContext } from "@/lib/hook/favoritosContext";

import { producto } from "@/lib/definiciones";

const ProductoComponent: React.FC<{ P_Original: producto | undefined }> = ({
    P_Original,
}) => {
    const { handleCarritoDelete } = useFavoritosContext();

    const Eliminar = () => {
        P_Original && handleCarritoDelete(P_Original.id);
    };

    return (
        <div className="Grilla_Carrito items-center  hover:bg-[#a8a8a8bd] p-2 w-full h-full shadow-md rounded-lg">
            {/* Imagen */}
            <div className="h-full w-full flex justify-center items-center overflow-hidden">
                <img
                    src={P_Original?.url}
                    alt={P_Original?.titulo}
                    className=" w-full h-[120px] object-contain"
                />
            </div>

            {/* Titulo del Producto */}
            <div className="font-semibold text-sm sm:text-xl w-[100%] h-full text-[--Texto-Color] flex flex-col justify-center items-start gap-2">
                <h1>{P_Original?.titulo}</h1>
                <h1 className=" font-bold">{`$ ${P_Original?.precio}`}</h1>
            </div>

            {/* Eliminar */}
            <div onClick={() => Eliminar()}>
                <DeleteIcon className=" text-[var(--Texto-Color)] cursor-pointer text-[1rem] sm:text-[1.5rem]" />
            </div>
        </div>
    );
};

export default ProductoComponent;

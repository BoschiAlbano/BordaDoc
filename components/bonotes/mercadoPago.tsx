import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import SpinnerMercadoPago from "../Spinner/mercadoPago";
import SpinnerMercadoPago from "../spinner/mercadoPago";
import Link from "next/link";

import { producto } from "@/lib/definiciones";

const MercadoPago = ({ productos }: { productos: producto[] }) => {
    const [loading, setloading] = useState(true);
    const [url, setUrl] = useState(null);

    const [Productos, setProductos] = useState(productos);

    useEffect(() => {
        setProductos(productos);
        setUrl(null);
        setloading(false);
    }, [productos]);

    const handlerClick = () => {
        async function GenerarUrl() {
            setloading(true);
            console.log(Productos);
            try {
                const respuesta = await axios.post(
                    `${process.env.NEXT_PUBLIC_HOST}/api/mercadoPago/checkout`,
                    {
                        Productos,
                    }
                );

                setUrl(respuesta.data.url);

                // Se creo la orden de compra? numero de orden
                console.log(respuesta.data.n_orden);
            } catch (error) {
                console.log(error);
            }

            setloading(false);
        }

        GenerarUrl();
    };

    const calcular = () => {
        const total = productos.reduce((prev: number, acumulador: producto) => {
            return prev + acumulador.precio;
        }, 0);

        return total;
    };

    if (url == null) {
        return (
            <button
                onClick={() => handlerClick()}
                className="w-[25%] min-w-[200px] h-[60px] min-h-[60px] bg-[#08B7ED] rounded-xl border-[3px] shadow-md"
                // href={url}
            >
                {loading ? (
                    <div className="h-full w-full">
                        <SpinnerMercadoPago />
                    </div>
                ) : (
                    <div className="flex flex-row justify-center items-center w-full h-full relative">
                        <img
                            src="/assets/MercadoPago.png"
                            alt="Icono Mercado pago"
                            className=" w-[60px] text-center pl-2 pb-1 ml-1 left-0 absolute"
                        />

                        <h1 className="font-semibold text-white sm:text-xl text-sm text-center pl-6">
                            Generar
                        </h1>
                    </div>
                )}
            </button>
        );
    } else {
        return (
            <Link
                className="w-[25%] relative min-w-[200px] h-[60px] min-h-[60px] flex flex-row bg-[#08B7ED] rounded-xl border-[3px] shadow-md justify-center items-center"
                href={url}
            >
                <img
                    src="/assets/MercadoPago.png"
                    alt="Icono Mercado pago"
                    className=" w-[60px] text-center pl-2 pb-1 ml-1 left-0 absolute"
                />

                <h1 className="font-semibold text-white sm:text-xl text-sm text-center pl-6">
                    {`Pagar $ ${calcular()}`}
                </h1>
            </Link>
        );
    }
};

export default MercadoPago;

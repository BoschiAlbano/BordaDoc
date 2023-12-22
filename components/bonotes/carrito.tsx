"use client";

import React, { useEffect, useState } from "react";
import { useFavoritosContext } from "@/lib/hook/favoritosContext";
import { useApiContext } from "@/lib/hook/apiContext";

import Producto from "../carrito/Produto";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Modulos
import { Autoplay, Pagination } from "swiper/modules";

const Carrito = () => {
    const { carrito } = useFavoritosContext();
    const { BuscarProducto } = useApiContext();
    const [categoriaOpen, SetCategoriaOpen] = useState(false);
    const [cantidad, setCantidad] = useState<number>(0);

    useEffect(() => {
        setCantidad(carrito.length);
    }, [carrito, setCantidad]);

    return (
        <>
            <div>
                {/* icono Carrito */}
                <div
                    data-quantity={`${cantidad}`}
                    className="btn-cart flex justify-center items-center z-[200] cursor-pointer"
                    onMouseEnter={() => SetCategoriaOpen(true)}
                    onMouseLeave={() => SetCategoriaOpen(false)}
                    // onClick={() => SetCategoriaOpen(!categoriaOpen)}
                >
                    <svg
                        className="icon-cart"
                        viewBox="0 0 24.38 30.52"
                        height="30.52"
                        width="24.38"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Carrito</title>
                        <path
                            transform="translate(-3.62 -0.85)"
                            d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                        ></path>
                    </svg>
                    <span className="quantity"></span>
                </div>
                {/* Desplegable */}
                <div
                    className={`absolute left-0 shadow-xls w-screen flex justify-center items-center ${
                        categoriaOpen ? "overflow-visible" : "hidden"
                    }`}
                    onMouseEnter={() => SetCategoriaOpen(true)}
                    onMouseLeave={() => SetCategoriaOpen(false)}
                >
                    <div
                        className={`relative EfectoCategoria overflow-hidden sm:w-[85%] w-[100%] `}
                    >
                        <div
                            className={`h-[auto] bg-[--Desplegable-Categoria] opacity-[1] shadow-xls   rounded-md text-center overflow-hidden `}
                        >
                            <div className=" bg-[--Carrito-Color] w-full h-full flex flex-col items-center  relative  sm:p-2 p-1 overflow-hidden">
                                {cantidad != 0 ? (
                                    <div className=" w-[100%] h-full flex flex-col justify-evenly items-center gap-5 pt-5">
                                        <Swiper
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            freeMode={true}
                                            autoplay={true}
                                            pagination={true}
                                            modules={[Pagination, Autoplay]}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 10,
                                                    autoplay: true,
                                                    pagination: {
                                                        clickable: true,
                                                        dynamicBullets: true,
                                                    },
                                                    freeMode: true,
                                                },
                                            }}
                                            className="mySwiperTarjetas"
                                            id="mySwiperTarjetas"
                                        >
                                            {carrito.map((item, index) => {
                                                return (
                                                    <SwiperSlide
                                                        key={index}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Producto
                                                            P_Original={BuscarProducto(
                                                                item.id
                                                            )}
                                                        />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                ) : (
                                    <h1 className=" text-rose-400">
                                        No hay productos en el carrito
                                    </h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carrito;

// useEffect(() => {
//     setCantidad(carrito.length);
// }, [carrito]);

{
    /* <MercadoPago productos={carrito} /> */
}

/*


                                {carrito.length != 0 ? (
                                    <div className=" w-[100%] h-full flex flex-col justify-evenly items-center gap-5 pt-5">
                                        <Swiper
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            freeMode={true}
                                            autoplay={true}
                                            pagination={true}
                                            modules={[Pagination, Autoplay]}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 10,
                                                    autoplay: true,
                                                    pagination: {
                                                        clickable: true,
                                                        dynamicBullets: true,
                                                    },
                                                    freeMode: true,
                                                },
                                            }}
                                            className="mySwiperTarjetas"
                                            id="mySwiperTarjetas"
                                        >
                                            {carrito.map((item, index) => {
                                                return (
                                                    <SwiperSlide
                                                        key={index}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Producto
                                                            P_Original={BuscarProducto(
                                                                item.id
                                                            )}
                                                        />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>

                                    </div>
                                ) : (
                                    <h1 className=" text-rose-400">
                                        No hay productos en el carrito
                                    </h1>
                                )}

*/

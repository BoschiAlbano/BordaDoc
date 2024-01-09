"use client";

import { useState, useEffect } from "react";

import { useFavoritosContext } from "@/lib/hook/favoritosContext";

// next navigation
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { SeverityType, producto } from "@/lib/definiciones";

// Supabase
import { supabase } from "@/lib/supabase/cliente";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Modulos
import { Autoplay, Pagination } from "swiper/modules";

export default function Ver_Descargas() {
    const { carrito, mostrarAlerta, setCarrito } = useFavoritosContext();

    const [categoriaOpen, SetCategoriaOpen] = useState(false);
    const [Links, setLinks] = useState<
        {
            titulo: string;
            urlDST: string | undefined;
            urlEMB: string | undefined;
        }[]
    >([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // useEffect(() => {
    //     setLinks([
    //         { titulo: "Flores", urlDST: "null", urlEMB: "null" },
    //         { titulo: "Egresados 2022", urlDST: "null", urlEMB: "null" },
    //         { titulo: "Tecnica 2", urlDST: "null", urlEMB: "null" },
    //         { titulo: "Esc Lujan", urlDST: "null", urlEMB: "null" },
    //     ]);
    // }, []);

    useEffect(() => {
        // Obtengo el Estado y el numero de orden
        if (!searchParams) return;

        // const urlparams = new URLSearchParams(window.location.search);
        const urlparams = new URLSearchParams(searchParams);
        const status = urlparams.get("status");
        const n_orden = urlparams.get("preference_id");

        // Buscar la si la orden esta aprobada ? pero ya el stado me dice que esta aprobada 🤔🤔🤔

        if (status === "approved" && n_orden !== null) {
            // Alerta
            mostrarAlerta({
                msj: "Pago Aprobado - Descargando -",
                severity: SeverityType.Success,
            });
            // Descagar archivos
            Descargarall(carrito);
            // Eliminar Carrito
            setCarrito([]);

            // Elimina la url y los parametros
            replace(`${pathname}`);
        } else if (status === "failure") {
            // Alerta
            mostrarAlerta({
                msj: "Pago Fallido",
                severity: SeverityType.Error,
            });
        }
    }, []);

    const Descargarall = async (carrito: producto[]) => {
        let _urls: {
            titulo: string;
            urlDST: string;
            urlEMB: string;
        }[] = [];

        for (const items of carrito) {
            const resultado = await ObtenerLinksTemporales(items.titulo);
            if (resultado) {
                _urls.push(resultado);
            }
        }

        setLinks(_urls);
    };

    const ObtenerLinksTemporales = async (rutaArchivo: string) => {
        try {
            // Obtén el enlace de descarga para el archivo DST
            const { data: DST, error } = await supabase.storage
                .from("logos") // Reemplaza con el nombre de tu bucket
                .createSignedUrl(`${rutaArchivo}.DST`, 3600); // El segundo parámetro es la duración del enlace en segundos

            // Obtén el enlace de descarga para el archivo EMB
            const { data: EMB, error: e } = await supabase.storage
                .from("logos")
                .createSignedUrl(`${rutaArchivo}.EMB`, 3600);

            if (error || e) {
                console.log(error);
                throw error;
            }

            // Descarga el archivo utilizando el enlace
            // window.location.href = data.signedUrl;
            return {
                titulo: rutaArchivo,
                urlDST: DST.signedUrl,
                urlEMB: EMB.signedUrl,
            };
        } catch (error: any) {
            console.error("Error al descargar el archivo:", error.message);
            mostrarAlerta({
                msj: "Error al descargar el archivo",
                severity: SeverityType.Error,
            });
        }
    };

    return (
        <div>
            <button
                className="Btn"
                onMouseEnter={() => SetCategoriaOpen(true)}
                onMouseLeave={() => SetCategoriaOpen(false)}
            >
                <svg
                    className="svgIcon"
                    viewBox="0 0 384 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                </svg>
                <span className="icon2"></span>
                <span className="tooltip sm:flex hidden">Descargas</span>
            </button>

            {/* Desplegable Carrito*/}
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
                            {Links.length != 0 ? (
                                <div className=" w-[100%] h-full flex flex-col justify-evenly items-center gap-5 pt-5">
                                    {/* <h1 className=" text-[1.5rem] font-semibold mb-3 text-[var(--Texto-Color)]">
                                        Descargas
                                    </h1> */}
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        freeMode={true}
                                        autoplay={true}
                                        pagination={true}
                                        modules={[Pagination, Autoplay]}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 3,
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
                                        {Links.map((items, index) => {
                                            return (
                                                <SwiperSlide
                                                    key={index}
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                >
                                                    <div
                                                        key={index}
                                                        className="relative w-full flex flex-col justify-between items-center gap-2 py-5 px-1 hover:bg-[#a8a8a8bd] h-[100px]"
                                                    >
                                                        <h1 className="top-0 left-0 absolute font-extrabold">
                                                            Descargar
                                                        </h1>
                                                        {/* nombre de prodcuto */}
                                                        <h1 className=" text-lg sm:text-2xl text-[var(--Texto-Color)] font-semibold">
                                                            {items.titulo}
                                                        </h1>
                                                        <div className="w-full flex flex-row justify-center items-center gap-5">
                                                            {/* boton de descarga */}
                                                            <button
                                                                className="button-Descarga"
                                                                onClick={() => {
                                                                    // Descarga el archivo utilizando el enlace
                                                                    items.urlDST
                                                                        ? (window.location.href =
                                                                              items.urlDST)
                                                                        : null;
                                                                }}
                                                            >
                                                                <span className="button-content-Descarga">
                                                                    .DST
                                                                </span>
                                                            </button>
                                                            {/* boton de descarga */}
                                                            <button
                                                                className="button-Descarga"
                                                                onClick={() => {
                                                                    // Descarga el archivo utilizando el enlace
                                                                    items.urlEMB
                                                                        ? (window.location.href =
                                                                              items.urlEMB)
                                                                        : null;
                                                                }}
                                                            >
                                                                <span className="button-content-Descarga">
                                                                    .EMB
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>

                                    <h1 className=" text-rose-400 mt-3">
                                        Atencion: Las descargas solo tienen una
                                        duracion de 1hs
                                    </h1>
                                </div>
                            ) : (
                                <>
                                    <h1 className=" text-rose-400">
                                        No hay productos para descargar
                                    </h1>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

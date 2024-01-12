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
import { useLocalStorage } from "@/lib/hook/localStorage/hook";

// icono check
import { IoShieldCheckmark } from "react-icons/io5";
import Tarjeta_Descargar_Producto from "../tarjetas/tarjeta-Descargar-Prodcuto";
interface Descargas {
    titulo: string;
    urlDST: string | undefined;
    urlEMB: string | undefined;
    tiempo: string;
}

export default function Ver_Descargas() {
    const { carrito, mostrarAlerta, setCarrito } = useFavoritosContext();

    const [descargas, setDescargas] = useLocalStorage<Descargas[]>(
        "Descargas",
        []
    );

    const [categoriaOpen, SetCategoriaOpen] = useState(false);
    // const [Links, setLinks] = useState<Descargas[]>([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [cantidad, setCantidad] = useState<number>(0);
    useEffect(() => {
        console.log("Error de hidratacion servidor y cliente...");
        setCantidad(descargas.length);
    }, [descargas, setCantidad]);

    useEffect(() => {
        // Obtengo el Estado y el numero de orden
        if (!searchParams) return;

        // const urlparams = new URLSearchParams(window.location.search);
        const urlparams = new URLSearchParams(searchParams);
        const status = urlparams.get("status");
        const n_orden = urlparams.get("preference_id");

        //❌❌❌ Buscar la si la orden esta aprobada ? pero ya el stado me dice que esta aprobada 🤔🤔🤔 si porque si ponen la url status approved y id cualquiera entonces va a descar de nuevo cualqueir logo

        if (status === "approved" && n_orden !== null) {
            // Alerta
            mostrarAlerta({
                msj: "Pago Aprobado",
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
        let _urls: Descargas[] = [];

        for (const items of carrito) {
            const resultado = await ObtenerLinksTemporales(items.titulo);
            console.log(resultado);
            if (resultado) {
                _urls.push(resultado);
            }
        }

        // Agregar a local storage todas las descargas.
        const nuevosDescargas = [...descargas];
        const des = nuevosDescargas.concat(_urls);
        console.log(des);
        setDescargas(des);
        // setLinks(_urls);
    };

    const ObtenerLinksTemporales = async (rutaArchivo: string) => {
        console.log(rutaArchivo);

        const rutaArchivoDST = `${rutaArchivo}.DST`;
        const rutaArchivoEMB = `${rutaArchivo}.EMB`;

        try {
            // Obtén el enlace de descarga para el archivo DST
            const { data: DST, error } = await supabase.storage
                .from("logos") // Reemplaza con el nombre de tu bucket
                .createSignedUrl(rutaArchivoDST, 3600); // El segundo parámetro es la duración del enlace en segundos

            // Obtén el enlace de descarga para el archivo EMB
            const { data: EMB, error: e } = await supabase.storage
                .from("logos")
                .createSignedUrl(rutaArchivoEMB, 3600);

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
                tiempo: Date.now().toString(),
            };
        } catch (error: any) {
            console.error("Error al descargar el archivo:", error.message);
            console.log("En: " + rutaArchivo);
            mostrarAlerta({
                msj: "Error al descargar el archivo",
                severity: SeverityType.Error,
            });

            return {
                titulo: rutaArchivo,
                urlDST: "",
                urlEMB: "",
                tiempo: Date.now().toString(),
            };
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
                    className={`relative EfectoCategoria overflow-hidden w-[100%] `}
                >
                    <div
                        className={`h-[auto] bg-[--Desplegable-Categoria] opacity-[1] shadow-xls   rounded-md text-center overflow-hidden `}
                    >
                        <div className=" bg-[--Carrito-Color] w-full h-full flex flex-col items-center  relative  sm:p-2 p-1 overflow-hidden">
                            {cantidad != 0 ? (
                                <div className=" w-[100%] h-full flex flex-col justify-evenly items-center pt-5 sm:px-[10%]">
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
                                        {descargas.map((items, index) => {
                                            return (
                                                <SwiperSlide
                                                    key={index}
                                                    style={{
                                                        width: "100%",
                                                        paddingLeft: "1rem",
                                                        paddingRight: "1rem",
                                                    }}
                                                >
                                                    <Tarjeta_Descargar_Producto
                                                        titulo={items.titulo}
                                                        urlDST={items.urlDST}
                                                        urlEMB={items.titulo}
                                                        tiempo={items.tiempo}
                                                        Descargas={descargas}
                                                        setDescargas={
                                                            setDescargas
                                                        }
                                                        key={index}
                                                    />
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>

                                    <h1 className=" text-rose-400">
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

// https://83f0-181-117-24-235.ngrok-free.app/?collection_id=1320557593&collection_status=approved&payment_id=1320557593&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=14798692134&preference_id=1512312240-ea714fa8-0cb8-4525-baac-5c1509257c6b&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

// <div
//     key={index}
//     className="relative w-full flex flex-col justify-between items-center gap-2 pb-5 px-1 hover:bg-[#a8a8a8bd] h-[100px] shadow-xl"
// >
//     <h1 className="top-0 left-0 absolute font-extrabold">Descargar</h1>
//     <div className="top-0 right-0 absolute  text-[var(--Icono-Carrito)] text-[1.5rem] p-1">
//         <IoShieldCheckmark />
//     </div>

//     <h1 className=" bottom-0 right-0 py-1 px-2 absolute font-extrabold text-rose-400">
//         00:33:04hs
//     </h1>

//     {/* nombre de prodcuto */}
//     <h1 className=" text-lg sm:text-2xl text-[var(--Texto-Color)] font-semibold">
//         {items.titulo}
//     </h1>

//     <div className="w-full flex flex-row justify-center items-center gap-5">
//         {/* boton de descarga */}
//         <button
//             className="button-Descarga"
//             onClick={() => {
//                 // Descarga el archivo utilizando el enlace
//                 items.urlDST ? (window.location.href = items.urlDST) : null;
//             }}
//         >
//             <span className="button-content-Descarga">.DST</span>
//         </button>
//         {/* boton de descarga */}
//         <button
//             className="button-Descarga"
//             onClick={() => {
//                 // Descarga el archivo utilizando el enlace
//                 items.urlEMB ? (window.location.href = items.urlEMB) : null;
//             }}
//         >
//             <span className="button-content-Descarga">.EMB</span>
//         </button>
//     </div>
// </div>;

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

    async function ComprobarOrdenPagada(n_orden: string): Promise<boolean> {
        const { data: Orden, error } = await supabase
            .from("Orden")
            .select("*")
            .eq("n_orden", `${n_orden}`);

        if (error) {
            console.log(["Error", error]);
            return false;
        }

        // Verificar si la orden está pagada o no
        if (Orden && Orden.length > 0) {
            const estadoOrden = Orden[0].estado;
            return estadoOrden;
        }
        return false;
    }

    useEffect(() => {
        async function Descargas() {
            // Obtengo el Estado y el numero de orden
            if (!searchParams) return;

            // const urlparams = new URLSearchParams(window.location.search);
            const urlparams = new URLSearchParams(searchParams);
            console.log("URL: ");
            console.log(urlparams);

            const status = urlparams.get("status");
            const n_orden = urlparams.get("merchant_order_id");

            if (status === "approved" && n_orden !== null) {
                // Buscar la si la orden esta aprobada

                if (await ComprobarOrdenPagada(n_orden)) {
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
                } else {
                    mostrarAlerta({
                        msj: `Orden en DB Estado inpaga: ${n_orden}`,
                        severity: SeverityType.Error,
                    });
                    return;
                }
            } else if (status === "failure") {
                // Alerta
                mostrarAlerta({
                    msj: "Pago Fallido",
                    severity: SeverityType.Error,
                });
            }
        }

        Descargas();
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
                                                        urlEMB={items.urlEMB}
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

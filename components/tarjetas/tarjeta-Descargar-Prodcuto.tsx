"use client";

import { useEffect, useRef, useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";

interface Descargas {
    titulo: string;
    urlDST: string | undefined;
    urlEMB: string | undefined;
    tiempo: string;
}

export default function Tarjeta_Descargar_Producto({
    titulo,
    urlDST,
    urlEMB,
    tiempo,
    setDescargas,
    Descargas,
}: {
    titulo: string;
    urlDST: string | undefined;
    urlEMB: string | undefined;
    tiempo: string;
    Descargas: Descargas[];
    setDescargas: React.Dispatch<React.SetStateAction<Descargas[]>>;
}) {
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    // Función para iniciar el contador del reloj
    const iniciarReloj = () => {
        const id = setInterval(() => {
            setTiempoRestante((prevTiempo) => prevTiempo - 1);
        }, 1000); // Intervalo de 1 segundo
        intervalIdRef.current = id;
    };

    // Función para detener el contador del reloj
    const detenerReloj = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };

    // Iniciar el contador cuando se monte el componente
    useEffect(() => {
        if (tiempoRestante === 0) {
            // Tiempo Local Storage
            const restoTiempo = TiempoDescarga(tiempo);
            console.log(restoTiempo);
            if (restoTiempo === 0) {
                EndSetInterval();
                return;
            }
            // Calcular Resto de tiempo
            setTiempoRestante(restoTiempo);
        }

        // Iniciar el contador solo si hay tiempo restante
        if (tiempoRestante > 0) {
            iniciarReloj();
        }

        // Detener el contador cuando se desmonte el componente
        return () => {
            detenerReloj();
        };
    }, [tiempoRestante]);

    const convertirTiempo = (tiem: number) => {
        const horas = Math.floor(tiem / 3600)
            .toString()
            .padStart(2, "0");
        const minutos = Math.floor((tiem % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const segundos = (tiem % 60).toString().padStart(2, "0");

        return { horas, minutos, segundos };
    };

    const { horas, minutos, segundos } = convertirTiempo(tiempoRestante);

    function TiempoDescarga(tiempoLocalStorage: string): number {
        // Milisegundos porfamto timestamp
        // fin en milisegundos - le sumamos 1hs -> 3600000 - porbar con 3min => 180000
        const Fin = Number(tiempoLocalStorage) + 3600000;

        // Actual en milisegundos
        let Actual = Date.now();

        // Comparar
        if (Actual >= Fin) {
            console.log("Ya no puede descargar");
            return 0;
        }
        console.log("Puede descaragr");

        return calcularTiempoRestante(Actual, Fin);
    }

    function calcularTiempoRestante(Inicial: number, Final: number): number {
        console.log([Inicial, Final]);
        const tiempoRestante = Final - Inicial;
        console.log([tiempoRestante]);
        const segundosRestantes = Math.floor(tiempoRestante / 1000);
        console.log([segundosRestantes]);
        return segundosRestantes;
    }

    function EndSetInterval() {
        // eliminar del local storage
        const eliminarDes = [...Descargas];

        const indice = eliminarDes.findIndex(
            (item) => item.tiempo === tiempo.toString()
        );

        if (indice != -1) {
            eliminarDes.splice(indice, 1);
            setDescargas(eliminarDes);
        }
    }

    return (
        <div className="relative w-full flex flex-col justify-between items-center gap-2 pb-5 px-1 hover:bg-[#a8a8a8bd] h-[100px] shadow-lg rounded-lg">
            <h1 className="top-0 left-0 absolute font-extrabold p-1">
                Descargar
            </h1>
            <div
                className={`top-0 right-0 absolute text-[1.5rem] p-1 ${
                    tiempoRestante != 0
                        ? "text-[var(--Icono-Carrito)]"
                        : "text-rose-400]"
                }`}
            >
                <IoShieldCheckmark />
            </div>

            <h1 className=" bottom-0 right-0 py-1 px-2 absolute font-extrabold text-rose-400">
                {horas}:{minutos}:{segundos}hs
            </h1>

            {/* nombre de prodcuto */}
            <h1 className=" text-lg sm:text-2xl text-[var(--Texto-Color)] font-semibold">
                {titulo}
            </h1>

            <div className="w-full flex flex-row justify-center items-center gap-5">
                {/* boton de descarga */}
                <button
                    className="button-Descarga"
                    onClick={() => {
                        // Descarga el archivo utilizando el enlace
                        console.log(urlDST);
                        urlDST ? (window.location.href = urlDST) : null;
                    }}
                >
                    <span className="button-content-Descarga">.DST</span>
                </button>
                {/* boton de descarga */}
                <button
                    className="button-Descarga"
                    onClick={() => {
                        // Descarga el archivo utilizando el enlace
                        console.log(urlEMB);
                        urlEMB ? (window.location.href = urlEMB) : null;
                    }}
                >
                    <span className="button-content-Descarga">.EMB</span>
                </button>
            </div>
        </div>
    );
}

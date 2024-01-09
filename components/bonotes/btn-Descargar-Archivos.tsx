"use client";
import { supabase } from "@/lib/supabase/cliente";

export default function Descargar() {
    const Descargarall = () => {
        const carrito = [1, 2];
        // descargar archivo
        carrito.forEach(async (items) => {
            descargarArchivo(`Egresados 2022.DST`);
            descargarArchivo(`Egresados 2022.EMB`);
        });
    };

    const descargarArchivo = async (rutaArchivo: string) => {
        try {
            // Obtén el enlace de descarga para el archivo
            const { data, error } = await supabase.storage
                .from("logos") // Reemplaza con el nombre de tu bucket
                .createSignedUrl(rutaArchivo, 600); // El segundo parámetro es la duración del enlace en segundos

            if (error) {
                console.log(error);
                throw error;
            }
            console.log("data:");
            console.log(data);

            // Descarga el archivo utilizando el enlace
            window.location.href = data.signedUrl;
        } catch (error: any) {
            console.error("Error al descargar el archivo:", error.message);
        }
    };

    return (
        <div className=" w-full h-auto flex justify-center items-center">
            <button
                className=" p-3 border-[2px]"
                onClick={() => {
                    // descargarArchivo("Egresado.EMB");
                    descargarArchivo("Escudo de Barcelona.rar");
                }}
            >
                Descargar
            </button>
        </div>
    );
}

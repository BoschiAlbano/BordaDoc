"use client";

import React, { useRef, ChangeEvent, useState, useEffect } from "react";

export default function ImagenUpload({
    Error,
    Limpiar,
}: {
    Error: string[] | undefined;
    Limpiar: boolean;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [datos, setDatos] = useState<{ Imagen: File | null }>({
        Imagen: null,
    });

    const handleImagenClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setDatos({ ...datos, Imagen: file });
        }

        console.log(datos.Imagen);
    };

    useEffect(() => {
        if (Limpiar) {
            setDatos({ Imagen: null });
        }
    }, [Limpiar]);

    return (
        <div
            onClick={handleImagenClick}
            className={`bg-[--color-Blanco] rounded-xl h-[180px] w-full flex items-center justify-center overflow-hidden cursor-pointer vibrar ${
                Error ? "border border-red-400" : "border-none"
            }`}
        >
            {datos.Imagen ? (
                <img
                    src={URL.createObjectURL(datos.Imagen)}
                    alt="Imagen sin Foto"
                    className="object-contain w-full h-full"
                />
            ) : (
                <img
                    src="/assets/wilcom/SinFoto.png"
                    alt="Imagen sin Foto"
                    className="object-contain w-full h-full"
                />
            )}

            <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                name="Foto"
                area-aria-describedby="Contactanos-Foto"
            />
        </div>
    );
}

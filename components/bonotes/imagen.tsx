import React, { useRef, ChangeEvent, useState } from "react";

import { DatosFormularioContacto } from "@/lib/definiciones";

interface ImagenUploadProps {
    datos: DatosFormularioContacto;
    setDatos: React.Dispatch<React.SetStateAction<DatosFormularioContacto>>;
}

const ImagenUpload: React.FC<ImagenUploadProps> = ({ datos, setDatos }) => {
    const inputRef = useRef<HTMLInputElement>(null);

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
    };

    return (
        <div
            onClick={handleImagenClick}
            className="bg-[--color-Blanco] rounded-xl h-[180px] w-full flex items-center justify-center overflow-hidden cursor-pointer vibrar"
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
            />
        </div>
    );
};

export default ImagenUpload;

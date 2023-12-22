"use client";

// 🤔 Prodia usar form del servidor

import React, { useState, FormEvent } from "react";
import ImagenUpload from "../bonotes/imagen";
import { GetFormatos } from "@/lib/data";

import { DatosFormularioContacto } from "@/lib/definiciones";

const FormularioContacto = () => {
    const [datos, setDatos] = useState<DatosFormularioContacto>({
        Nombre: "",
        Email: "",
        Imagen: null,
        Alto: "",
        Ancho: "",
        Aplique: "",
        Formato: "",
        Mensaje: "",
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const enviar = async (e: FormEvent) => {
        e.preventDefault();

        console.log(datos);

        // enviar Datos APi

        // const enviar = fetch("", {
        //     method: "POST",
        //     body: { datos },
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        // Limpiar
        setDatos({
            Nombre: "",
            Email: "",
            Imagen: null,
            Alto: "",
            Ancho: "",
            Aplique: "",
            Formato: "",
            Mensaje: "",
        });

        // Use the JS library to download a file.

        // try {
        //     const { data, error } = await supabase.storage
        //         .from("borrar")
        //         .download("SOL SAN JAVIER.EMB");

        //     console.log(data);
        // } catch (error) {
        //     console.log(error.messaje);
        // }
    };

    return (
        <form
            onSubmit={(e) => enviar(e)}
            className="w-full h-full flex flex-col justify-center items-center gap-2 "
        >
            <input
                className=" w-[90%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo] text-center py-2 h-[10%] min-h-[35px] outline-none vibrar"
                type="text"
                placeholder="Nombre"
                name="Nombre"
                id=""
                onChange={(e) => handleChange(e)}
            />
            <input
                className=" w-[90%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar"
                type="email"
                placeholder="Correo Electronico"
                name="Email"
                id=""
                onChange={(e) => handleChange(e)}
            />
            <div className="w-[90%] h-[180px] gap-2 grid grid-cols-2  ">
                {/* img */}
                {/* 
                                                    <img
                                                        src="/assets/wilcom/SinFoto.png"
                                                        alt="Imagen sin Foto"
                                                        className="bg-[--color-Blanco] text-[--color-Texto-Fondo]  rounded-xl h-full object-contain"
                                                    /> */}
                <ImagenUpload setDatos={setDatos} datos={datos} />

                <div className="h-full w-full flex flex-col justify-between items-center">
                    {/* Alto Ancho */}

                    <input
                        className=" w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar"
                        type="text"
                        placeholder="Alto"
                        name="Alto"
                        id=""
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        className=" w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar"
                        type="text"
                        placeholder="Ancho"
                        name="Ancho"
                        id=""
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        className=" w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar"
                        type="text"
                        placeholder="¿Con Aplique?"
                        name="Aplique"
                        id=""
                        onChange={(e) => handleChange(e)}
                    />

                    {/* Formato */}
                    <select
                        name="Formato"
                        id=""
                        className="w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar cursor-pointer"
                        onChange={(e) => handleChange(e)}
                    >
                        {GetFormatos.map((item, index) => {
                            return <option key={index}>{item}</option>;
                        })}
                    </select>
                </div>
            </div>
            <input
                type="text"
                name="Mensaje"
                placeholder="Mensaje"
                id=""
                className=" w-[90%] h-[20%] min-h-[70px] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 outline-none vibrar"
                onChange={(e) => handleChange(e)}
            />
            <button
                className=" w-[90%] rounded-xl text-center py-3 text-2xl font-bold hover:opacity-[0.5] opacity-[0.7] "
                type="submit"
            >
                <h1 className="gradient-text">Enviar...</h1>
            </button>
        </form>
    );
};

export default FormularioContacto;

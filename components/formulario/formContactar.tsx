"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Contactanos } from "@/lib/actions";
import ImagenUpload from "../bonotes/imagen";
import { GetFormatos } from "@/lib/data";
import { useEffect, useRef } from "react";

const FormularioContacto = () => {
    const initialState = {
        message: "",
        errors: {},
    };
    const [state, dispatch] = useFormState(Contactanos, initialState);

    const { pending } = useFormStatus();

    const _form = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (!state.errors) {
            _form.current?.reset();
        }
    }, [state]);

    return (
        <form
            ref={_form}
            action={dispatch}
            className="w-full h-full flex flex-col justify-center items-center gap-2 "
        >
            <input
                key={
                    state?.errors?.Nombre
                        ? "manejalovos"
                        : state?.errors?.Nombre?.toString()
                }
                className={`w-[90%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo] text-center py-2 h-[10%] min-h-[35px] outline-none vibrar  ${
                    state?.errors?.Nombre
                        ? "border border-red-400"
                        : "border-none"
                }`}
                type="text"
                placeholder={`${
                    state?.errors?.Nombre ? state?.errors.Nombre[0] : "Nombre"
                }`}
                defaultValue={""}
                name="Nombre"
                id=""
                area-aria-describedby="Contactanos-Nombre"
            />

            <input
                className={`w-[90%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar ${
                    state?.errors?.Email
                        ? "border border-red-400"
                        : "border-none"
                }`}
                type="email"
                placeholder={`${
                    state?.errors?.Email
                        ? state?.errors.Email[0]
                        : "Correo electronico"
                }`}
                name="Email"
                area-aria-describedby="Contactanos-Email"
                id=""
            />

            <div className="w-[90%] h-[180px] gap-2 grid grid-cols-2  ">
                <ImagenUpload
                    Limpiar={state.errors === undefined ? true : false}
                    Error={state.errors?.Foto}
                />

                <div className="h-full w-full flex flex-col justify-between items-center">
                    {/* // Alto Ancho */}
                    <input
                        className={`w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar ${
                            state?.errors?.Ancho
                                ? "border border-red-400"
                                : "border-none"
                        }`}
                        type="text"
                        placeholder={`${
                            state?.errors?.Alto ? state?.errors.Alto[0] : "Alto"
                        }`}
                        name="Alto"
                        id=""
                        area-aria-describedby="Contactanos-Alto"
                    />
                    <input
                        className={`w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar ${
                            state?.errors?.Ancho
                                ? "border border-red-400"
                                : "border-none"
                        }`}
                        type="text"
                        placeholder={`${
                            state?.errors?.Ancho
                                ? state?.errors.Ancho[0]
                                : "Ancho"
                        }`}
                        name="Ancho"
                        id=""
                        area-aria-describedby="Contactanos-Ancho"
                    />

                    <input
                        className={`w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar ${
                            state?.errors?.Aplique
                                ? "border border-red-400"
                                : "border-none"
                        }`}
                        type="text"
                        placeholder={`${
                            state?.errors?.Aplique
                                ? state?.errors.Aplique[0]
                                : "¿Con Aplique?"
                        }`}
                        name="Aplique"
                        id=""
                        area-aria-describedby="Contactanos-Aplique"
                    />

                    {/* // Formato */}
                    <select
                        name="Formato"
                        id=""
                        className={`w-[100%] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 h-[10%] min-h-[35px] outline-none vibrar cursor-pointer ${
                            state?.errors?.Formato
                                ? "border border-red-400"
                                : "border-none"
                        }`}
                        area-aria-describedby="Contactanos-formato"
                    >
                        {GetFormatos.map((item, index) => {
                            return <option key={index}>{item}</option>;
                        })}
                    </select>

                    {/* Manejo de Errores */}
                    <div
                        id="Contactanos-Formato"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state?.errors?.Formato &&
                            state.errors.Formato.map((error: string) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={error}
                                >
                                    {"Error, Formato invalido..."}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <input
                type="text"
                name="Mensaje"
                placeholder="Mensaje"
                id=""
                className=" w-[90%] h-[20%] min-h-[70px] rounded-xl bg-[--color-Blanco] text-[--color-Texto-Fondo]  text-center py-2 outline-none vibrar"
            />

            {/* Boton */}
            <button className=" w-[90%] rounded-xl text-center py-3 text-2xl font-bold hover:opacity-[0.5] opacity-[0.7] ">
                {pending ? (
                    <h1 className="gradient-text">Enviando Mail...</h1>
                ) : (
                    <h1 className="gradient-text">Enviar...</h1>
                )}
            </button>

            {/* error foto */}
            <div id="Contactanos-Foto" aria-live="polite" aria-atomic="true">
                {state?.errors?.Foto &&
                    state.errors.Foto.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>

            {/*Mensaje */}
            <div aria-live="polite" aria-atomic="true">
                {state?.errors ? (
                    <p className="mt-2 text-sm text-red-500">
                        {state?.message}
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-green-500">
                        {state?.message}
                    </p>
                )}
            </div>
        </form>
    );
};

export default FormularioContacto;

// useFormState + js => no limpia el form / sin js si lo limpia
//     const initialState = {
//     message: "",
//     errors: {},
// };
// const [state, dispatch] = useFormState(Contactanos, initialState);
// const { pending } = useFormStatus();

// Server Actions...
// https://www.youtube.com/watch?v=BCQK4STfzn4
// onSubmit={(e) => {
//     e.preventDefault();
//     const _form = e.target as HTMLFormElement;
//     const _formData = new FormData(_form);
//     Contactanos(_formData).then(() => {
//         _form.reset();
//     });
// }}

// {/* Manejo de Errores */}
// <div id="Contactanos-Nombre" aria-live="polite" aria-atomic="true">
//     {state?.errors?.Nombre &&
//         state.errors.Nombre.map((error: string) => (
//             <p className="mt-2 text-sm text-red-500" key={error}>
//                 {error === "Required"
//                     ? "El campo cliente es requerido"
//                     : error}
//             </p>
//         ))}
// </div>

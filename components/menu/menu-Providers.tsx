"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "../footer";
import { categoria } from "@/lib/definiciones";
import Opacidad from "../FrameMotion/opacidad";
import MenuOculto from "./MenuOculto";
import SwitchMaterial from "../switch";
import Desplegable from "./DesplegableCategoria";
import FormBuscar from "../formulario/formBuscar";
import Carrito from "../bonotes/carrito";
import Link from "next/link";

import { TiThMenu } from "react-icons/ti";
import { ApiContextProvider } from "@/lib/hook/apiContext";
import { FavoritosContextProvider } from "@/lib/hook/favoritosContext";

export default function Providers({
    children,
    categorias,
}: {
    children: React.ReactNode;
    categorias: categoria[];
}) {
    return (
        <>
            <ApiContextProvider>
                <FavoritosContextProvider>
                    {/* Menu */}
                    <Menu categorias={categorias}></Menu>

                    <div className=" h-full w-full flex flex-col items-center relative bg-[--color-Body]">
                        {/* Contenido */}
                        {children}

                        {/* Footer */}
                        <Opacidad>
                            {/* Footer */}
                            <div className="mt-4 w-[100%] shadow-lg overflow-hidden">
                                <Footer categorias={categorias} />
                            </div>
                        </Opacidad>
                    </div>
                </FavoritosContextProvider>
            </ApiContextProvider>
        </>
    );
}

const Menu = ({ categorias }: { categorias: categoria[] }) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const MenuRef = useRef<HTMLInputElement | null>(null);
    const [transparente, setTransparente] = useState<boolean>(false);

    // bloquear el body para que el menu no se mueva
    useEffect(() => {
        // Cuando el componente se monta
        const bloquearScroll = () => {
            document.body.classList.add("menu-open");
        };

        // Cuando el componente se desmonta
        const habilitarScroll = () => {
            document.body.classList.remove("menu-open");
        };

        if (openMenu) {
            bloquearScroll();
        } else {
            habilitarScroll();
        }

        // Asegurarse de eliminar la clase cuando el componente se desmonta
        return () => {
            habilitarScroll();
        };
    }, [openMenu]);

    // hacer transparente el menu al bajar
    useEffect(() => {
        const EventoMenu = () => {
            const _menu = MenuRef.current;
            if (_menu == null) return;

            const { y } = _menu.getBoundingClientRect();

            const _background = y <= -100 ? false : true;
            setTransparente(_background);
        };

        window.addEventListener("scroll", EventoMenu);
        return () => {
            window.removeEventListener("scroll", EventoMenu);
        };
    }, []);

    return (
        <div>
            <header className={` fixed w-full z-20`}>
                {/* <Opacidad> */}
                <div
                    className={`${
                        transparente ? "opacity-[1]" : "opacity-[0.9]"
                    } sm:w-[100%] w-full`}
                >
                    <div className="flex flex-col justify-center items-center">
                        <div className="h-[80px] w-[100%] flex  lg:justify-between justify-center items-center relative bg-[--Secciones-Header]">
                            {/* Logo */}
                            <section className="lg:flex hidden h-full">
                                <div className="h-full flex justify-normal items-center pl-5">
                                    <Link
                                        href={`/`}
                                        className=" cursor-pointer"
                                    >
                                        <img
                                            className="w-[200px]"
                                            src="/assets/wilcom/Logo.png"
                                            alt="BORDA.Doc"
                                        />
                                    </Link>
                                </div>
                            </section>

                            {/* Icono Menu */}
                            <div className="lg:hidden  left-0 px-2 z-[200] h-full flex justify-center items-center">
                                <button
                                    className="text-[--Texto-Color]"
                                    onClick={() =>
                                        setOpenMenu((openMenu) => !openMenu)
                                    }
                                >
                                    {/* <MenuIcon sx={{ fontSize: 35 }} /> */}
                                    <TiThMenu />
                                </button>
                            </div>

                            {/* Buscar y Carrito */}
                            <div className="h-full flex flex-row justify-center items-center ">
                                {/* formulario */}
                                <FormBuscar />
                                {/* Boton Carrito */}
                                <Carrito />
                            </div>

                            {/* Categorias, Contactanos */}
                            <div className="h-full lg:flex hidden justify-center items-center">
                                {/* Desplegable */}
                                <Desplegable categorias={categorias} />

                                <div
                                    className="button px-3 text-xl font-[inherit] font-extrabold text-[#000000b4]"
                                    // onClick={() => ContactanosBtn()}
                                >
                                    Contactanos
                                </div>

                                {/* Boton Dark mode */}
                                <SwitchMaterial />
                            </div>
                        </div>
                    </div>
                </div>
                {/* </Opacidad> */}
                <MenuOculto
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    categorias={categorias}
                />
            </header>

            <div className=" hidden" ref={MenuRef}></div>
        </div>
    );
};

// Contactanos: RefObject<any>;

// const ContactanosBtn = () => {
//     // Contactanos.current.scrollIntoView({
//     //     behavior: "smooth",
//     // });

//     if (Contactanos === null) {
//         navigation.push("/");
//         return;
//     }

//     let Posicion = Contactanos.current.getBoundingClientRect();
//     console.log(Posicion);

//     window.scrollTo({
//         top: window.scrollY + (Posicion.top - 200),
//         behavior: "smooth",
//     });
// };

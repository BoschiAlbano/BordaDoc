import { categoria } from "@/lib/definiciones";
import ListarCategorias from "./ListarCategorias";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import SwitchMaterial from "../switch";

export default function MenuOculto({
    openMenu,
    setOpenMenu,
    categorias,
}: {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    categorias: categoria[];
}) {
    return (
        // {/* Menu Oculto*/}
        <div
            className={`${
                openMenu ? "translate-x-[0%]" : "translate-x-[-100%]"
            } transition-transform duration-300 sm:w-[50%] w-[100%] min-h-[100svh] h-[100%] absolute bg-[--Menu-Desplegable-Color] z-[999] overflow-y-scroll top-0 left-0   `}
            // onClick={() => setOpenMenu(!openMenu)}
        >
            <button
                className="text-[--Texto-Color] absolute top-0 right-0 p-6 z-[888]"
                onClick={() => setOpenMenu(!openMenu)}
            >
                <FaArrowLeft />
                {/* <ClearIcon sx={{ fontSize: 35 }} /> */}
            </button>

            <div className="flex flex-col w-full items-center overflow-y-scroll overflow-x-hidden justify-between h-screen">
                <ListarCategorias datos={categorias} ocultar={setOpenMenu} />

                {/* Boton Dark mode */}
                <SwitchMaterial />

                {/* Iconos Redes */}
                <section className="p-1 w-full rounded-xl flex flex-row justify-evenly items-center">
                    <Link
                        className="w-[10%] min-w-[35px] max-w-[45px] saltar"
                        href={"/facebook"}
                    >
                        <img
                            src="/assets/facebook.png"
                            alt="Logo de Faceboock"
                        />
                    </Link>

                    <Link
                        className="w-[10%] min-w-[35px] max-w-[45px] saltar"
                        href={"/facebook"}
                    >
                        <img
                            src="/assets/instagram.png"
                            alt="Logo de Faceboock"
                        />
                    </Link>

                    <Link
                        className="w-[10%] min-w-[35px] max-w-[45px] saltar"
                        href={"/facebook"}
                    >
                        <img
                            src="/assets/whatsapp.png"
                            alt="Logo de Faceboock"
                        />
                    </Link>
                </section>
            </div>
        </div>
    );
}

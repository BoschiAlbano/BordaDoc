import Opacidad from "@/components/FrameMotion/opacidad";
import FormularioContacto from "@/components/formulario/formContactar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactanos | BordaDoc",
};

export default function contactanos() {
    return (
        <div className="pt-28 pb-20 h-full w-full relative flex flex-col justify-center items-center sm:gap-[10rem] gap-[4rem] ">
            {/* ------------------------- Formulario ------------------------------- */}
            <Opacidad>
                <div className="sm:w-[85%] w-full ">
                    <section
                        // ref={Contactanos}
                        className="sm:w-[100%] flex flex-col justify-center items-center gap-[3rem] Fondo-Degradado p-2"
                    >
                        {/* <h1 className=" text-[--color-Texto] text-4xl font-bold">
                            Contactanos
                        </h1> */}

                        <div className="Grid-Contactanos shadow-xl rounded-[2rem]">
                            <div className="  rounded-[2rem]">
                                <div className="Grid-Contactanos-Hijo">
                                    {/* Parrafo */}
                                    <div className="w-[100%] sm:text-xl text-lg text-[--color-Texto] text-center flex flex-col justify-center items-center">
                                        <p>¿Quieres que diseñemos tu logo?</p>
                                        <p>¿Contactanos?</p>
                                        <p className=" font-bold">
                                            Albanob24@gmail.com
                                        </p>
                                    </div>

                                    {/* Formulario */}
                                    <FormularioContacto />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Opacidad>
        </div>
    );
}

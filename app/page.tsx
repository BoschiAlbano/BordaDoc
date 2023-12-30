import FormularioContacto from "@/components/formulario/formContactar";
import { GetFormatos, fetchGetCategorias } from "@/lib/data";
import { categoria } from "@/lib/definiciones";
import Link from "next/link";
import Formatos from "@/components/formatos/formatos";
import Opacidad from "@/components/FrameMotion/opacidad";
import Gesture from "@/components/FrameMotion/gesture";

export default async function Home() {
    const GetCategorias = await fetchGetCategorias();

    return (
        <div className="pt-28 pb-20 h-full w-full relative flex flex-col justify-center items-center sm:gap-[10rem] gap-[4rem] ">
            {/* ------------------------- Bienvenido ------------------------------- */}
            <Opacidad>
                <div className="sm:w-[85%] w-full my-[1rem]">
                    <section className="w-full flex flex-col justify-center items-center gap-[3rem] relative p-2 rounded-[2rem]">
                        {/* imagen */}
                        <img
                            src="./assets/wilcom/LogoBienvenida.png"
                            alt="Logo de Bienvenida"
                            className="sm:w-[40%] w-[100%]"
                        />
                        {/* Parrafo */}
                        <div className="sm:w-[60%] w-[100%] text-xl text-[--color-Texto] text-center">
                            <p> Bienvenido a Borda.Doc</p>
                            <p>
                                En nuesta pagina podras encontrar mas de 1.000
                                diseños para descargar
                            </p>
                        </div>
                        {/* Componente Formato */}
                        <div className="sm:w-[60%] w-[100%]">
                            <Formatos textos={[".EMB", ".DST", ".PES"]} />
                        </div>
                        {/* Fondo Degradado */}
                        <div className="Fondo-Degradado absolute w-full h-full"></div>
                    </section>
                </div>
            </Opacidad>

            {/* ------------------------- Contactanos ------------------------------- */}
            <Opacidad>
                <div className="sm:w-[85%] w-full my-[1rem]">
                    <section className="w-full flex flex-col justify-center items-center gap-[3rem] relative p-2 rounded-[2rem]">
                        {/* imagen */}
                        <img
                            src="./assets/wilcom/DiseñamosTuLogo.png"
                            alt="Logo de Bienvenida"
                            className="sm:w-[50%] w-[100%]"
                        />
                        {/* Parrafo */}
                        <div className="sm:w-[60%] text-xl text-[--color-Texto] text-center">
                            <p> Contactanos y Diseñamos tu logo</p>
                        </div>
                        {/* Componente Formato */}
                        <div className="sm:w-[100%] Contenedor-Degradado">
                            <div className="Contenedor-Degradado-Hijo p-5">
                                <Formatos textos={GetFormatos} />
                            </div>
                        </div>

                        {/* Fondo Degradado */}
                        <div className="Fondo-Degradado absolute w-full h-full"></div>
                    </section>
                </div>
            </Opacidad>

            {/* ------------------------- Categorias ------------------------------- */}
            <Opacidad>
                <div className="sm:w-[85%] w-full my-[2rem]">
                    <section className="w-full flex flex-col justify-center items-center gap-[3rem] Fondo-Degradado p-2">
                        <h1 className=" text-[--color-Texto] text-4xl font-bold">
                            Categorias
                        </h1>
                        <Tarjeta_C datos={GetCategorias} />
                    </section>
                </div>
            </Opacidad>

            {/* ------------------------- Formulario ------------------------------- */}
            <Opacidad>
                <div className="sm:w-[85%] w-full my-[2rem]">
                    <section
                        // ref={Contactanos}
                        className="sm:w-[100%] flex flex-col justify-center items-center gap-[3rem] Fondo-Degradado p-2"
                    >
                        <h1 className=" text-[--color-Texto] text-4xl font-bold">
                            Contactanos
                        </h1>

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

const Tarjeta_C = ({ datos }: { datos: categoria[] }) => {
    return (
        <div className="Tarjeta_C sm:w-[100%] w-[90%]">
            {datos.map((item, index) => {
                return (
                    <Link
                        key={index}
                        href={`/categoria/${item.id}`}
                        className=" cursor-pointer shadow-xl rounded-[2rem] max-w-[180px]"
                    >
                        <Gesture>
                            <div className="Contenedor-Degradado-Tarjeta-Hijo">
                                <div className="flex justify-center items-center p-5  h-full ">
                                    <img
                                        src={item.url}
                                        alt={item.descripcion}
                                        className=" object-fill"
                                    />
                                </div>
                            </div>
                        </Gesture>
                    </Link>
                );
            })}
        </div>
    );
};

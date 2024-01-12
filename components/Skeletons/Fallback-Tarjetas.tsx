import { FaShoppingCart } from "react-icons/fa";

import ProductosSkeleton from "./productoSkeleton";

export default function Fallback_Tarjeta() {
    const componentes = [];

    for (let i = 0; i < 5; i++) {
        componentes.push(<Tarjetas key={i} />);
    }

    return (
        <div
            // style={containerStyles}
            className="Masonry_Productos justify-items-center"
        >
            {componentes}
        </div>
    );
}
const Tarjetas = () => {
    return (
        <div className="card-productos">
            <div
                title="Cargando..."
                className="card_box border-[--Cargar-fondo] border-[2px] rounded-[0.5rem] p-1 overflow-hidden"
            >
                <div className="flex flex-col justify-center items-center overflow-hidden">
                    {/* Corazon */}
                    <div className="absolute left-0 top-0 p-2">
                        <div title="Like" className="heart-container z-[100]">
                            <div className="svg-container ">
                                <svg
                                    className="absolute fill-black "
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                </svg>
                                <svg
                                    className="bg-trasparent fill-transparent"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                </svg>
                                <svg
                                    height="100"
                                    width="100"
                                    className="svg-celebrate"
                                >
                                    <polygon points="10,10 20,20"></polygon>
                                    <polygon points="10,50 20,50"></polygon>
                                    <polygon points="20,80 30,70"></polygon>
                                    <polygon points="90,10 80,20"></polygon>
                                    <polygon points="90,50 80,50"></polygon>
                                    <polygon points="80,80 70,70"></polygon>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <ProductosSkeleton
                        extraStyles={{
                            height: "100%",
                            width: "100%",
                            top: "0",
                            left: "0",
                            borderRadius: "0.5rem",
                            overflow: "hidden",
                            zIndex: "66",
                        }}
                        container={false}
                    >
                        <div className="w-full h-[150px] bg-[--Cargar-fondo]" />
                    </ProductosSkeleton>

                    <p className=" loading  font-[roboto] font-extrabold uppercase text-xs sm:text-base text-[--Cargar-color] mt-4">
                        $000 arg
                    </p>

                    <h1
                        className=" loading w-full px-1 text-center font-[roboto] font-extrabold uppercase text-xs sm:text-base text-[--Cargar-color] mt-2"
                        title={"Cargando Titulo"}
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {"Titulo"}
                    </h1>

                    <div className="mb-4  mt-4">
                        <div
                            className={`loading border-[2px] border-[--Cargar-fondo] w-full h-[3rem] p-4  flex items-center  rounded text-[--Cargar-color] justify-center gap-2`}
                        >
                            <div>
                                <span>Agregar</span>
                            </div>

                            <FaShoppingCart className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

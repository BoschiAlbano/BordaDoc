"use client";
// import IconCarrito from "@mui/icons-material/ShoppingCart";
import { FaShoppingCart } from "react-icons/fa";

import { useFavoritosContext } from "@/lib/hook/favoritosContext";

import { producto } from "@/lib/definiciones";

export default function Agregar({ producto }: { producto: producto }) {
    const { handleCarrito } = useFavoritosContext();

    //  carrito, alert

    // useEffect(() => {
    //     setTexto(BuscarProductoCarrito(producto.id));
    // }, [producto.id, carrito]);

    const ADD_Carrito = () => {
        handleCarrito({ producto });
    };

    return (
        <button
            type="button"
            className={`Degradado w-full h-[3rem] p-4 mb-4 flex items-center group overflow-hidden rounded text-white justify-center`}
            onClick={() => ADD_Carrito()}
        >
            <div className="text-sm ml-4 font-medium font-[roboto] transition-all sm:group-hover:mr-2 mr-2 sm:mr-0">
                <span>Agregar</span>
            </div>

            <div className=" sm:translate-x-[8rem]  transition-transform duration-300 sm:group-hover:-translate-x-0 -translate-x-0 sm:group-hover:mr-2 mr-2 ">
                <FaShoppingCart className="h-5 w-5" />
            </div>
        </button>
    );
}

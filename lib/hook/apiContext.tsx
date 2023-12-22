"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

// import { supabase } from "@/supabase/cliente";
import Alert from "@/components/alert/alert";

import { producto, categoria, alertaType, SeverityType } from "../definiciones";

// Definimos los tipos de datos para el contexto
interface ApiContextType {
    categorias: categoria[];
    productos: producto[];
    ActualizarProductos: () => void;
    BuscarProducto: (id: number) => producto | undefined;
}

// Creamos el contexto con el tipo que acabamos de definir
export const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Datos a exportar
export function ApiContextProvider({ children }: { children: ReactNode }) {
    const [categorias, setCategorias] = useState<categoria[]>([]);
    const [productos, setProductos] = useState<producto[]>([]);

    const [alert, setAlert] = useState<alertaType>({
        open: false,
        vertical: "bottom",
        horizontal: "right",
        msj: "",
        severity: SeverityType.Success,
    });

    useEffect(() => {
        setCategorias([
            {
                id: 1,
                descripcion: "Futbol",
                url: "/assets/wilcom/Categorias/Futbol.png",
            },
            {
                id: 2,
                descripcion: "Animales",
                url: "/assets/wilcom/Categorias/Animales.png",
            },
            {
                id: 3,
                descripcion: "Egresados",
                url: "/assets/wilcom/Categorias/Egresados.png",
            },
            {
                id: 4,
                descripcion: "Marcas",
                url: "/assets/wilcom/Categorias/Marcas.png",
            },
            {
                id: 5,
                descripcion: "Flores",
                url: "/assets/wilcom/Categorias/Flores.png",
            },
            {
                id: 6,
                descripcion: "Otros",
                url: "/assets/wilcom/Categorias/otros.png",
            },
        ]);
        setProductos([
            {
                id: 1,
                titulo: "Escudo de Barcelona",
                precio: 1100,
                url: "https://http2.mlstatic.com/D_NQ_NP_625300-MLA69406261319_052023-O.webp",
                categoriaId: 1,
            },
            {
                id: 2,
                titulo: "Panda",
                precio: 1100,
                url: "https://i.pinimg.com/736x/96/be/32/96be3297f5bdaf1ecd6d52efef8bcb86.jpg",
                categoriaId: 2,
            },
            {
                id: 3,
                titulo: "Egresados 2022",
                precio: 1100,
                url: "https://d3ugyf2ht6aenh.cloudfront.net/stores/332/787/products/image-c525c5fcaf7713a0b216224028144793-480-0.",
                categoriaId: 3,
            },
            {
                id: 4,
                titulo: "Adidas",
                precio: 1100,
                url: "https://i.ytimg.com/vi/j9pGNCR9v10/maxresdefault.jpg",
                categoriaId: 4,
            },
            {
                id: 5,
                titulo: "Flores",
                precio: 1100,
                url: "https://i.pinimg.com/originals/04/ea/a4/04eaa49c0211416ff301223b7587a926.jpg",
                categoriaId: 5,
            },
        ]);
        // ApiCategorias();
        // ApiArticulos();
        // ApiBanners();
    }, []);

    const ActualizarProductos: () => void = () => {
        // ApiArticulos();
        console.log("Actualiza cuando realizo una compra");
        // setAlert({
        //     ...alert,
        //     msj: `Compra realizada con exito`,
        //     severity: "success",
        //     open: true,
        // });
    };

    const BuscarProducto: (id: number) => producto | undefined = (id) => {
        return productos.find((item) => item.id === id);
    };

    console.log("entra al Api contextt");

    return (
        <ApiContext.Provider
            value={{
                categorias,
                productos,
                ActualizarProductos,
                BuscarProducto,
            }}
        >
            {children}
            {alert.open ? <Alert state={alert} setState={setAlert} /> : null}
        </ApiContext.Provider>
    );
}

export function useApiContext() {
    const context = useContext(ApiContext);

    if (!context) {
        throw new Error(
            "useApiContext debe ser usado en un ApiContextProvider"
        );
    }

    return context;
}

//❗ Api a catericas
// async function ApiCategorias() {
//     try {
//         let { data: Categorias, error } = await supabase
//             .from("Categorias")
//             .select("*");

//         if (error) {
//             console.log(error);
//             return;
//         }

//         setCategorias(Categorias);
//     } catch (error) {
//         console.log(error);
//     }
// }
//❗ Api Articulos
// async function ApiArticulos() {
//     try {
//         let { data: Articulos, error } = await supabase
//             .from("Articulos")
//             .select("*");

//         if (error) {
//             console.log(error);
//             return;
//         }

//         setProductos(Articulos);
//     } catch (error) {
//         console.log(error);
//     }
// }
//❗ Api Banners
// async function ApiBanners() {
//     try {
//         let { data: Articulos, error } = await supabase
//             .from("Banners")
//             .select("*");

//         if (error) {
//             console.log(error);
//             return;
//         }

//         setBanners(Articulos);
//     } catch (error) {
//         console.log(error);
//     }
// }

"use client";
import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useRef,
} from "react";
import { useLocalStorage } from "./localStorage/hook";
import Alert from "@/components/alert/alert";

import { producto, alertaType, SeverityType } from "../definiciones";

// Definimos los tipos de datos para el contexto
interface FavoritosContextType {
    favorito: producto[];
    carrito: producto[];
    modo: boolean;
    alert: alertaType;
    setCarrito: Dispatch<SetStateAction<producto[]>>;
    setModo: Dispatch<SetStateAction<boolean>>;
    handleFavoritos: (args: { producto: producto }) => void;
    handleCarrito: (args: { producto: producto }) => void;
    handleCarritoDelete: (id: number) => void;
}

// Creamos el contexto con el tipo que acabamos de definir
export const FavoritosContext = createContext<FavoritosContextType | undefined>(
    undefined
);

// También proporcionamos un tipo para ReactNode si es necesario
interface FavoritosContextProviderProps {
    children: ReactNode;
}

// Creamos un componente de proveedor que utilizará el contexto
export const FavoritosContextProvider: React.FC<
    FavoritosContextProviderProps
> = ({ children }) => {
    const [favorito, setFavorito] = useLocalStorage<producto[]>(
        "Favoritos",
        []
    );
    const [carrito, setCarrito] = useLocalStorage<producto[]>("Carrito", []);
    const [modo, setModo] = useState<boolean>(false);

    const [alert, setAlert] = React.useState<alertaType>({
        open: false,
        vertical: "bottom",
        horizontal: "right",
        msj: "Sin Alerta",
        severity: SeverityType.Success,
    });

    const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
    const timeoutId2 = useRef<NodeJS.Timeout | undefined>(undefined);

    const mostrarAlerta = ({
        msj,
        severity,
    }: {
        msj: string;
        severity: SeverityType;
    }) => {
        // Cerrar la alerta actual si está abierta
        setAlert((prevAlert) => ({ ...prevAlert, open: false }));

        // Cancelar el setTimeout anterior, si lo hay
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            clearTimeout(timeoutId2.current);
        }

        // Abrir una nueva alerta después de cerrar la actual
        timeoutId.current = setTimeout(() => {
            setAlert({
                ...alert,
                msj,
                severity,
                open: true,
            });
        }, 200);
        //     // Cerrar la alerta después de un tiempo determinado
        timeoutId2.current = setTimeout(() => {
            setAlert((prevAlert) => ({ ...prevAlert, open: false }));
        }, 5000);
    };

    const handleFavoritos: FavoritosContextType["handleFavoritos"] = ({
        producto,
    }) => {
        // Clonamos el array de favoritos para no mutar el estado directamente
        const nuevosFavoritos = [...favorito];

        // Buscamos si el producto ya está en favoritos
        const indice = nuevosFavoritos.findIndex(
            (item) => item.id === producto.id
        );

        if (indice === -1) {
            // Si no está en favoritos, lo agregamos
            nuevosFavoritos.push(producto);
            setFavorito(nuevosFavoritos);

            mostrarAlerta({
                msj: `El Producto - ${producto.titulo} - fue Agregado a favoritos`,
                severity: SeverityType.Success,
            });
        } else {
            // Si ya está en favoritos, lo eliminamos
            nuevosFavoritos.splice(indice, 1);
            setFavorito(nuevosFavoritos);

            mostrarAlerta({
                msj: `El Producto - ${producto.titulo} - fue Eliminado de favoritos`,
                severity: SeverityType.Warning,
            });
        }
    };

    const handleCarrito: FavoritosContextType["handleCarrito"] = ({
        producto,
    }) => {
        // buscar id en el localStorage
        const item = [...carrito];

        // Comprobar si existe el articulo
        const Id = item.findIndex((item) => item.id === producto.id);

        if (Id === -1) {
            // Agego
            item.push({ ...producto });

            setCarrito(item);

            mostrarAlerta({
                msj: `El Producto - ${producto.titulo} - fue Agregado al carrito de Compras`,
                severity: SeverityType.Success,
            });
            return;
        }
        mostrarAlerta({
            msj: `El Producto - ${producto.titulo} - ya esta Agregado al carrito`,
            severity: SeverityType.Warning,
        });
    };

    const handleCarritoDelete = (id: number) => {
        // buscar id en el localStorage
        const item = [...carrito];

        // Comprobar si existe el articulo
        const Id = item.findIndex((item) => item.id === id);

        if (Id === -1) return;

        item.splice(Id, 1);

        setCarrito(item);

        mostrarAlerta({
            msj: `Producto elimnado del carrito...`,
            severity: SeverityType.Success,
        });
    };

    console.log("entra al favorito contextt");
    return (
        <FavoritosContext.Provider
            value={{
                favorito,
                carrito,
                modo,
                alert,
                setCarrito,
                setModo,
                handleFavoritos,
                handleCarrito,
                handleCarritoDelete,
            }}
        >
            {children}
            <Alert state={alert} setState={setAlert} />
        </FavoritosContext.Provider>
    );
};

// Creamos un hook que simplifica el uso del contexto
export function useFavoritosContext(): FavoritosContextType {
    const context = useContext(FavoritosContext);

    if (!context) {
        throw new Error(
            "useFavoritosContext debe estar dentro de un FavoritosContextProvider"
        );
    }

    return context;
}

// const BuscarProductoCarrito = (id) => {
//     // buscar id en el localStorage
//     const Id = carrito.findIndex((item) => item.id === id);

//     if (Id === -1) return 0;

//     return carrito[Id];
// };

// const MostrarAlerta = ({
//     msj = "Sin Mensaje de Alerta",
//     severity = "success",
// }) => {
//     setAlert({
//         ...alert,
//         msj,
//         severity,
//         open: true,
//     });
// };

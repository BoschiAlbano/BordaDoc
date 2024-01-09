import { IconType } from "react-icons";
import { BiSolidError } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export type producto = {
    id: number;
    titulo: string;
    precio: number;
    url: string;
    categoriaId: number;
};

export type categoria = {
    id: number;
    descripcion: string;
    url: string;
};

export type alertaType = {
    open: boolean;
    vertical: string;
    horizontal: string;
    msj: string;
    severity: SeverityType;
};

export enum SeverityType {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning",
}

interface AlertConfig {
    color: string;
    icon: IconType;
}
// diccionario
export const alertConfig: Record<SeverityType, AlertConfig> = {
    [SeverityType.Success]: { color: "#66cdaa", icon: FaCheckCircle },
    [SeverityType.Error]: { color: "#e9967a", icon: IoIosCloseCircle },
    [SeverityType.Info]: { color: "#87ceeb", icon: FaInfoCircle },
    [SeverityType.Warning]: { color: "#ffd700", icon: BiSolidError },
};

export type DatosFormularioContacto = {
    Nombre: string;
    Email: string;
    Imagen: File | null;
    Alto: string;
    Ancho: string;
    Aplique: string;
    Formato: string;
    Mensaje: string;
};

export type orden = {
    n_orden: string;
    estado: boolean;
};

export type detalle_orden = {
    titulo: string;
    precio: number;
    productoId: number;
    ordenId: number;
};

import { producto, categoria } from "./definiciones";
import { supabase } from "./supabase/cliente";

// buscar todo en base de datos
export async function fetchGetCategorias(): Promise<categoria[]> {
    try {
        let { data: Categorias, error } = await supabase
            .from("Categorias")
            .select("*");

        if (error) {
            return [];
        }

        if (Categorias) {
            return Categorias;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function fetchGetProductos(): Promise<producto[]> {
    try {
        let { data: Productos, error } = await supabase
            .from("Productos")
            .select("*");

        if (error) {
            return [];
        }

        if (Productos) {
            return Productos;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchGetByCadena(cadena: string): Promise<producto[]> {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
        let { data: Productos, error } = await supabase
            .from("Productos")
            .select("*")
            .ilike("titulo", `%${cadena}%`);

        if (error) {
            return [];
        }

        if (Productos) {
            return Productos;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchGetByCategoria(
    categoriaId: string
): Promise<producto[]> {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        let { data: Productos, error } = await supabase
            .from("Productos")
            .select("*")
            .eq("categoriaId", `${categoriaId}`);

        if (error) {
            return [];
        }

        if (Productos) {
            return Productos;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const GetFormatos = [
    ".DST",
    ".PES",
    ".JEF",
    ".ARX",
    ".BRO",
    ".CSD",
    ".DAT",
    ".DSB",
    ".DSN",
    ".DSZ",
    ".EBD",
    ".EMD",
    ".EXP",
    ".HUS",
    ".INB",
    ".JPX",
    ".KSM",
    ".MJD",
    ".MST",
    ".PCD",
    ".PCM",
    ".PCQ",
    ".PCS",
    ".PEC",
    ".PMU",
    ".PUM",
    ".SAS",
    ".SEW",
    ".SHV",
    ".STC",
    ".STX",
    ".TAP",
    ".TBF",
];

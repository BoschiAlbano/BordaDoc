import { producto, categoria } from "./definiciones";

// Base de datos
const ProdutosDB = [
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
];
const CategoriaDB = [
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
];

// buscar todo en base de datos

export async function fetchGetCategorias(): Promise<categoria[]> {
    const categorias: categoria[] = CategoriaDB;

    return categorias;
}
export async function fetchGetProductos(): Promise<producto[]> {
    const productos: producto[] = ProdutosDB;
    return productos;
}

export async function fetchGetByCadena(cadena: string): Promise<producto[]> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const buscar: producto[] = ProdutosDB.filter((item) =>
        item.titulo.toLowerCase().includes(cadena.toLowerCase())
    );

    return buscar;
}

export async function fetchGetByCategoria(
    categoriaId: string
): Promise<producto[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const buscar: producto[] = ProdutosDB.filter(
        (item) => item.categoriaId === Number(categoriaId)
    );

    return buscar;
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

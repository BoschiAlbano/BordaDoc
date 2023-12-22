import { fetchGetByCadena } from "@/lib/data";

export default async function name({ text }: { text: string }) {
    const datos = await fetchGetByCadena(text);

    return (
        <>
            {datos.map((item, index) => {
                return (
                    <div key={index} className="">
                        <h1>Productos encontrados: {datos.length}</h1>
                        <h1>{item.titulo}</h1>
                    </div>
                );
            })}
        </>
    );
}

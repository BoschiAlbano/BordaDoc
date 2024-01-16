// import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/servidor";

import { producto } from "@/lib/definiciones";
import mercadopago from "mercadopago";
import {
    CreatePreferencePayload,
    PreferenceItem,
} from "mercadopago/models/preferences/create-payload.model";
import { NextResponse } from "next/server";

// export async function POST(req: Request, res: Response) {
//     try {
//         return NextResponse.json({ message: "Ok" }, { status: 200 });
//     } catch (error: any) {
//         console.log(error);
//         return NextResponse.json(
//             { error: "Error interdo del Servidor" },
//             { status: 500 }
//         );
//     }
// }

export async function POST(req: Request, res: Response) {
    try {
        mercadopago.configure({
            access_token: process.env.NEXT_ACCESS_TOKEN!,
        });

        // 1 - traer todos los productos de la base de datos
        const data = await req.json();
        const productos: producto[] = data.Productos;

        // 2 - Buscamos los productos originales de la base de datos
        // Procutos Cliente - Buscar - Productos Originales
        const IDs: string[] = productos.map((items: producto) =>
            items.id.toString()
        );

        // 2 - hacer la consulta a supabase
        let { data: prod, error } = await supabaseAdmin
            .from("Productos")
            .select("*")
            .in("id", IDs);

        if (error) {
            // throw new Error(error.message);
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        console.log(["Productos: ", prod]);

        if (!prod) {
            return NextResponse.json(
                { message: "no hay productos en base de datos" },
                { status: 400 }
            );
        }
        const productosDB: producto[] = prod;

        // Crear Preferencia
        const _preferencia = await CrearPreferencia(productos, productosDB);
        // 🚸 si se generan preferencias y no se usan entonces el id de la preferencia es el mismo.
        console.log([_preferencia.url]);

        // devolvelmos status 200
        return NextResponse.json(
            {
                message: "Ok",
                url: _preferencia.url,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log("Servidor Error");
        console.log(error);
        return NextResponse.json(
            { message: "Error en el servidor", error: error.message },
            { status: 500 }
        );
    }
}

async function CrearPreferencia(
    productoscliente: producto[],
    productosOriginales: producto[]
) {
    // 3 - Crear la lista de productos para preferencia
    let items: PreferenceItem[] = [];
    productoscliente.forEach((produc: producto) => {
        // Buscamos cada producto porque la - Cantidad - de la manda el cliente
        let art = productosOriginales?.find((item) => item.id == produc.id);

        if (!art) {
            return;
        }

        // Limita la descripción a 256 caracteres
        let limitedDescription = art.titulo.substring(0, 256);

        items.push({
            id: art.id.toString(),
            title: art.titulo,
            description: limitedDescription,
            picture_url: art.url,
            category_id: art.categoriaId.toString(),
            quantity: 1, // Cantidad
            currency_id: "ARS",
            unit_price: art.precio,
        });
    });

    // 4 - Creamos la preferencia

    // Esta url debe ser con SSL xq mercado tira errror
    const URL = `${process.env.NEXT_PUBLIC_HOST_SSL}`;
    // const URL_Notify = `${process.env.NEXT_PUBLIC_HOST_SSL}/api/mercadoPago/notify`; (Pages ✔ / App ❌)
    const URL_Notify = `${process.env.NEXT_PUBLIC_HOST_SSL}/api/notificar`;

    const preference: CreatePreferencePayload = {
        items: items,
        auto_return: "approved",
        back_urls: {
            success: `${URL}`,
            failure: `${URL}`,
            pending: `${URL}`,
        },
        notification_url: `${URL_Notify}`,
    };

    const response = await mercadopago.preferences.create(preference);

    console.log(response);
    //  Link de la preferencia
    const URL_Produccion = response.body.init_point;
    const URL_Desarrollo = response.body.sandbox_init_point;
    console.log([URL_Desarrollo, URL_Produccion]);

    // ❗❗❗ Cambiar por url de produccion
    return { url: URL_Produccion };
}

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/servidor";
import mercadopago from "mercadopago";

import { detalle_orden, orden, producto } from "@/lib/definiciones";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";

mercadopago.configure({
    access_token: process.env.NEXT_ACCESS_TOKEN!,
});

export default async function Notificar(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { query } = req;

        if (query?.type === "payment") {
            const paymentId = query.id || query["data.id"];
            console.log(paymentId);
            let payment = await mercadopago.payment.findById(Number(paymentId));
            let paymentStatus = payment.body.status;

            console.log([payment, paymentStatus]);

            if (paymentStatus === "approved") {
                // ❌ { 'data.id': '1316531126', type: 'payment' }  X 2 ¿identificar para no entrar en base de datos dos veces con: collector_id?

                console.log(payment.body);
                // ID de la preferencia
                let Productos: producto[] = [];
                Productos = payment.body.additional_info.items.map(
                    (prod: PreferenceItem) => {
                        return {
                            id: prod.id,
                            titulo: prod.title,
                            precio: prod.unit_price,
                            url: prod.picture_url,
                            categoriaId: prod.category_id,
                        };
                    }
                );

                const OrdenId: string = payment.body.order.id;

                // Crear orden en estado pagada
                CrearOrdenyDetalle(Productos, OrdenId);
            }
        }
    } catch (error) {
        console.log(error);
    }

    // mercado pago debe recibir una notificacion 200 o 201
    return res.status(200).json("OK");
    // return NextResponse.json({ message: "Ok" }, { status: 200 });
}

async function CrearOrdenyDetalle(
    productosOriginales: producto[],
    ordenId: string
) {
    // 1 - Generar una orden de compra.
    const _orden: orden = {
        estado: true,
        n_orden: ordenId,
    };

    // 2 - Guradar la orden o actualizar la orden y los detalles

    // Buscar orden con esa ordenId
    // 4 - Eliminar y Eliminar detalles de orden si existen, Esta en cascada SQL.
    const { error: er } = await supabaseAdmin
        .from("Orden")
        .delete()
        .eq("n_orden", ordenId);

    // Insertar
    const { data: orden, error } = await supabaseAdmin
        .from("Orden")
        .insert([_orden])
        .select();

    if (error) {
        throw new Error(error.message);
        // return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const _TypeOrden: orden | any[] | null = orden;

    // 3.3 - Crear Detalle de orden
    const Detalles_Orden: detalle_orden[] = [];

    productosOriginales.forEach((produc: producto) => {
        Detalles_Orden.push({
            // Crear detalle despues orden - n-orden alazar
            precio: produc.precio,
            productoId: produc.id,
            titulo: produc.titulo,
            ordenId: _TypeOrden[0].id,
        });
    });

    // 5 - Guardamos los detalles
    const { data: Detalle_de_Orden, error: err } = await supabaseAdmin
        .from("Detalle_de_Orden")
        .insert(Detalles_Orden)
        .select();

    if (err) {
        throw new Error(err.message);
    }
}

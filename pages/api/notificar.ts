import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/servidor";
import mercadopago from "mercadopago";

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

                // ID de la preferencia
                console.log(payment.body.collector_id);

                // Cambiar estado de orden
                const { data, error } = await supabaseAdmin
                    .from("Orden")
                    .update({ estado: "true" })
                    .eq("n_orden", payment.body.collector_id)
                    .select();

                if (error) console.log(data);
            }
        }
    } catch (error) {
        console.log(error);
    }

    // mercado pago debe recibir una notificacion 200 o 201
    return res.status(200).json("OK");
    // return NextResponse.json({ message: "Ok" }, { status: 200 });
}

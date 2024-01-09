import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.NEXT_ACCESS_TOKEN!,
});

// export async function GET(req: Request, res: Response) {
//     console.log("entra");
//     return NextResponse.json({ msj: "todo bien " }, { status: 200 });
// }

export async function POST(req: Request) {
    console.log("Entra");

    // req: Request
    const query = await req.json();
    const topic = query.topic || query.type;
    console.log(query, topic);

    // req: NextApiRequest ❌ no funciona
    // const { query } = req;
    // const topic = query.topic || query.type;
    // console.log(query, topic);

    // return NextResponse.json({ message: "Todo ok" }, { status: 200 });

    try {
        if (query.type === "payment") {
            const paymentId = query.id || query["data.id"];

            console.log(paymentId);

            let payment = await mercadopago.payment.findById(Number(paymentId));
            console.log(payment);

            let paymentStatus = payment.body.status;

            console.log([payment, paymentStatus]);

            if (paymentStatus === "approved") {
                // 1 - Buscar los datos de el producto vendido
                const articulosarray = payment.body.additional_info.items;
                console.log(articulosarray);

                return NextResponse.json({ msj: "Ok" }, { status: 200 });
                // 2 - Usar supabaseAdmin para Crear y devolver los Links de Descargas - SERVICE_ROLE_API_KEY
                // ❌

                // if (error) {
                //     console.log(error);
                //     res.send(error);
                // } else {
                //     console.log(data);
                //     res.send("Todo Ok");
                // }
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msj: "Error" }, { status: 500 });
    }
}

/*
https://52df-181-117-24-235.ngrok-free.app/?collection_id=1316522428&collection_status=approved&payment_id=1316522428&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=14686900352&preference_id=1512312240-b1f75e3c-be2e-48bf-b368-076c21698779&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
*/

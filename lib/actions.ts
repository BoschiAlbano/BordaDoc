"use server";

import { redirect } from "next/navigation";
import { EnumValues, z } from "zod";

import transporter from "./nodemailerSetup";
import { revalidatePath } from "next/cache";

const GetFormatos: EnumValues = [
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

const CreateContactanosSchema = z.object({
    Nombre: z
        .string({
            invalid_type_error: "Campo invalido",
        })
        .min(1, { message: "Complete el campo" }),
    Email: z
        .string({
            invalid_type_error: "Campo invalido",
        })
        .email("email invalido"),
    Alto: z
        .string({
            invalid_type_error: "Campo invalido",
        })
        .min(1, { message: "Complete el campo" }),
    Ancho: z
        .string({
            invalid_type_error: "Campo invalido",
        })
        .min(1, { message: "Complete el campo" }),
    Aplique: z
        .string({
            invalid_type_error: "Campo invalido",
        })
        .min(1, { message: "Complete el campo" }),
    Formato: z.enum(GetFormatos, {
        invalid_type_error: "Campo invalido",
    }),
    Foto: z.any().refine(
        (value) => {
            const siono =
                value instanceof File && value.type.startsWith("image/");
            return siono;
        },
        {
            message: "Campo invalido",
        }
    ),
});

export type State = {
    errors?: {
        Nombre?: string[];
        Email?: string[];
        Alto?: string[];
        Ancho?: string[];
        Aplique?: string[];
        Formato?: string[];
        Mensaje?: string[];
        Foto?: string[];
    };
    message?: null | string;
};

// prevState: State,
export async function Contactanos(prevState: State, formData: FormData) {
    // extrar todos los campos
    const rawFormData = Object.fromEntries(formData.entries());

    console.log(rawFormData);

    // Validar Campos
    const _DatosValidados = CreateContactanosSchema.safeParse(rawFormData);

    // si se valida correctamente obtengo 'data'
    if (!_DatosValidados.success) {
        return {
            errors: _DatosValidados.error.flatten().fieldErrors,
            message: "Error, Revise todos los campos",
        };
    }

    try {
        // Enviar el mail con nodemailer
        const { data } = _DatosValidados;
        const { Foto } = data;
        console.log(Foto);

        // obtener el buffer
        const bytes = await Foto.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // ✔ Guardar img en el servidor
        // const filePath = path.join(process.cwd(), "public", Foto.name);
        // writeFile(filePath, buffer);

        const mailOptions = {
            from: process.env.From,
            to: process.env.To,
            subject: "Borda.Doc",
            text: `${rawFormData?.Mensaje}`,
            html: `
            <h1>Nombre: ${data.Nombre}</h1>
            <br/>
            <h1>Correo: ${data.Email}</h1>
            <br/>
            <h1>Alto: ${data.Alto}</h1>
            <br/>
            <h1>Ancho: ${data.Ancho}</h1>
            <br/>
            <h1>Aplique: ${data.Aplique}</h1>
            <br/>
        `,
            attachments: [
                {
                    filename: Foto.name,
                    content: buffer,
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        revalidatePath("/");

        return {
            message: "enviado... Estaremos en contacto Gracias 👌",
        };
    } catch (e: any) {
        console.log(e.message);
        revalidatePath("/");

        return {
            message: "¡Algo salió mal, no se puedo mandar el Email",
        };
    }

    redirect("/");
}

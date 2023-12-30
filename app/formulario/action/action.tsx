"use server";

import { revalidatePath } from "next/cache";

export type FormState = {
    text: string;
    errors: {
        text: string | undefined;
    };
};

let todo: string[] = ["Primer todo"];

export async function createTodoAction(
    previousState: FormState,
    formData: FormData
) {
    const text = formData.get("text") as string;

    if (!text) {
        return {
            text,
            errors: {
                text: "text must be defined",
            },
        };
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    todo.push(text);
    revalidatePath("/");

    return {
        text: "",
        errors: {
            text: undefined,
        },
    };
}

export async function getAllTodos() {
    return todo;
}

// export async function deleteTodoAction(id: number) {
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     revalidatePath("/");
// }

// export async function toggleTodoAction(id: number) {
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     revalidatePath("/");
// }

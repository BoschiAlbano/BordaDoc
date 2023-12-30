import { unstable_noStore } from "next/cache";
import { CreateTodoForm } from "./Create/create";
import { getAllTodos } from "./action/action";

export default async function Home() {
    unstable_noStore();

    const todos = await getAllTodos();

    return (
        <main className="container mx-auto mt-12">
            <ul className="list-disc">
                {todos.map((todo) => (
                    <li className="flex gap-2 items-center" key={todo}>
                        <h1>{todo}</h1>
                    </li>
                ))}
            </ul>
            <CreateTodoForm />
        </main>
    );
}

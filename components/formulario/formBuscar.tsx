import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function FormBuscar() {
    const [texto, setTexto] = useState<string>("");
    const navigation = useRouter();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (texto) {
            navigation.push(`/buscar/${texto}`);
        } else {
            navigation.push(`/buscar`);
        }
    };

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-row justify-center items-center border-2 rounded-xl border-[--Buscar-Color-Borde] p-1"
        >
            <input
                className=" bg-transparent w-full outline-none text-center font-bold sm:text-sm text-xs px-10 text-[--color-Texto-Buscar] "
                type="text "
                placeholder="Buscar logo"
                onChange={(e) => {
                    setTexto(e.target.value);
                }}
                value={texto}
            />

            <button type="submit">
                {/* <Lupa className="cursor-pointer saltar text-[--Texto-Color]"></Lupa> */}
                <p className="cursor-pointer saltar text-[--Texto-Color]">
                    <FaSearch />
                </p>
            </button>
        </form>
    );
}

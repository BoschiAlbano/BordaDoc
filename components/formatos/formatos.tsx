export default function formatos({ textos }: { textos: string[] }) {
    return (
        <div className="w-full h-full flex flex-row flex-wrap gap-[1rem] justify-center items-center ">
            {textos.map((item, index) => {
                return (
                    <p
                        key={index}
                        className="  bg-[--color-Fondo-Texto] text-[--color-Texto-Opuesto] rounded-2xl py-[0.2rem] px-[0.5rem] font-bold text-xl"
                    >
                        {item}
                    </p>
                );
            })}
        </div>
    );
}

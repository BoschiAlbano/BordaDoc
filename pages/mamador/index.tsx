export default function Mamador() {
    return (
        <div>
            <h1>en Pages fura de app</h1>
            <button
                onClick={() => {
                    alert("probando fuera de app en pages");
                }}
            >
                Alerta
            </button>
        </div>
    );
}

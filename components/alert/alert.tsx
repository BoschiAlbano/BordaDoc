import React, { useEffect } from "react";
import { alertaType, SeverityType, alertConfig } from "@/lib/definiciones";
import { IoClose } from "react-icons/io5";

interface AlertCompProps {
    state: alertaType;
    setState: React.Dispatch<React.SetStateAction<alertaType>>;
}

const AlertComp: React.FC<AlertCompProps> = ({ state, setState }) => {
    // useEffect(() => {
    //     setTimeout(() => {
    //         setState({ ...state, open: false });
    //     }, 2000);
    // }, [state.msj]);

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const severity: SeverityType = state.severity;
    const config = alertConfig[severity];

    return (
        <>
            <div
                className={` fixed bottom-0 right-0 flex flex-row gap-2 justify-center items-center rounded-md p-5 m-2 h-[60px] w-auto ${
                    state.open ? "translate-x-[0%]" : "translate-x-[150%]"
                } transition-transform duration-300`}
                style={{ background: config.color }}
                onClick={() => handleClose()}
            >
                <config.icon></config.icon>
                <span className=" absolute top-0 right-0 m-1 cursor-pointer">
                    <IoClose />
                </span>
                <h1 className=" text-xs sm:text-sm">{state.msj}</h1>
            </div>
        </>
    );
};

export default AlertComp;

/*
        <div className="absolute top-0 right-0 w-full flex justify-center items-center z-[200]">
            <Alert
                className={`w-full mx-5 mt-1 animacion-alerta-Open`}
                severity="error"
            >
                {msj}{' '}
            </Alert>
        </div>
*/

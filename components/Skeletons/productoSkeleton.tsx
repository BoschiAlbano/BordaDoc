import React from "react";

export const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
};

function LoadingPlaceHolder({
    children,
    container,
    extraStyles,
}: {
    children: React.ReactNode;
    container: boolean;
    extraStyles?: React.CSSProperties;
}) {
    const loaderStyles: React.CSSProperties = {
        // backgroundColor: "#eee",
        width: "100%",
        overflow: "hidden",
        position: container ? "absolute" : "relative",
        ...extraStyles,
    };

    const loaderSwipeStyles: React.CSSProperties = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        background:
            "linear-gradient(to right, #eeeeee 10%, #dddddd 50%, #eeeeee 90%)",
        // "linear-gradient(to right, #eeeeee 10%, #F8F8EC 50%, #eeeeee 90%)",
        // "linear-gradient(to right, #eeeeee 10%, #191D32 50%, #eeeeee 90%)",
        animation: "loaderSwipeAnim 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite",
        height: "100%",
    };

    return (
        <div style={loaderStyles}>
            {children}
            <div style={loaderSwipeStyles}></div>
        </div>
    );
}

export default LoadingPlaceHolder;

// backgroundColor="#f0f0f0"
// foregroundColor="#dedede"

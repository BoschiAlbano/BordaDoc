import React from "react";
import styles from "./mercadoPago.module.css";

const SpinnerMercadoPago = () => {
    return (
        <div className={styles.container}>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
        </div>
    );
};

export default SpinnerMercadoPago;

import React from 'react';

export default function Spinner({ titulo = 'Cargando..' }) {
    return (
        <div className="loader">
            <span className="loader-text">{titulo}</span>
            <span className="load"></span>
        </div>
    );
}

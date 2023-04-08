// import React from 'react'
// import React, { useState } from 'react';
import React, { useRef, useEffect } from 'react';

import Pico8 from 'react-pico-8'
import {
    Controls,
    Reset,
    Pause,
    Sound,
    Carts,
    Fullscreen
} from 'react-pico-8/buttons'
import 'react-pico-8/styles.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'


export default function Juicejam2() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 200;
        canvas.height = 100;

        let isButtonPressed = false;

        const drawButton = (x, y, width, height, text) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isButtonPressed) {
                ctx.fillStyle = '#ccc';
            } else {
                ctx.fillStyle = '#fff';
            }

            ctx.fillRect(x, y, width, height);

            ctx.font = '20px Arial';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x + width / 2, y + height / 2);
        };

        const handleMouseDown = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
                isButtonPressed = true;
                drawButton(50, 20, 100, 60, 'Click me!');
                document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 90 }));
            }
        };

        const handleMouseUp = () => {
            isButtonPressed = false;
            drawButton(50, 20, 100, 60, 'Click me!');
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 90 }));
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);




    return (
        <>
            <Header />
            <Pico8 src="/pico8_games/juicejam2.js"
                autoPlay={false}
                legacyButtons={true}
                hideCursor={false}
                center={true}
                blockKeys={true}
                usePointer={true}
                unpauseOnReset={true}
                placeholder=""
            >
                <Controls />
                <Reset />
                <Pause />
                <Sound />
                <Carts />
                <Fullscreen />
            </Pico8>
            <canvas ref={canvasRef} />
        </>
    )
}

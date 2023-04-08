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

        canvas.width = 500;
        canvas.height = 500;

        let isButtonPressed = false;

        const drawButton = (x, y, width, height, text) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isButtonPressed) {
                ctx.fillStyle = '#ccc';
            } else {
                ctx.fillStyle = '#ddd';
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

            if (x >= 50 && x < 50 + 100 && y >= 20 && y < 20 + 60) {
                isButtonPressed = true;
                drawButton(50, 20, 100, 60, 'Click me!');
                document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37 }));
            } else {
                isButtonPressed = false;
                drawButton(50, 20, 100, 60, 'Click me!');
                document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 37 }));
            }
        };

        const handleMouseUp = () => {
            isButtonPressed = false;
            drawButton(50, 20, 100, 60, 'Click me!');
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 37 }));
        };

        const handleTouchStart = (event) => {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const x = event.touches[0].clientX - rect.left;
            const y = event.touches[0].clientY - rect.top;

            if (x >= 50 && x < 50 + 100 && y >= 20 && y < 20 + 60) {
                isButtonPressed = true;
                drawButton(50, 20, 100, 60, 'Click me!');
                document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37 }));
            } else {
                isButtonPressed = false;
                drawButton(50, 20, 100, 60, 'Click me!');
                document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 37 }));
            }
        };
        const handleTouchEnd = () => {
            isButtonPressed = false;
            drawButton(50, 20, 100, 60, 'Click me!');
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 37 }));
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchStart);
        canvas.addEventListener('touchend', handleTouchEnd);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
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

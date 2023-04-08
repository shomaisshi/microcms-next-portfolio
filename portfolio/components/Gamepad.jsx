import React, { useRef, useEffect } from 'react';

export default function Gamepad() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        function make_actor(name, x, y, w, h, key) {
            const a = {}
            a.name = name;
            a.x = x;
            a.y = y;
            a.w = w;
            a.h = h;
            a.key = key
            return a;
        }

        const leftButton = make_actor('Left', 30, 100, 80, 60, 37);
        const rightButton = make_actor('Right', 150, 100, 80, 60, 39);
        const upButton = make_actor('Up', 100, 20, 60, 80, 38);
        const downButton = make_actor('Down', 100, 160, 60, 80, 40);

        const zButton = make_actor('Z', 300, 40, 60, 80, 90);
        const xButton = make_actor('X', 260, 100, 60, 80, 88);


        let isButtonPressed = false;

        const drawButton = (x, y, width, height, text) => {

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

        function updateButton(mx, my, bx, by, bwidth, bheight, text, key) {
            if (mx >= bx && mx < bx + bwidth && my >= by && my < by + bheight) {
                isButtonPressed = true;
                drawButton(bx, by, bwidth, bheight, text);
                document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: key }));
            } else {
                isButtonPressed = false;
                drawButton(bx, by, bwidth, bheight, text);
                document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: key }));
            }
        }

        const handleMouseDown = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // left 
            updateButton(x, y, leftButton.x, leftButton.y, leftButton.w, leftButton.h, leftButton.name, leftButton.key)
            // right 
            updateButton(x, y, rightButton.x, rightButton.y, rightButton.w, rightButton.h, rightButton.name, rightButton.key)
            // up 
            updateButton(x, y, upButton.x, upButton.y, upButton.w, upButton.h, upButton.name, upButton.key)
            // down 
            updateButton(x, y, downButton.x, downButton.y, downButton.w, downButton.h, downButton.name, downButton.key)

            // z
            updateButton(x, y, zButton.x, zButton.y, zButton.w, zButton.h, zButton.name, zButton.key)
            // x
            updateButton(x, y, xButton.x, xButton.y, xButton.w, xButton.h, xButton.name, xButton.key)
            // ctx.fillText("touches.length", 90, 20)
        };

        function endButton(name, x, y, w, h, key) {
            isButtonPressed = false;
            drawButton(x, y, w, h, name);
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: key }));
        }
        const handleMouseUp = () => {
            endButton('Left', 30, 100, 80, 60, 37);
            endButton('Right', 150, 100, 80, 60, 39);
            endButton('Up', 100, 20, 60, 80, 38);
            endButton('Down', 100, 160, 60, 80, 40);

            endButton('Z', 300, 40, 60, 80, 90);
            endButton('X', 260, 100, 60, 80, 88);
        };


        const handleTouchStart = (event) => {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();

            for (var i = 0; i < event.touches.length; i++) {
                const x = event.touches[i].clientX - rect.left;
                const y = event.touches[i].clientY - rect.top;

                // left 
                updateButton(x, y, leftButton.x, leftButton.y, leftButton.w, leftButton.h, leftButton.name, leftButton.key)
                // right 
                updateButton(x, y, rightButton.x, rightButton.y, rightButton.w, rightButton.h, rightButton.name, rightButton.key)
                // up 
                updateButton(x, y, upButton.x, upButton.y, upButton.w, upButton.h, upButton.name, upButton.key)
                // down 
                updateButton(x, y, downButton.x, downButton.y, downButton.w, downButton.h, downButton.name, downButton.key)

                // z
                updateButton(x, y, zButton.x, zButton.y, zButton.w, zButton.h, zButton.name, zButton.key)
                // x
                updateButton(x, y, xButton.x, xButton.y, xButton.w, xButton.h, xButton.name, xButton.key)
            }
            ctx.fillText("touches.length" + event.touches.length, 90, 20)

        };

        const handleTouchEnd = () => {
            endButton('Left', 30, 100, 80, 60, 37);
            endButton('Right', 150, 100, 80, 60, 39);
            endButton('Up', 100, 20, 60, 80, 38);
            endButton('Down', 100, 160, 60, 80, 40);

            endButton('Z', 300, 40, 60, 80, 90);
            endButton('X', 260, 100, 60, 80, 88);
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
            <canvas ref={canvasRef} />
        </>
    )
}
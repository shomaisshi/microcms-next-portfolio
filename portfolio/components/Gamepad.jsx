import React, { useRef, useEffect } from 'react';

export default function Gamepad() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            updateButton(x, y, 30, 100, 80, 60, 'left', 37)
            // right 
            updateButton(x, y, 150, 100, 80, 60, 'right', 39)
            // up 
            updateButton(x, y, 100, 20, 60, 80, 'up', 38)
            // down 
            updateButton(x, y, 100, 160, 60, 80, 'down', 40)

            // z
            updateButton(x, y, 300, 40, 60, 80, '弾発射', 90)
            // x
            updateButton(x, y, 260, 100, 60, 80, 'ボックス', 88)
        };

        const handleMouseUp = () => {
            // isButtonPressed = false;
            // drawButton(50, 20, 100, 60, 'left');
            // document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 37 }));

            // isButtonPressed = false;
            // drawButton(120, 20, 100, 60, 'right');
            // document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 39 }));
        };

        const handleTouchStart = (event) => {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const joisticx = event.touches[0].clientX - rect.left;
            const joisticy = event.touches[0].clientY - rect.top;

            // left 
            updateButton(joisticx, joisticy, 30, 100, 80, 60, 'left', 37)
            // right 
            updateButton(joisticx, joisticy, 150, 100, 80, 60, 'right', 39)
            // up 
            updateButton(joisticx, joisticy, 100, 20, 60, 80, 'up', 38)
            // down 
            updateButton(joisticx, joisticy, 100, 160, 60, 80, 'down', 40)

            const buttonx = event.touches[1].clientX - rect.left;
            const buttony = event.touches[1].clientY - rect.top;
            // z
            updateButton(buttonx, buttony, 300, 40, 60, 80, '弾発射', 90)
            // x
            updateButton(buttonx, buttony, 260, 100, 60, 80, 'ボックス', 88)
        };
        const handleTouchEnd = () => {
            isButtonPressed = false;
            drawButton(50, 20, 100, 60, 'left');
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
            <canvas ref={canvasRef} />
        </>
    )
}
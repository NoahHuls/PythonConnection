window.clearCanvas = function () {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

window.getPixelData = function () {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        // R, G, B are the same in grayscale, so just use R value
        const grayscaleValue = imageData.data[i];
        pixelData.push(grayscaleValue);
    }
    return pixelData;
};

window.addCanvasListeners = function () {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');

    // Set initial background to black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;
    let lastX, lastY;

    canvas.addEventListener('mousedown', (event) => {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        lastX = Math.floor((event.clientX - rect.left) * scaleX);
        lastY = Math.floor((event.clientY - rect.top) * scaleY);
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
        lastX = undefined;
        lastY = undefined;
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = Math.floor((event.clientX - rect.left) * scaleX);
        const y = Math.floor((event.clientY - rect.top) * scaleY);

        if (lastX !== undefined && lastY !== undefined) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);  // Move to the last position
            ctx.lineTo(x, y);          // Draw a line to the current position
            ctx.strokeStyle = 'white'; // Set the stroke color to white
            ctx.lineWidth = 2;         // Set the line width
            ctx.stroke();              // Apply the stroke
        }

        lastX = x;
        lastY = y;
    });
};

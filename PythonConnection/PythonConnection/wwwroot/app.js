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

    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mousemove', function (event) {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = Math.floor((event.clientX - rect.left) * scaleX);
        const y = Math.floor((event.clientY - rect.top) * scaleY);

        ctx.fillStyle = 'white'; // Draw in white
        ctx.fillRect(x, y, 1, 1); // Draw a 1x1 pixel
    });
};

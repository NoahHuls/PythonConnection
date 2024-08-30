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

    // Function to get canvas coordinates from event
    function getCanvasCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;

        return {
            x: Math.floor((x - rect.left) * scaleX),
            y: Math.floor((y - rect.top) * scaleY)
        };
    }

    // Function to handle starting drawing
    function startDrawing(event) {
        event.preventDefault(); // Prevent default scrolling behavior
        drawing = true;
        const coords = getCanvasCoordinates(event);
        lastX = coords.x;
        lastY = coords.y;
    }

    // Function to handle ending drawing
    function stopDrawing(event) {
        event.preventDefault(); // Prevent default scrolling behavior
        drawing = false;
        lastX = undefined;
        lastY = undefined;
    }

    // Function to handle drawing
    function draw(event) {
        event.preventDefault(); // Prevent default scrolling behavior
        if (!drawing) return;

        const coords = getCanvasCoordinates(event);
        const newX = coords.x;
        const newY = coords.y;

        if (lastX !== undefined && lastY !== undefined) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);  // Move to the last position
            ctx.lineTo(newX, newY);    // Draw a line to the current position
            ctx.strokeStyle = 'white'; // Set the stroke color to white
            ctx.lineWidth = 2;         // Set the line width
            ctx.stroke();              // Apply the stroke
        }

        lastX = newX;
        lastY = newY;
    }

    // Add event listeners for mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    // Add event listeners for touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);
};

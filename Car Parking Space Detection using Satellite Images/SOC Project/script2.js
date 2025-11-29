document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const detectButton = document.getElementById("detectButton");
    const imageCanvas = document.getElementById("imageCanvas");
    const predictionsDiv = document.getElementById("predictions");

    const apiKey = "0jf9dzWxNWx3U4wdVqIE"; // Replace with your actual API key
    const apiUrl = `https://detect.roboflow.com/car-parking-space-kdim/6?api_key=${apiKey}`;

    let selectedImage = null;

    // Handle image upload
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            selectedImage = file;

            // Display the uploaded image on the canvas
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const ctx = imageCanvas.getContext("2d");
                    imageCanvas.width = img.width;
                    imageCanvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle detect button click
    detectButton.addEventListener("click", async function () {
        if (!selectedImage) {
            alert("Please upload an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Detection Results:", data);

                // Count empty spaces and draw bounding boxes
                let emptySpaceCount = 0;

                const ctx = imageCanvas.getContext("2d");
                data.predictions.forEach((prediction) => {
                    const { x, y, width, height, class: label, confidence } = prediction;

                    // Only process empty spaces
                    if (label === "Empty" && confidence > 0.6) {
                        emptySpaceCount++;

                        // Draw bounding box for empty spaces
                        ctx.strokeStyle = "green";
                        ctx.lineWidth = 2;
                        ctx.strokeRect(
                            x - width / 2,
                            y - height / 2,
                            width,
                            height
                        );

                        // Add label
                        ctx.fillStyle = "green";
                        ctx.font = "16px Arial";
                        ctx.fillText(
                            label,
                            x - width / 2,
                            y - height / 2 - 5
                        );
                    }
                });

                // Display the number of empty spaces
                predictionsDiv.innerHTML = `
                    <h3>Detection Summary:</h3>
                    <p><strong>Empty Spaces:</strong> ${emptySpaceCount}</p>
                `;
            } else {
                console.error("API Error:", response.statusText);
                predictionsDiv.innerHTML = `<p>Error: ${response.statusText}</p>`;
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            predictionsDiv.innerHTML = `<p>An error occurred while fetching predictions.</p>`;
        }
    });
});

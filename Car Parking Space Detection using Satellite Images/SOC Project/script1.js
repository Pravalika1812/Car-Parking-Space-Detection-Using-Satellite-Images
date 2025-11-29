document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const detectButton = document.getElementById("detectButton");
    const imageCanvas = document.getElementById("imageCanvas");
    const predictionsDiv = document.getElementById("predictions");
    const resultsSection = document.getElementById("results");

    const apiKey = "0jf9dzWxNWx3U4wdVqIE"; // Replace with your actual API key
    const confidenceThreshold = 0.1; // Set confidence threshold here
    const apiUrl = `https://detect.roboflow.com/car-parking-space-kdim8/6?api_key=${apiKey}&confidence=${confidenceThreshold}`;

    let selectedImage = null;

    // Handle image upload
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            selectedImage = file;

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

                // Display the canvas with the uploaded image
                imageCanvas.style.display = "block";
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

                resultsSection.style.display = "block";

                const ctx = imageCanvas.getContext("2d");
                let emptySpaceCount = 0;
                let carCount = 0; // Add variable to count cars

                // Redraw the image to clear any previous drawings
                const img = new Image();
                const reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                };
                reader.readAsDataURL(selectedImage);

                img.onload = function () {
                    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
                    ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);

                    // Draw bounding boxes
                    data.predictions.forEach((prediction) => {
                        const { x, y, width, height, class: label, confidence } = prediction;

                        // Check if the prediction meets the confidence threshold
                        if (confidence >= confidenceThreshold) {
                            if (label === "Car") {
                                ctx.strokeStyle = "red"; // red for cars
                                carCount++; // Increment car count
                            } else if (label === "Empty") {
                                ctx.strokeStyle = "yellow"; // yellow for empty spaces
                                emptySpaceCount++;
                            } else {
                                ctx.strokeStyle = "blue"; // Default color for unknown classes
                            }

                            ctx.lineWidth = 2;
                            ctx.strokeRect(
                                x - width / 2,
                                y - height / 2,
                                width,
                                height
                            );

                            ctx.fillStyle = ctx.strokeStyle;
                            ctx.font = "16px Arial";
                            ctx.fillText(
                                label,
                                x - width / 2,
                                y - height / 2 - 5
                            );
                        }
                    });

                    // Update the predictions div
                    predictionsDiv.innerHTML = `
                        <h3>Detection Results</h3>
                        <p>Total Predictions: ${data.predictions.length}</p>
                        <p><strong>Empty Spaces:</strong> ${emptySpaceCount}</p>
                        <p><strong>Number of Cars:</strong> ${carCount}</p>
                    `;
                };
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

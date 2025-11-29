document.addEventListener("DOMContentLoaded", function () {
    const parkingData = {
        lot1: { name: "Lot 1", totalSpaces: 200, availableSpaces: 45 },
        lot2: { name: "Lot 2", totalSpaces: 150, availableSpaces: 60 },
        StadiumLot: { name: "Stadium Lot", totalSpaces: 300, availableSpaces: 120 },
        lot3: { name: "Lot 3", totalSpaces: 140, availableSpaces: 150 },
        lot4: { name: "Lot 4", totalSpaces: 29, availableSpaces: 4 },
        lot26: { name: "Lot 26", totalSpaces: 120, availableSpaces: 20 },
        lot27: { name: "Lot 27", totalSpaces: 170, availableSpaces: 37 },
        lot28: { name: "Lot 28", totalSpaces: 200, availableSpaces: 76 },
        lot29: { name: "Lot 29", totalSpaces: 80, availableSpaces: 12 },
    };

    const parkingLotSelect = document.getElementById("parking-lot-select");
    const parkingInfoDiv = document.getElementById("parking-info");

    // Event listener for dropdown selection
    parkingLotSelect.addEventListener("change", function () {
        const selectedLot = parkingLotSelect.value;
        
        if (selectedLot && parkingData[selectedLot]) {
            const lot = parkingData[selectedLot];
            parkingInfoDiv.innerHTML = `
                <h2>${lot.name}</h2>
                <p>Total Spaces: ${lot.totalSpaces}</p>
                <p>Available Spaces: ${lot.availableSpaces}</p>
            `;
        } else {
            parkingInfoDiv.innerHTML = "<p>Select a parking lot to see availability.</p>";
        }
    });
});

const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const fetchItemDetailsAndGenerateCard = async () => {
  const URL = `https://striveschool-api.herokuapp.com/api/product/${itemId}`;
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzZTIzZTMxYTczZjAwMTlkNWNhZGYiLCJpYXQiOjE3MDYyODc2NzgsImV4cCI6MTcwNzQ5NzI3OH0.jRoNr3gqXA6VVa_f0mZKbd3K9mgqAxDNG9UU99CyDZA";

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const item = await response.json();

      const cardDiv = document.createElement("div");
      cardDiv.className = "card mx-auto mb-3 bg-dark cardElement2 col-6";

      const cardImg = document.createElement("img");
      cardImg.className = "card-img-top mx-auto";
      cardImg.src = item.imageUrl;
      cardImg.alt = item.name;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title text-white";
      cardTitle.textContent = item.name;

      const cardDescription = document.createElement("p");
      cardDescription.className = "card-text text-white";
      cardDescription.textContent = item.description;

      const cardBrand = document.createElement("h6");
      cardBrand.className = "card-brand text-white";
      cardBrand.textContent = item.brand;

      const cardPrice = document.createElement("p");
      cardPrice.className = "card-text text-white text-truncate";
      cardPrice.textContent = item.price + " $";

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);
      cardBody.appendChild(cardBrand);
      cardBody.appendChild(cardPrice);

      cardDiv.appendChild(cardImg);
      cardDiv.appendChild(cardBody);

      const itemDetailsContainer = document.getElementById(
        "itemDetailsContainer"
      );
      itemDetailsContainer.appendChild(cardDiv);
    } else {
      console.error("Failed to fetch item details");
    }
  } catch (error) {
    console.error("Error fetching item details:", error);
  }
};

fetchItemDetailsAndGenerateCard();

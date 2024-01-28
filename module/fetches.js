import { createForm } from "./componenti.js";

export const fetchAndDisplayItems = async () => {
  const URL = "https://striveschool-api.herokuapp.com/api/product/";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzZTIzZTMxYTczZjAwMTlkNWNhZGYiLCJpYXQiOjE3MDYyODc2NzgsImV4cCI6MTcwNzQ5NzI3OH0.jRoNr3gqXA6VVa_f0mZKbd3K9mgqAxDNG9UU99CyDZA";
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const items = await response.json();
    if (!response.ok) {
      throw ("response status:", response.status);
    }
    console.log(items);
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach((item) => {
      createCard(item);
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const handleFormSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const productData = {
    name: document.getElementById("productName").value,
    description: document.getElementById("productDescription").value,
    brand: document.getElementById("productBrand").value,
    imageUrl: document.getElementById("productImageUrl").value,
    price: document.getElementById("productPrice").value,
  };

  if (validateObjectFields(productData)) {
    productData.price = parseFloat(productData.price);
    console.log("Sending product data:", productData);
  }

  const URL = "https://striveschool-api.herokuapp.com/api/product/";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzZTIzZTMxYTczZjAwMTlkNWNhZGYiLCJpYXQiOjE3MDYyODc2NzgsImV4cCI6MTcwNzQ5NzI3OH0.jRoNr3gqXA6VVa_f0mZKbd3K9mgqAxDNG9UU99CyDZA";
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Product added successfully:", data);

    event.target.reset();
  } catch (error) {}
  fetchAndDisplayItems();
};

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", handleFormSubmit);

export const deleteItem = async (item) => {
  const URL = "https://striveschool-api.herokuapp.com/api/product/";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzZTIzZTMxYTczZjAwMTlkNWNhZGYiLCJpYXQiOjE3MDYyODc2NzgsImV4cCI6MTcwNzQ5NzI3OH0.jRoNr3gqXA6VVa_f0mZKbd3K9mgqAxDNG9UU99CyDZA";
  try {
    const response = await fetch(`${URL}${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `errrore nella eliminazione dell'oggetto: ${response.statusText}`
      );
    }
    alert("oggetto rimosso:");
    console.log("oggetto rimosso");
    fetchAndDisplayItems();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

export const saveProductChanges = async (productId) => {
  const updatedProductData = collectUpdatedProductData();
  const URL = "https://striveschool-api.herokuapp.com/api/product/";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIzZTIzZTMxYTczZjAwMTlkNWNhZGYiLCJpYXQiOjE3MDYyODc2NzgsImV4cCI6MTcwNzQ5NzI3OH0.jRoNr3gqXA6VVa_f0mZKbd3K9mgqAxDNG9UU99CyDZA";

  try {
    const response = await fetch(`${URL}${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedProductData),
    });

    if (!response.ok) {
      throw new Error(`errore HTTP! Stato: ${response.status}`);
    }

    alert("Producto modificato con successo");
  } catch (error) {
    console.error("Errore modificando il prodotto:", error);
  }
  fetchAndDisplayItems();
};

const API_BASE_URL = "https://ecommerce-zqms.onrender.com/api/v1";

export const getProducts = async () => {
  try {
    console.log("Fetching:", `${API_BASE_URL}/products`);

    const response = await fetch(`${API_BASE_URL}/products`);

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();

    console.log("Products response:", result);

    return result.data;
  } catch (error) {
    console.error("❌ getProducts failed:", error);
    throw error;
  }
};
export const addToCart = async (productId, quantity = 1, token) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.message || `Failed to add product: ${response.status}`,
    );
  }

  return response.json();
};
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};
export const getCart = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch cart");
  }

  return result;
};
export const updateCart = async (productId, quantity, token) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update cart");
  }

  return result;
};
export const removeFromCart = async (productId, token) => {
  const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to remove item");
  }

  return result;
};
export const getProductById = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch product");
  }

  return result.data;
};

export const getWishlist = async (token) => {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch wishlist");
  }

  return result;
};

export const addToWishlist = async (productId, token) => {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to add to wishlist");
  }

  return result;
};

export const removeFromWishlist = async (productId, token) => {
  const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to remove from wishlist");
  }

  return result;
};
export const createOrder = async (orderData, token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create order");
  }

  return result;
};

export const getMyOrders = async (token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch orders");
  }

  return result;
};

export const getOrderById = async (orderId, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch order");
  }

  return result;
};

export const cancelOrder = async (orderId, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to cancel order");
  }

  return result;
};


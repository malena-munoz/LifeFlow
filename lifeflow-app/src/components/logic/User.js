export async function IsNewUser(identifier) {
  try {
    const response = await fetch(`https://localhost:7245/api/Usuario/${identifier}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Si la respuesta no es 200-299
      const text = await response.text(); // puede ser HTML si es error
      console.error(text);
    }

    const data = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

let paises = [];

async function obtenerPaises() {
  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all");
    const datos = await respuesta.json();
    paises = datos;
    mostrarPaises(paises);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function mostrarPaises(lista) {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  lista.forEach(pais => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.official}">
      <h3>${pais.name.official}</h3>
      <p><strong>Región:</strong> ${pais.region}</p>
      <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
    `;

    contenedor.appendChild(div);
  });
}

document.getElementById("buscar").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = paises.filter(pais =>
    pais.name.official.toLowerCase().includes(texto)
  );
  mostrarPaises(filtrados);
});

obtenerPaises();

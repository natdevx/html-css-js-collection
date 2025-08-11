// Paso 1: Escucha el clic del botón
document.getElementById("check-btn").addEventListener("click", function () {
  
  // Paso 2: Obtén el valor del input
  let texto = document.getElementById("text-input").value;
  
  // Paso 3: Elimina espacios en blanco al inicio y al final
  texto = texto.trim();
  
  // Paso 4: Verifica si está vacío
  if (texto === "") {
    // Paso 5: Muestra la alerta
    alert("Please input a value.");
  }

// Después del if que verifica si está vacío

// Paso 6: Limpia el texto
let textoLimpio = texto.toLowerCase().replace(/[^a-z0-9]/gi, "");

// Paso 7: Invierte el texto
let textoInvertido = textoLimpio.split("").reverse().join("");

// Paso 8: Compara ambos
let esPalindromo = textoLimpio === textoInvertido;

// Paso 9: Selecciona el div con id="result"
let resultado = document.getElementById("result");

// Paso 10: Muestra el mensaje correspondiente
if (esPalindromo) {
  resultado.textContent = `${texto} is a palindrome.`;
} else {
  resultado.textContent = `${texto} is not a palindrome.`;
}


});
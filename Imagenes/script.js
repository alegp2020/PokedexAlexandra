$(document).ready(function () {
  //definicion de los colorespor los tipos para poder cada pokemon individual en su color de elemnto
  const coloresPokemonTipo = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  //mostrar todos los pokemons
  cargarPokemons();

  //cada pokemon mostrarlo y ponerlo en la nueva lista
  function cargarPokemons() {
    for (let i = 1; i <= 151; i++) {
      $.getJSON(`https://pokeapi.co/api/v2/pokemon/${i}`, function (data) {
        //obtencion de cada pokemon por su tipo
        const tipos = data.types.map((tipo) => tipo.type.name).join(", ");
      
        const cartaHTML = `
                      <div class="carta-pokemon" data-nombre="${data.name}">
                        <img src="${data.sprites.front_default}" alt="">
                        <p class="id">#${data.id}</p>
                        <h2>${data.name.toUpperCase()}</h2>
                        
                        <button class="tipoBtn">Tipo: ${tipos}</button>
                    </div>
                `;
        $(".cartas-poke").append(cartaHTML);
      });
    }
  }



  $(".cartas-poke").on("click", ".carta-pokemon", function () {
    const nombre = $(this).data("nombre");

    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${nombre}`, function (data) {
      const tipos = data.types.map((tipo) => tipo.type.name).join(", ");
      const imagen = data.sprites.other["official-artwork"].front_default;
      const tipoP = data.types[0].type.name;
      const colorFondo = coloresPokemonTipo[tipoP];
   

    const html = `
            <div class="carta-pokemon" style="background-color: ${colorFondo};">
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${imagen}" alt="${data.name}" style="width:100%;">
                <p class="id"><strong>ID:</strong> #${data.id}</p>
                <p><strong>Tipo(s):</strong> ${tipos}</p>
                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <button class= "volveratras">Volver
            </div>
        `;

      $(".cartas-poke").html(html);
    });
  });







  // en el input lo que se esvropa se guarda y si coincide mostrarlo
  //pasalo a minusculas que no haya espacios por eso puse el trim y .val para guiartdara
  // lo qu eel usuario escriba
  $("#busquedaPokemon").on("input", function () {
    const nombrePokemon = $(this).val().toLowerCase().trim();
    if (nombrePokemon) {
      buscarPokemon(nombrePokemon);
    }
  });

  //muetsra el pokemon que se a puesto
  function buscarPokemon(nombre) {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${nombre}`, function (data) {
      mostrarPokemon(data);
    });
  }

  // muetsra cada pokemon buscado indiviadualmente con su html nuevo
  //segun su tipo se cambai de color
  function mostrarPokemon(pokemon) {
  
    const tipos = pokemon.types.map((tipo) => tipo.type.name);
    // aqui es odnde la Api tiene guardo las imagenes
    const imagen = pokemon.sprites.other["official-artwork"].front_default;
    // buscar el primer pokemon
    const tipoP = pokemon.types[0].type.name;
    //elegir color segun el primer tipo
    const colorFondo = coloresPokemonTipo[tipoP];

    const cartaHTML = `
            <div class="carta-pokemon" style="background-color: ${colorFondo};">
                <h2>${pokemon.name.toUpperCase()}</h2>
                <img src="${imagen}" alt="${pokemon.name}" style="width:100%;">
                <p><strong>ID:</strong> #${pokemon.id}</p>
                <p><strong>Tipo(s):</strong> ${tipos}</p>
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <button class= "volveratras">Volver
            </div>
        `;

    $(".cartas-poke").html(cartaHTML);
  }

  // al darle al botn vyueleve a la pagina anteiror
  $(".cartas-poke").on("click", ".volveratras", function () {
    window.location.href = "index.html";
  });

 

  
});

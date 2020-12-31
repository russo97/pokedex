
Vue.component('pokemon-item', {
  name: "PokemonItem",

  props: ['pokemon'],

  computed: {
    name () {
      return this.pokemon.name;
    },

    pokemonThumb () {
      const { sprites } = this.pokemon;

      return sprites.other.dream_world.front_default;
    },

    types () {
      const { pokemon } = this;

      return pokemon.types.map(inf => inf.type.name);
    }
  },

  template: `
    <li class="card" :class="types[0]">
      <img :src="pokemonThumb" :alt="name" class="card-image" />
      <h1 class="card-title"> {{ name }} </h1>
      <h5 class="card-subtitle">
        <pokemon-type
          :key="type"
          :type="type"
          v-for="type in types" />
      </h5>
    </li>
  `
});

Vue.component('pokemon-type', {
  props: ['type'],

  computed: {
    typeClass () {
      const { type } = this;

      return `${type}_text`;
    }
  },

  template: `
    <span :class="typeClass" class="card-pill">
      {{ type }}
    </span>
  `
});


new Vue({
  el: "#pokedex",

  data () {
    return {
      allPokemons: [],
      baseURL: 'https://pokeapi.co/api/v2/pokemon/'
    }
  },

  async mounted () {
    const { basedURL, fetchError } = this;

    const pokemonList = Array.from({ length: 150 }, () => null);

    const mappedPokemonList = await pokemonList.map((_, index) => {
      const pIndex = index + 1;

      return fetch(basedURL(pIndex))
        .then(res => res.json())
        .catch(fetchError);
    });

    this.allPokemons = await Promise.all(mappedPokemonList);
  },

  methods: {
    basedURL (index) {
      const { baseURL } = this;

      return `${baseURL}${index}`;
    },

    fetchError (error) {
      console.error(`ERROR: ${error}`);
    }
  },

  watch: {}
});


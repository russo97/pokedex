
Vue.component('pokemon-item', {
  props: {
    name: {
      type: String
    }
  },

  template: `
    <li class="card">
      {{ po }}
    </li>
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

  mounted: async function () {
    const { baseURL } = this;

    const pokemonList = Array.from({ length: 150 }, () => null);

    const basedURL = index => `${baseURL}${index}`;

    const mappedpokemonList = await pokemonList.map((_, index) => {
      return fetch(basedURL((index + 1))).then(res => res.json()).catch(err => console.log(err));
    });

    this.allPokemons = await Promise.all(mappedpokemonList);
  },

  methods: {

  },

  computed: {
    eachPokemon () {
      return 'ok';
    }
  },

  watch: {}
});


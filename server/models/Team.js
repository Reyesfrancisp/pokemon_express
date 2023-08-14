const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
},
  pokemon: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon' // Reference to the Pokémon model
    }
  ],
}, {
  toJSON: {
    virtuals: true,
    transform: function (_, team) {
      // Limit the number of Pokémon to a maximum of 6
      team.pokemon = team.pokemon.slice(0, 6);
    }
  }
});

teamSchema.virtual('pokemonCount').get(function () {
  return this.pokemon.length;
});

teamSchema.pre('save', function (next) {
  // Ensure that the array is limited to a maximum of 6 Pokémon
  this.pokemon = this.pokemon.slice(0, 6);
  next();
});

teamSchema.pre('remove', async function (next) {
  const pokemonIds = this.pokemon;
  try {
    // Delete associated Pokémon (triggers Pokémon schema's pre-remove middleware)
    await Pokemon.deleteMany({ _id: { $in: pokemonIds } });
    next();
  } catch (error) {
    next(error);
  }
});

const Team = model('Team', teamSchema);

module.exports = Team;

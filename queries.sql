-- 1. 
SELECT trainer.name, COUNT(pokemon.id) AS 'Numero_capturas' FROM trainer_pokedex
INNER JOIN pokemon ON pokemon.id = trainer_pokedex.pokemon_id
INNER JOIN trainer ON trainer.id = trainer_pokedex.trainer_id
GROUP BY trainer_pokedex.trainer_id

-- 2.
SELECT pokemon.id, pokemon.level, pokemon_species.name, trainer_pokedex.captured_at FROM trainer_pokedex
INNER JOIN pokemon ON pokemon.id = trainer_pokedex.pokemon_id
INNER JOIN trainer ON trainer.id = trainer_pokedex.trainer_id
INNER JOIN pokemon_species ON pokemon.pokemon_species_id = pokemon_species.id
INNER JOIN pokemon_species_type ON pokemon_species.id = pokemon_species_type.pokemon_species_id
WHERE trainer_pokedex.trainer_id = 1 AND pokemon_species_type.pokemon_type LIKE 'ELECTRIC' -- && is deprecated, please use AND

-- 3.
SELECT pokemon.id, pokemon.level, pokemon_species.name, trainer_pokedex.captured_at FROM trainer_pokedex
INNER JOIN pokemon ON pokemon.id = trainer_pokedex.pokemon_id
INNER JOIN trainer ON trainer.id = trainer_pokedex.trainer_id
INNER JOIN pokemon_species ON pokemon.pokemon_species_id = pokemon_species.id
WHERE trainer_pokedex.trainer_id = 2
ORDER BY trainer_pokedex.captured_at DESC
LIMIT 1
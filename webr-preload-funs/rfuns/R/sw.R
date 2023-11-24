#' @title Star Wars by Species
#' @description Return a tibble of Star Wars characters by species
#' @import dplyr
#' @export
#' @param species character
#' @return tibble
#' @examples
#' star_wars_by_species("Human")
#' star_wars_by_species("Droid")
#' star_wars_by_species("Wookiee")
#' star_wars_by_species("Rodian")
star_wars_by_species <- function(species) {
  dplyr::starwars |>
    filter(species == {{ species }})
}

#' @title Unique Species
#' @description Return a vector of unique species
#' @import dplyr
#' @export
#' @return vector
#' @examples
#' unique_species()
unique_species <- function(){
  dplyr::starwars |>
    pull(species) |>
    unique()
}
import { render, screen } from "@testing-library/react";
import RecipeInProgress from "../pages/RecipeInProgress";
import renderWithRouter from "./helpers/renderWithRouter";

const mealAPI = {
  "meals": [
    {
      "idMeal": "52844",
      "strMeal": "Lasagne",
      "strDrinkAlternate": null,
      "strCategory": "Pasta",
      "strArea": "Italian",
      "strInstructions": "Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a few mins until starting to turn golden. Add the onion, celery and carrot, and cook over a medium heat for 5 mins, stirring occasionally, until softened.\r\nAdd the garlic and cook for 1 min, then tip in the mince and cook, stirring and breaking it up with a wooden spoon, for about 6 mins until browned all over.\r\nStir in the tomato purée and cook for 1 min, mixing in well with the beef and vegetables. Tip in the chopped tomatoes. Fill each can half full with water to rinse out any tomatoes left in the can, and add to the pan. Add the honey and season to taste. Simmer for 20 mins.\r\nHeat oven to 200C/180C fan/gas 6. To assemble the lasagne, ladle a little of the ragu sauce into the bottom of the roasting tin or casserole dish, spreading the sauce all over the base. Place 2 sheets of lasagne on top of the sauce overlapping to make it fit, then repeat with more sauce and another layer of pasta. Repeat with a further 2 layers of sauce and pasta, finishing with a layer of pasta.\r\nPut the crème fraîche in a bowl and mix with 2 tbsp water to loosen it and make a smooth pourable sauce. Pour this over the top of the pasta, then top with the mozzarella. Sprinkle Parmesan over the top and bake for 25–30 mins until golden and bubbling. Serve scattered with basil, if you like.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=gfhfsBPt46s",
      "strIngredient1": "Olive Oil",
      "strIngredient2": "Bacon",
      "strIngredient3": "Onion",
      "strIngredient4": "Celery",
      "strIngredient5": "Carrots",
      "strIngredient6": "Garlic",
      "strIngredient7": "Minced Beef",
      "strIngredient8": "Tomato Puree",
      "strIngredient9": "Chopped Tomatoes",
      "strIngredient10": "Honey",
      "strIngredient11": "Lasagne Sheets",
      "strIngredient12": "Creme Fraiche",
      "strIngredient13": "Mozzarella Balls",
      "strIngredient14": "Parmesan Cheese",
      "strIngredient15": "Basil Leaves",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 tblsp ",
      "strMeasure2": "2",
      "strMeasure3": "1 finely chopped ",
      "strMeasure4": "1 Stick",
      "strMeasure5": "1 medium",
      "strMeasure6": "2 cloves chopped",
      "strMeasure7": "500g",
      "strMeasure8": "1 tbls",
      "strMeasure9": "800g",
      "strMeasure10": "1 tblsp ",
      "strMeasure11": "500g",
      "strMeasure12": "400ml",
      "strMeasure13": "125g",
      "strMeasure14": "50g",
      "strMeasure15": "Topping",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/classic-lasagne",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    }
  ]
}

describe('Recipe in Progress', () => {
  global.fetch = (url) => Promise.resolve({
    json: () => Promise.resolve(mealAPI),
  })

  it('', async () => {
    render(<RecipeInProgress match={ {params: { id: '52844' } } } location={{pathname: '/foods'}} />);

    expect(await screen.findByText('Lasagne')).toBeInTheDocument();
  });
});
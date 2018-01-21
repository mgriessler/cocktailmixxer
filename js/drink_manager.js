var buttons = new Array();
function consoleDrink() {
}

function genDrinkList() {
    $.each(drinks.drinks, function(i,drink) {
        var b = $('<button class="button"/>')
            .text(drink.name)
            .click(function() {
                populateDrink(drink); 
            });
        buttons.push(b);
        $(".left-side-bar").append(b);
    });
}

function populateDrink(drink) {
    reset();
    populateIngredients(drink.ingredients);
    populatePrepInstructions(drink.prep);
    populateLinks(drink.links);
    drawCollinsGlass();
}

function populateIngredients(ingredients) {
    var ingredientNames = new Array();
    var ingredientParts = new Array();
    var ingredientText = new Array();
    $.each(ingredients, function(key, ingredient) {
        if(ingredient.cl) {
            ingredientNames.push(ingredient.name);
            ingredientParts.push(ingredient.part);
            ingredientText.push(ingredient.name + " - " + ingredient.part + " part(s)");
        }
    }); 
    console.log(ingredientNames);
    console.log(ingredientParts);
    console.log(ingredientText);
    drawParts(ingredientParts, ingredientNames, ingredientText);
}
function populatePrepInstructions(prep) {
    $("#prep-instructions").text(prep);
}

function populateLinks(links) {
    var linkhtml = "<ul><li><a href='" + links[0] + "'>Wikipedia</a></li><li><a href='" + links[1] + "'>International Bartenders Association</a></li></ul>";
    $("#links").html(linkhtml);
}

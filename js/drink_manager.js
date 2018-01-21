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
        $("#drink-list").append(b);
    });
}

function populateDrink(drink) {
    $("#prep-instructions-label").css("display","block");
    $("#links-label").css("display","block");
    reset();
    populateIngredients(drink.ingredients);
    populatePrepInstructions(drink.prep);
    populateLinks(drink.links);
    drawCollinsGlass();
    populateGarnishes(drink.garnishes);
    if(drink.served == "on the rocks")
        addIce();
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
    drawParts(ingredientParts, ingredientNames, ingredientText);
}
function populatePrepInstructions(prep) {
    $("#prep-instructions").text(prep);
}

function populateLinks(links) {
    var linkhtml = "<ul><li><a href='" + links[0] + "'>Wikipedia</a></li><li><a href='" + links[1] + "'>International Bartenders Association</a></li></ul>";
    $("#links").html(linkhtml);
}

function populateGarnishes(garnishes) {
    $.each(garnishes, function(key, garnish) {
        if(garnish == "slice of lime")
            addLemon(0);
        else if(garnish == "lemon slice")
            addLemon(1);
        else if(garnish == "straw")
            addStraw();
    });
}

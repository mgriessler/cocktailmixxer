var buttons = new Array();
function consoleDrink() {
    console.log("here");
    console.log(drinks);
}

function genDrinkList() {
    $.each(drinks.drinks, function(i,drink) {
        console.log(drink.name);
        var b = $('<button class="button"/>')
            .text(drink.name)
            .click(function() {alert(drink.glass);});
        buttons.push(b);
        $(".left-side-bar").append(b);
    });
    /*$.each(buttons, function(i,b) {
        $(".left-side-bar").append(b);
    });*/
}

//this function is called when the DOM is ready apparently is equivalent to $(document).reday(function(){});
$(function() {
    var c = $("#drink")[0];
    var ctx = c.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10,10,100,100);
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();
    consoleDrink();
    genDrinkList();
});

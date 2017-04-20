console.log("coucou");
console.log('text');
$( document ).ready(function() {
    $.getJSON( "twitter.json", function( data ) {
        for (var i = 0; i < 10; i++) {
            console.log(data.test[i]);
        }
    })
    .done(function() { console.log('getJSON request succeeded!'); })
    .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
    .always(function() { console.log('getJSON request ended!'); });
});

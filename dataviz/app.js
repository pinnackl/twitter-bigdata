$( document ).ready(function() {
    $.getJSON( "twitter.json", function( data ) {
        var json = data;
        // for (var i=0 ; i < json.test.length -1 ; i++){
        //     for(var j=i+1 ; j < json.test.length ; j++){
        //         if(json.test[i].text == json.test[j].text){
        //             json.test.splice(j,1);
        //         }
        //     }
        // }

        var arrayWords = {};
        var arrayLanguages = {};
        var arrayLocations = {};
        var uselessWords = ['to', 'of', 'el', 'the', 'or', 'is', 'at', 'on', 'in', 'rt', 'you', 'when', 'that', 'and', 'be', 'for', 'we', 'are', 'an', 'have', 'will', 'this', 'wwwiii', 'worldwar', 'ww', 'world', 'war', 'us', 'it', 'third', 'has', 'its', 'he', 'north', 'do', 'already', 'as', 'by', 'was', 'get', 'about', 'with', 'from', 'out', 'from', 'amp', 'if', 'would', 'into', 'says'];
        for (var i = 0; i < json.test.length; i++) {

            //LANGUAGES
            if (typeof arrayLanguages[json.test[i].lang] != "undefined") {
                arrayLanguages[json.test[i].lang] += 1;
            } else {
                arrayLanguages[json.test[i].lang] = 1;
            }

            //TEXT
            if ( typeof json.test[i].text != "undefined" ) {
                var cleanText = json.test[i].text.replace(/[|&;$%#':^@"-<>?[()+,.]/g, "");
                var text = cleanText.split(" ");
                for (j = 0; j < text.length; j++) {
                    if(!uselessWords.includes(text[j].toLowerCase()) && text[j].length > 2) {
                        var re = new RegExp(text[j], 'g');
                        if(cleanText.match(re) == null) {
                            var n = 0;
                        } else {
                            var n = cleanText.match(re).length;
                        }

                        if(typeof arrayWords[text[j]] != "undefined") {
                            arrayWords[text[j]] = arrayWords[text[j]] + n;
                        } else {
                            arrayWords[text[j]] = n;
                        }
                    }
                }
            }

            //LOCATIONS
            if (json.test[i].user.location.trim().length != 0){
              if (typeof arrayLocations[json.test[i].user.location] != "undefined"){
                arrayLocations[json.test[i].user.location] += 1;
              } else {
                arrayLocations[json.test[i].user.location] = 1;
              }
            }


        }

        //SORT WORDS
        var sortableWords = [];
        for (var word in arrayWords) {
            sortableWords.push([word, arrayWords[word]]);
        }

        sortableWords.sort(function(a, b) {
            return b[1] - a[1];
        });

        //console.log(sortableWords);

        //SORT LOCATIONS
        var sortableLocations = [];
        for (var location in arrayLocations) {
            sortableLocations.push([location, arrayLocations[location]]);
        }

        sortableLocations.sort(function(a, b) {
            return b[1] - a[1];
        });
        
        console.log(sortableLocations);

        //SORT LANGUAGES
        var sortableLanguages = [];
        for (var language in arrayLanguages) {
            sortableLanguages.push([language, arrayLanguages[language]]);
        }

        sortableLanguages.sort(function(a, b) {
            return b[1] - a[1];
        });

        //console.log(sortableLanguages);



        //console.log(arrayLocations);
        // for(var i = 0; i < 20; i++) {
        //     console.log(sortable[i]);
        // }

    })
    .done(function() { console.log('getJSON request succeeded!'); })
    .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + errorThrown); })
    .always(function() { console.log('getJSON request ended!'); });
});

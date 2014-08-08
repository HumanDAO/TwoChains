//    ______      ____          __  _
//   / ____/___  / / /__  _____/ /_(_)___  ____
//  / /   / __ \/ / / _ \/ ___/ __/ / __ \/ __ \
// / /___/ /_/ / / /  __/ /__/ /_/ / /_/ / / / /
// \____/\____/_/_/\___/\___/\__/_/\____/_/ /_/

// original link:
// https://api.foursquare.com/v2/venues/search?client_id=NLZAOKRUP1KFSRFHA1SQO3DH2214LAF0QV4UTEGMBHQG020Y&client_secret=UUCRXDQ2R1YITE04WPG0CAS40UBYREIAZTX0D0JZ0A2TEUX5&v=20130815&ll=29.7463409,-95.3504383&query=sushi

var FoursquarePuller = Backbone.Collection.extend({
    url: function() {
        return [
            'https://api.foursquare.com/v2/venues/explore?',
            'client_id=',
            this.client_id,
            '&client_secret=',
            this.client_secret,
            '&v=',
            '20130815',
            '&ll=',
            '29.7463409,-95.3504383',
            '&query=sushi'
        ].join('');
    },
    // Because 4sq doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(data, xhr) {
        console.log(data)
        return data.response.venues;
    },
    client_id: 'NLZAOKRUP1KFSRFHA1SQO3DH2214LAF0QV4UTEGMBHQG020Y', // put your api key here!
    client_secret: 'UUCRXDQ2R1YITE04WPG0CAS40UBYREIAZTX0D0JZ0A2TEUX5'
});


window.onload = app;

function app() {

    var myTemplate = $('#confusedMatt')[0].textContent;
    var myTemplatingFunction = _.template(myTemplate);

    var my4sqCollection = new FoursquarePuller();
    my4sqCollection.fetch().then(function() {

        var resultHtml = '';

        my4sqCollection.each(function(model) {
        	console.log(model.attributes)

            resultHtml += myTemplatingFunction(model.attributes);
        })

        $('.results ul').html(resultHtml)

    })
}

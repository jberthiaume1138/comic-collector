$('document').ready(function() {
    // $.getJSON('/api/series/20617')
    //     .fail(function() {
    //         console.log('ERROR reading data!');
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //     });
    $('main').on('click','.button-need', function() {
        console.log('need clicked');
        console.log(this);
    });

    $('main').on('click','.button-own', function() {
        console.log('own clicked');
    });

    Handlebars.registerHelper('dateTimeFormat', function(date, format) {
        return moment(date).format(format);
    });
});

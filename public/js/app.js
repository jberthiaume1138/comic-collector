$('document').ready(function() {
    // $.getJSON('/api/series/20617')
    //     .fail(function() {
    //         console.log('ERROR reading data!');
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //     });

    var comicCollector = new ComicCollector();




});

$('main').on('click','.button-need', function() {
    console.log('need clicked');
    console.log($(this).data('id'));

    var id = $(this).data('id');

    // fire function to call api_route which posts new item in user doc/needed issues
    // passing issue ID
    comicCollector.updatedNeed(id);
});

$('main').on('click','.button-own', function() {
    console.log('own clicked');
    console.log($(this).data('id'));

    var id = $(this).data('id');

    // fire function to call api_route which posts new item in user doc/owned issues
    // passing issue ID
    comicCollector.updateOwn(id);
});

var ComicCollector = function() {

};

ComicCollector.prototype.updatedNeed = function(id) {
    // call /api/

};

ComicCollector.prototype.updateOwn = function(id) {
    // call /api/
};

ComicCollector.prototype.searchMarvel = function() {
        // search Marvel's API 
};

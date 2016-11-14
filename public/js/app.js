$('document').ready(function() {
    var comicCollector = new ComicCollector();
});

var ComicCollector = function() {
    var self = this;
    this.inputSearch = $('#input-search');
    this.searchButton = $('#button-search');
    this.inputSearch.keydown(this.onInputSearchKeydown.bind(this));
    this.searchButton.on('click', this.onSearchButtonClicked.bind(this));
    this.$searchTemplate = $('#search-results-template');
    this.$searchResultsDiv = $('#results');
    self.main = $('main');
    self.main.on('click','.button-need', function() {
        self.updateNeed($(this).data('id'));
    });
    self.main = $('main');
    self.main.on('click','.button-own', function() {
        self.updateOwn($(this).data('id'));
    });
    self.main.on('click', '.btnSubscribe', function() {
        self.subscribe($(this).data('id'), $(this).data('title'));
    });
    self.main.on('click', '.btnDeleteSub', function() {
        self.deleteSubscription($(this).data('id'));
    });
};

ComicCollector.prototype.renderData = function(data, template, target) {
    // console.log(data);
    // console.log(template);

    var context = data;
    var compiledTemplate = Handlebars.templates['searchResults'];
    var html = compiledTemplate(context);

    $('#results').html(html);
};

ComicCollector.prototype.onInputSearchKeydown = function(event) {
    if (event.keyCode == 13 ) {
        this.searchMarvel(this.inputSearch.val().trim());
    }
};

ComicCollector.prototype.onSearchButtonClicked = function() {
    var searchTerms = this.inputSearch.val().trim();
    this.searchMarvel(searchTerms);
};

ComicCollector.prototype.searchMarvel = function(searchTerms) {
    // search Marvel's API
    var self = this;
    $.getJSON('/api/search/' + searchTerms)
        .fail(function() {
            console.log('ERROR searching');
            //TODO: show some kind of user message that search failed
        })
        .done(function(data) {
            self.renderData(data, self.$searchTemplate, self.$searchResultsDiv);
        });
};

ComicCollector.prototype.subscribe = function(seriesid, title) {
    console.log(seriesid);
    console.log(title);

    var userid = '5828105cff349d9f38bb946a';

	var itemToAdd = {  'seriesid': seriesid,
                        'title': title,
                        'startyear': 2015,
                        'inprogress': true
    };

    var url = '/api/users/' + userid + '/subscriptions';
    console.log(url);

	$.ajax(url, {
			type:'POST',
			data: JSON.stringify(itemToAdd),
			dataType: 'json',
			contentType: 'application/json'
		})
		.fail(function(err) {
			console.log('Failed to add the item.');
			console.log(err);
		})
		.done(function(data) {
            // on success, go to collection page
            console.log(data);
            window.location.href = '/subscriptions/' + userid;
        });
};

ComicCollector.prototype.deleteSubscription = function(series_id) {
    // method to remove a series sub from the user's subscriptions array
    // TODO also render a confirmation type warning

    var self = this;
    var userid = '5828105cff349d9f38bb946a';

    var url = '/api/users/' + userid + '/subscriptions/' + series_id;

    $.ajax(url, {
        type: 'DELETE',
        dataType: 'json',
    })
    .done(function(data) {
        $('#' + series_id).remove();
    });
};

ComicCollector.prototype.getSubscriptions = function(userid) {
    var url = '/api/users/' + userid + '/subscriptions';
    console.log(url);

    $.getJSON(url)
        .fail(function(err) {
            console.log(err);
        })
        .done(function(data) {
            console.log(data);
            //use the data
        });
};

ComicCollector.prototype.updateNeed = function(seriesid) {
    // call /api/
    console.log(seriesid);
};

ComicCollector.prototype.updateOwn = function(seriesid) {
    // call /api/
    console.log(seriesid);
};

ComicCollector.prototype.getSeries = function(seriesid) {
    // $.getJSON('/api/series/20617')
    //     .fail(function() {
    //         console.log('ERROR reading data!');
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //     });
};

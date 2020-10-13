// 1. Retrieve user inputs and turn them into variables
// 2. Use variables to run AJAX call to the NY Times API
// 3. Gather all usable information from the response from NY Times object
// 4. Dinamically generate the cards in the front end and populate them with the gathered info

// Setup Variables

//  Search Parameters
var queryTerm = "";
var numArticles = 0;
var startDate = "";
var endDate = "";

var APIKEY = "nMPu0hYjLaU8GYti0AS89T5aQRFPPCI5"
var queryBaseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key="+ APIKEY;


// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startDate + "&end_date=" + endDate + "&q=" + queryTerm + "&sort=newest&api-key="+ APIKEY
var queryURL = "";

// Functions

function runQuery(numArticles, queryURL) {

    // AJAX function
    $.ajax({
        url: queryURL, 
        method: "GET"
    }).then(function(res) {
        
        // Empty cards from previous search
        $("#articlesDiv").empty();

        for (var i=0; i<numArticles; i++) {

            // Log all the required info from each article
            console.log("Headline: " + res.response.docs[i].headline.main);
            console.log("Section: " + res.response.docs[i].section_name);
            console.log("Publication Date: " + res.response.docs[i].pub_date);
            console.log(res.response.docs[i].byline.original);
            console.log("URL: " + res.response.docs[i].web_url)
            console.log("==============================")

            // Generate article div and append it to the defined section in results area
            var articleDiv = $("<div>");
            articleDiv.addClass("card card-body bg-light");
            articleDiv.attr("id", "artDiv-" + i);
            $("#articlesDiv").append(articleDiv);

            // Integrate info in each article div
            var artHeader = $("<h3>" + res.response.docs[i].headline.main + "</h3>");
            var artSection = $("<h5>" + res.response.docs[i].section_name + "</h5>");
            var artDate = $("<h5>" + res.response.docs[i].pub_date + "</h5>");
            var artBy = $("<h5>" + res.response.docs[i].byline.original + "</h5>");
            var artURL = $("<a href=" + res.response.docs[i].web_url + ">" + res.response.docs[i].web_url + "</a>");

            $("#artDiv-" + i).append(artHeader, artSection, artDate, artBy, artURL);

        }
        console.log(res.response.docs);

    });
}

// Main Processes

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    // Retrieve values from form to pass to the queryURL
    queryTerm = $("#search").val().trim();
    startDate = $("#startYear").val().trim();
    endDate = $("#endYear").val().trim();

    // Get number of articles to display
    var articlesNumber = $("#itemNumber").val();
    console.log(articlesNumber);

    
    if (!queryTerm) {
        alert("Please enter a search term")
    } else if (queryTerm) {
        var newURL = queryBaseURL + "&q=" + queryTerm;

        if (parseInt(startDate)) {
            newURL = newURL + "&begin_date=" + startDate;
        }

        if (parseInt(endDate)) {
            newURL = newURL + "&end_date=" + endDate;
        }
        runQuery(articlesNumber, newURL);
    }
    
    console.log(newURL);

    return false;
})
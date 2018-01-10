$(document).on("click", ".save", function() {
    let id = ($(this).data("id"))
    $.ajax({
            method: "PUT",
            url: "/saved/" + id
        })
        .done(function(data) {
            console.log(data)
        })
})

$(document).on("click", ".delete", function() {
    let id = ($(this).data("id"))
    $.ajax({
            method: "PUT",
            url: "/delete/" + id
        })
        .done(function(data) {
            console.log(data)
        })
})

$(document).on("click", "#wired", function() {
    $.ajax({
            method: "GET",
            url: "/"
        })
        .done(function(data) {
            console.log("click")
        })
})

$(document).on("click", "#home", function() {
    $.ajax({
            method: "GET",
            url: "/articles"
        })
        .done(function(data) {
            console.log("click")
        })
})

$(document).on("click", "#savedArticles", function() {
    $.ajax({
            method: "GET",
            url: "/saved"
        })
        .done(function(data) {
            console.log("click")
        })
})

$(document).on("click", "#scrape", function() {
    $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .done(function(data) {
            console.log("click")
        })
})
$(function() {
    $(document).on("click", ".note", function() {
        event.preventDefault();
        let id = ($(this).data("id"))
        $(".bootbox").removeClass("hide")
    })
})

$(function() {
    $(document).on("click", ".close", function() {
        event.preventDefault();
        $(".bootbox").addClass("hide")
    })
})

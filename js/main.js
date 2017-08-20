// listen for form submits 
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // prevent form submit --save
    e.preventDefault();

    // capture input values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }



    // combine the 2 values
    var bookmark = {
        name: siteName,
        url: siteURL
    }

    // check if booksmarks array exists in local storage
    if(localStorage.getItem('bookmarks') === null){
        // if doesnt exist initialize bookmarks array
        var bookmarks = [];

        // once initialized add the submitted bookmark value to array
        bookmarks.unshift(bookmark);

        // once values submitted to bookmarks array... submit array to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks string array from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // add the new bookmark values to array
        bookmarks.unshift(bookmark);

        // put newly updated bookmarks array back to local storage as a string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }



    // Re-fetch bookmarks
    fetchBookmarks();

    //Clear values in form
    clearForms();

    // -----------------------------------------local storage examples---------------------------------------------
    // localStorage.setItem('test', 'hello world');
    // localStorage.getItem('test');
    // localStorage.removeItem('test');

    // console.log(bookmark);
};



// clear values in form
function clearForms(){
    // siteName.value = '';
    // siteURL.value = '';

    document.getElementById('myForm').reset();
}


//delete bookmarkfunction
function removeBookmark(url){
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through these bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            //remove bookmark from array
            bookmarks.splice(i, 1);
        }
    }

    // reset newly updated bookmarks array back to local storage as a string
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();

}

// fetch bookmarks
function fetchBookmarks(){
    // get bookmarks string array from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output div id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // build the output
    bookmarksResults.innerHTML = '';
    for(var i=0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit Website</a> ' +
                                      ' <a onclick="removeBookmark(\''+url+'\')" class="btn btn-danger">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';
    }
}


// style="float: left; margin-left: 1%; color: red; font-weight: bold;

// ----------------------------------validation function----------------------------------------------------
function validateForm(siteName, siteURL){
// prevent blanks and empty entry
    if(!siteName){

        

        var errorsForm = document.getElementById('errors');


        errorsForm.setAttribute("style", "color:red; font-size:5px !important;");

        errorsForm.innerHTML = '<p>Please Enter Website Name</p>';
        // alert('Please Enter Website Name');
        return false;
    }

    if(!siteURL){

        var errorsForm2 = document.getElementById('errors2');

        errorsForm2.setAttribute("style", "color:red; font-size:5px !important;");

        errorsForm2.innerHTML = '<p>You forgot to Enter the Website URL!</p>';
        // alert('You forgot to Enter the Website URL!');
        return false;
    }

    // check http/https match for siteURL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){

        var errorsForm2 = document.getElementById('errors2');

        errorsForm2.setAttribute("style", "color:red; font-size:5px !important;");

        errorsForm2.innerHTML = '<p>Please use a valid URL</p>';


        // alert('Please use a valid URL');
        return false;
    }

    return true;
}
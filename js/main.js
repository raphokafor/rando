// listen for form submits 
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    // prevent form submit --save
    e.preventDefault();

    // capture input values
    var siteName = document.getElementById('siteName').value;

    if(!validateForm(siteName)){
        return false;
    }


    // combine the 2 values
    var bookmark = {
        name: siteName,
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
function removeBookmark(name){
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through these bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].name === name){
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

        bookmarksResults.innerHTML += 
                                    '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a onclick="removeBookmark(\''+name+'\')" class="btn btn-danger">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';
    }
}


// style="float: left; margin-left: 1%; color: red; font-weight: bold;

// ----------------------------------validation function----------------------------------------------------
function validateForm(siteName){
// prevent blanks and empty entry
    if(!siteName){


        var errorsForm = document.getElementById('errors');


        errorsForm.setAttribute("style", "color:red; font-size:5px !important;");

        errorsForm.innerHTML = '<p>Please Enter Website Name</p>';
        // alert('Please Enter Website Name');
        return false;
    }


    return true;
}


document.getElementById('random').onclick = function(e){

    e.preventDefault();

    // get bookmarks string array from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output div id
    var bookmarksChoice = document.getElementById('choices');

    if(bookmarks.length > 0) {

        var ri = Math.floor(Math.random() * bookmarks.length);
    
        bookmarksChoice.innerHTML =     '<h4>Our Random Choice for you:</h4>'+
                                        '<div class="well">'+
                                          ' <h3>'+bookmarks[ri].name+'</h3> ' +
                                        '</div>';
    
        // bookmarks.splice(bookmarks[ri]);
        // bookmarks.unshift(bookmarks[ri]);

    } else {

        return ;

    }



}

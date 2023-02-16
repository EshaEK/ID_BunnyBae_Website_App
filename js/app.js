//API function
$(document).ready(function () {
    const APIKEY = "63e4b29b478852088da67f10";
    getContacts();
    $("#update-contact-container").hide();
  
    $("#contact-submit").on("click", function (e) { 
      e.preventDefault();
  

      let contactname = $("#contact-name").val();
      let contactemail = $("#contact-email").val();
      let contactpassword =$("contact-password").val();
  

      let jsondata = {
        "name": contactname,
        "email": contactemail,
        "password": contactpassword, // put comma for test first
      };
  
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://projectip-f606.restdb.io/rest/contacts",
        "method": "POST", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          $("#contact-submit").prop( "disabled", true);
          $("#add-contact-form").trigger("reset");
        }
      }
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#contact-submit").prop( "disabled", false);
        
        //@TODO update frontend UI 
        $("#add-update-msg").show().fadeOut(3000);
  
        //update our table 
        getContacts();
      });
    });//end click 
  
  
    //[STEP] 6
    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function getContacts(limit = 10, all = true) {
  
      //[STEP 7]: Create our AJAX settings
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://projectip-f606.restdb.io/rest/contacts",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
  

      $.ajax(settings).done(function (response) {
        
        let content = "";
  
        for (var i = 0; i < response.length && i < limit; i++) {

          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].email}</td>
          <td>${response[i].password}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-name='${response[i].name}' data-email='${response[i].email}' data-password=' ${response[i].password}'>Update</a></td></tr>`;
  
        }

        $("#create_account").html(content);
  
        $("#total-contacts").html(response.length);
      });
  
  
    }
  
   
    $("#contact-list").on("click", ".update", function (e) {
      e.preventDefault();
      //update our update form values
      let contactname = $(this).data("name");
      let contactemail = $(this).data("email");
      let contactpassword = $(this).data("password");
      let contactId = $(this).data("id");
    
  
 
      $("#update-contact-name").val(contactname);
      $("#update-contact-email").val(contactemail);
      $("#update-contact-Id").val(contactId);
      $("update-contact-password").val(contactpassword);
      $("#update-contact-container").show();
  
    });
    $("#update-contact-submit").on("click", function (e) {
      e.preventDefault();
      let contactname = $("#update-contact-name").val();
      let contactemail = $("#update-contact-email").val();
      let contactpassword = $("update-contact-password").val();

      let contactId = $("#update-contact-id").val();
  
 
      updateForm(contactId, contactname, contactemail,contactpassword);
    });
  
    function updateForm(id, contactname, contactemail) {
 
  
      var jsondata = { "name": contactname, "email": contactemail , "password":contactpassword};
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://projectip-f606.restdb.io/rest/contacts/${id}`,
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }
  
      //[STEP 13a]: send our AJAX request and hide the update contact form
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#update-contact-container").fadeOut(5000);
        //update our contacts table
        getContacts();
      });
    }//end updateform function
  
  })
  

// ======================== Light & Dark Mode ========================\

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}


// ======================== Hamburger Menu ========================\

var hamburger = document.getElementById("lines-icon");
var menu = document.getElementById("menu");

hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
  } else {
    menu.classList.add("showMenu");
  }
}

// ======================== Lottie Animation ========================\


var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: 'https://assets7.lottiefiles.com/packages/lf20_yopo5lmk.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
})
//api function
$(document).ready(function() {
  const APIKEY = "63b78dd0969f06502871ab17";
  getContacts();
  $("#update-contact-container").hide();
  $("#add-update-password").hide();


  $("#contact-submit").on("click", function(e) {
    e.preventDefault();


    let contactName = $("#contact-name").val();
    let contactEmail = $("#contact-email").val();
    let contactPassword = $("#contact-password").val();


    let jsondata = {
      "name": contactName,
      "email": contactEmail,
      "Password": contactPassword
    };

 
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactivedev-4e2a.restdb.io/rest/contact",
      "method": "POST", 
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function() {

        $("#contact-submit").prop("disabled", true);
        $("#add-contact-form").trigger("reset");
      }
    }

    $.ajax(settings).done(function(response) {
      console.log(response);

      $("#contact-submit").prop("disabled", false);

      $("#add-update-password").show().fadeOut(3000);
 
      getContacts();
    });
  });



  function getContacts(limit = 10, all = true) {

 
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactivedev-4e2a.restdb.io/rest/contact",
      "method": "GET", 
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    }


    $.ajax(settings).done(function(response) {

      let content = "";

      for (var i = 0; i < response.length && i < limit; i++) {
    
        content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
        <td>${response[i].email}</td>
        <td>${response[i].password}</td>
        <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-password='${response[i].password}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;

      }

  
      $("#contact-list tbody").html(content);

      $("#total-contacts").html(response.length);
    });


  }

  $("#contact-list").on("click", ".update", function(e) {
    e.preventDefault();
    
    let contactName = $(this).data("name");
    let contactEmail = $(this).data("email");
    let contactPassword = $(this).data("password");
    let contactId = $(this).data("id");
    console.log($(this).data("password"));


    $("#update-contact-name").val(contactName);
    $("#update-contact-email").val(contactEmail);
    $("#update-contact-password").val(contactPassword);
    $("#update-contact-id").val(contactId);
    $("#update-contact-container").show();

  });


  $("#update-contact-submit").on("click", function(e) {
    e.preventDefault();
    let contactName = $("#update-contact-name").val();
    let contactEmail = $("#update-contact-email").val();
    let contactPassword = $("#update-contact-password").val();
    let contactId = $("#update-contact-id").val();

    console.log($("#update-contact-password").val());
    console.log(contactPassword);


    updateForm(contactId, contactName, contactEmail, contactPassword);
  });

  function updateForm(id, contactName, contactEmail, contactPassword) {
   

    var jsondata = { "name": contactName, "email": contactEmail, "password": contactPassword};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://interactivedev-4e2a.restdb.io/rest/contact/${id}`,
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function(response) {
      console.log(response);

      $("#update-contact-container").fadeOut(5000);
   
      getContacts();
    });
  }

})
  

// ======================== Light & Dark Mode ========================\

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// ======================== Lottie Animation ========================\


var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: 'https://assets7.lottiefiles.com/packages/lf20_yopo5lmk.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
})

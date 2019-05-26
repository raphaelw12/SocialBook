import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.proFile.helpers({
	proAll(){
	return userDB.find({});
},
});

// Template.Like.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });


Template.proFile.events({
  'click .js-like'(event, instance) {
    console.log("you click like");
    var proFID = this._id;
    var numLikes =userDB.findOne({_id: proFID}).like;
    if (!numLikes) {
    	numLikes= 0;
    }
    numLikes = numLikes + 1;
    console.log("you have",numLikes);
    userDB.update({_id:proFID}, {$set:{'like':numLikes}});
  },
  'click .js-dislike'(event, instance){
  	console.log("you clicked dislike");
  	var proFID = this._id;
    var numDLikes =userDB.findOne({_id: proFID}).dislike;
    if (!numDLikes) {
    	numDLikes= 0;
    }
    numDLikes = numDLikes + 1;
    console.log("you have",numDLikes);
    userDB.update({_id:proFID}, {$set:{'dislike':numDLikes}});
  },

  'click .js-delete'(event, instance){
  	// console.log(this._id);
  	var proFID = this._id;
  	$("#" + proFID).fadeOut("slow","swing",function() {
  		userDB.remove({_id: proFID});
  	});  	
  },
  'click .js-profileedit'(event, instance){
  	var uId =this._id;
  	$('#userId').val(uId);
  	$('#viewUser img').attr('src',userDB.findOne({_id:uId}).img);
  	$("#edited").modal('show');
  	console.log("open modal");
  }
});

Template.addProfile.events({
'click .js-saveProfile'(event, instance){  	
// get user data
var fName = $("#picture input[name='firstName']").val();
 	
var lName = $("#picture input[name='lastName']").val();
 	
var image = $("#picture input[name='image']").val();
if (image == ""){
	image="pokemon.png";
}	
console.log("The first name is" ,fName);
console.log("The last name is",lName);
console.log("The image is",image);
//reset the fore
$("#picture input[name='firstName']").val('');
$("#picture input[name='lastName']").val('');
$("#picture input[name='image']").val('');
//close the modal 
  $("#picture").modal("hide");
  userDB.insert({'firstName':fName, 'lastName':lName, 'img':image});
  },
});
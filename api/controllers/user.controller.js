var mongoose = require('mongoose');
var User = mongoose.model('User');
var List = mongoose.model('List');

module.exports.usrGet = function(req,res){
	var usrid = req.params.usrid;
	console.log ('GET userid', usrid);

	User.
		findById(usrid).
		populate('lists').
		exec(function (err,user){
			var response = {
				status : 200,
				message : user
			};
			if (err) {
				console.log('Error finding user');
				response.status = 500;
				response.message = err;
			} else if (!user) {
				console.log('Cannot find user', usrid);
				response.status = 404;
				response.message = { "message":"User ID not found"};
			}
			res.
				status(response.status).
				json(response.message);
		});
}

module.exports.usrNew = function(req,res){
	User.
		create({
			username : req.body.username,
			email : req.body.email,
			lists : []
		}, function(err,user){
			if (err){
				console.log('Error creating user');
				res.
					status(400).
					json(err);
			} else {
				console.log('User created', user);
				res.
					status(201).
					json(user);
			}
		});
}

module.exports.usrUpdate = function(req,res){
	var usrid = req.params.usrid;
	console.log('UPDATE usrid',usrid);

	User.
		findById(usrid).
		select("-lists").
		exec(function(err,doc) {
			var response = {
				status : 200,
				message : doc
			};
			if (err){
				console.log('Error finding user');
				response.message = err;
			} else if (!doc){
				response.status = 404;
				response.message = {
					"message" : "User ID not found"
				};
			}
			if (response.status != 200) {
				res.
					status(response.status).
					message(response.message);
			} else {
				doc.username = req.body.username;
				doc.email = req.body.email;
				doc.save(function(err,updatedusr){
					if (err){
						console.log('Error updating user');
						res.
							status(500).
							json(err);
					} else {
						console.log('Updated user',usrid)
						res.
							status(204).
							json();
					}
				});
			}
		});
}

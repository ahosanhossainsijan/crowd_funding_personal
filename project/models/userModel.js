const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getByUsername: function(username, callback){
		var sql = "select * from users where username='"+username+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
			var sql = "INSERT INTO users(username,email,password, type,status) VALUES ('"+user.username+"','"+user.email+"','"+user.password+"','"+user.type+"','"+user.status+"')";
			console.log(sql);
			db.execute(sql,function(status){
				var sql = "select id from users where username='"+user.username+"'";
				db.getResults(sql, function(results){
					var sql1 = "INSERT INTO personal(uid,name,contactno,gender,address) VALUES ('"+results[0].id+"','"+user.name+"','"+user.contactno+"','"+user.gender+"','"+user.address+"')";
	             	db.execute(sql1,function(status){
	             			callback(status);
	             	});
					 
				});
	            
			});
		
	},

	update:function(user, callback){
		var sql = "UPDATE users SET name='"+user.name+"',username='"+username+"',contactno='"+user.contactno+"',age='"+user.age+"',password='"+user.password+"',type='"+user.type+"' WHERE id = '"+user.id+"'";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id = '"+id+"'";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	search: function(user, callback){
		var sql = "SELECT * FROM users WHERE "+user.searchby+" LIKE '%"+user.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
};
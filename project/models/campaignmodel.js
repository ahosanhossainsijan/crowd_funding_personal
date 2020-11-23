const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = "select * from campaigns where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	
	getAll: function(callback){
		var sql = "select * from campaigns";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	
	insert: function(campaign, callback){
			var sql = "INSERT INTO campaigns(uid,target_fund,raised_fund, ctype,description,image,publisedDate,endDate,status,title) VALUES ('"+campaign.uid+"','"+campaign.targetfund+"','"+campaign.raisedfund+"','"+campaign.ctype+"','"+campaign.description+"','"+campaign.image+"','"+campaign.publisheddate+"','"+campaign.enddate+"','"+campaign.status+"','"+campaign.title+"')";
			console.log(sql);
			db.execute(sql,function(status){
				
	             			callback(status);
	             	});
	},

	update: function(campaign, callback){
		var sql = "update campaigns set target_fund = '"+campaign.target_fund+"', raised_fund = '"+campaign.raisedfund+"', ctype = '"+campaign.campaigntype+"', description = '"+campaign.description+"', image = '"+campaign.image+"', publisedDate = '"+campaign.publishdDate+"', endDate = '"+campaign.enddate+"', title = '"+campaign.title+"'   where id = '"+campaign.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(campaign, callback){
		var sql = "delete from campaigns where id = '"+campaign.id+"'";
		db.execute(sql, function(status){
			console.log(status);
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

report: function(campaign, callback){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours()+":" + today.getMinutes() + ":" +today.getSeconds();
		var dateTime = date+' '+time;
		console.log(dateTime);
		var sql = "insert into reports (cid, uid, description, updatedDate) values('"+campaign.id+"','"+campaign.uid+"', '"+campaign.description+"', '"+dateTime+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	contactadmin: function(campaign, callback){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours()+":" + today.getMinutes() + ":" +today.getSeconds();
		var dateTime = date+' '+time;
		console.log(dateTime);
		var sql = "insert into contactadmin ( uid, description, updatedDate) values('"+campaign.uid+"', '"+campaign.description+"', '"+dateTime+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	check: function(campaign, callback){
		var sql = "select * from bookmarks where cid = '"+campaign.id+"'";
		db.getResults(sql, function(results){
			if(results.length>0){
				callback(false);
			}else{
				callback(true);
			}
			
		});
	},
	search: function(title, callback){

		var sql = "select * from campaigns where title like '%"+title+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},

	bookmarks: function(campaign, callback){
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours()+":" + today.getMinutes() + ":" +today.getSeconds();
		var dateTime = date+' '+time;
		console.log(dateTime);
		var sql = "insert into bookmarks (cid, uid, updatedDate) values('"+campaign.id+"','"+campaign.uid+"', '"+dateTime+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	
	history: function(campaign, callback){
		var sql = "select * from campaigns where uid = '"+campaign.id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	
	};
const Twit = require('twit')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/bigdata-twitter');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('connected')
	  // we're connected!
	});

var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


TweetsSchema = mongoose.Schema({
    _id:Number,
    created_at: Date,
    is_retweet:Boolean,
    retweeted_count: Number,
    lang: String,
    user: Object 
},{
    versionKey: false // You should be aware of the outcome after set to false
});

var TweetsSchema = mongoose.model('TweetsSchema', TweetsSchema);

//
//  search twitter for all tweets containing the word 'ww3'
//

var lastId = 0;
var MaxTwitt = 0;

T.get('search/tweets', { q: 'ww3', count: 100}, function(err, data, response) {

   for (var i = 0; i < data.statuses.length; i++) {
  		var TwitterS = new TweetsSchema({ 
  			_id: data.statuses[i].id,
		    created_at: data.statuses[i].created_at,
		    is_retweet: data.statuses[i].retweeted,
		    retweeted_count: data.statuses[i].retweet_count,
		    lang: data.statuses[i].lang,
		    user: data.statuses[i].user
  		});

  		TwitterS.save(function (err, TwitterS) {
		  if (err) return console.error(err);
		});

		if(i == data.statuses.length - 1 ) {
			lastId = data.statuses[i].id;
		}

		MaxTwitt++;

   }
   searchTwitt(lastId)
});



function searchTwitt(LastID) {
	T.get('search/tweets', { q: 'ww3', count: 100, max_id: lastId }, function(err, data, response) {

	   for (var i = 0; i < data.statuses.length; i++) {
	   		console.log(data.statuses[i].id)
	  		var TwitterS = new TweetsSchema({ 
	  			_id: data.statuses[i].id,
			    created_at: data.statuses[i].created_at,
			    is_retweet: data.statuses[i].retweeted,
			    retweeted_count: data.statuses[i].retweet_count,
			    lang: data.statuses[i].lang,
			    user: data.statuses[i].user
	  		});

	  		TwitterS.save(function (err, TwitterS) {
			  if (err) return console.error(err);
			});

	  		if(i == data.statuses.length - 1 ) {
				lastId = data.statuses[i].id;
			}

			MaxTwitt++;
	   }
	   	if (MaxTwitt <= 8000) {
	   		console.log("Max twitt: "+ MaxTwitt);
	 		searchTwitt(lastId)
	 	}
	});
}

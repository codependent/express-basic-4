var assert = require("assert")

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
			//Con assert
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(1, [1,2,3].indexOf(2));
			//Equivalente con should
			[1,2,3].indexOf(5).should.be.exactly(-1);			
			[1,2,3].indexOf(2).should.be.exactly(1);
		})
	})
});

describe('User', function(){
	describe('#save()', function(){
		it('should save without error', function(done){
			var user = new User('Luna');
			user.save(function(err){
				if (err) throw err;
				done();
			});
		})
	})
})

describe('User', function(){
	describe('#save()', function(){
		it('should save without error', function(done){
			var user = new User('Luna');
			user.save(done);
		})
	})
})

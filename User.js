function User (emailId,password,firstName,lastName,birthDate) {
        this.emailId = emailId ,
        this.password = password,
        this.firstName = firstName,
        this.lastName = lastName,
        this.birthDate = birthDate,
        friends = [],
        movies = [],
        books = [],
        shows =[],
        games = []
        //isMatch = function(emailId,password){return ((this.emailId===emailId)&&(this.password===password));}
    };

User.prototype.getInfo = function() {
    return 'Name: '+this.firstName + ' ' + this.lastName +
    	   ' emailId:'+this.emailId+' birth Date:'+this.birthDate ;
};
User.prototype.isMatch = function(emailId,password){
	return ((this.emailId===emailId)&&(this.password===password));
};

module.exports = User;
import jwt from 'jsonwebtoken'

export class Auth {
	constructor(user){
		this.user=user;
		this.token=this.encode(user);
		this.expire_at=new Date().getTime() + 1000*60*60*24;
	}

	encode(user){
	  let obj=JSON.parse(JSON.stringify(user));
  	  return jwt.sign(obj, process.env.JWT_KEY, {expiresIn: 1000*60*60*24});
	}

	static decode(token){
	  try{ 
  		return jwt.verify(token,process.env.JWT_KEY)
	  }catch(e){ 
	  	return 0;
	  }
	}

	static hashPass(pass){
		return jwt.sign(pass, process.env.JWT_KEY);
	}
}  
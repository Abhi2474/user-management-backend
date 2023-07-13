import User from '../modals/user'
import userSchema from '../validator';

const UserControllers = {
	async create_user(req, res,next){
		const { error } = userSchema.validate(req.body)

		if(error){
			return next(new Error('fill correctly'))
		}

		const { name, email, phone } = req.body

		const exist = await User.exists({email});

		let document
		if(exist){
			return next(new Error('already exists'))
		}
		else{
			try {
				document = await User.create({
					name, 
					email, 
					phone
				})
			} catch (error) {
				console.log(error);
				return next(error)
			}
			res.status(201).json(document)
		}
	},

	// get the users list 
	async get_user(req, res, next){
		let documents

		try {
			documents = await User.find().sort({_id: -1})
		} catch (error) {
			console.log(error);
			return next(error)
		}

		return res.json(documents)
	},

	// function to delete user from the database
	async delete_user(req, res, next){
        const document = await User.findOneAndRemove({ _id: req.params.id })

		if(!document){
			return next(new Error('User does not exist to delete'))
		}

		res.json(document)
	},

	// function to update user from the database
	async update_user(req, res, next){
		const { error } = userSchema.validate(req.body)

		if(error){
			return next(new Error(`${error}`))
		}

        const { name, email, phone } = req.body

		const exist = await User.exists({ _id: req.params.id });

		let document
		if(!exist){
			return next(new Error('User does not exist to update'))
		}
		else{
			try {
				document = await User.findOneAndUpdate({ _id: req.params.id },{
					name, 
					email, 
					phone
				},{ new: true })
			} catch (error) {
				console.log(error);
				return next(error)
			}
			res.status(201).json(document)
		}
	},
	async single_user(req, res, next){
		const document = await User.findOne({ _id: req.params.id })

		if(!document){
			return next(new Error('User does not exist'))
		}

		res.json(document)
	}
}

export default UserControllers
//post.js controller
//import post schema
const { get } = require('mongoose');
const Post = require('../models/post');

//creating a Create Post Controller
const createPost = async(req, res) => {
    //Desctructuring the body of req
    const { title, author, description, likes, comments } = req.body;

    try {
        const post = await Post.create({
            title,
            author,
            description,
            likes,
            comments,
        });
        res.status(200).json(post);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Get all the post / R of CRUD
const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            count: posts.length,
            posts,
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Get a single post
const getPost =  async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({error: "No post found."})
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/*TODO - DEBUG my error - commented out my code due to an error it said on line 52, copied code below works, not sure what is different/Update a post / U of CRUD
const updatePost = async(rec, res) => {
    const {id} = req.params;
    try {
        constpost = await Post.findByIdAndUpdate(
            {_id: id },
            {...req.body },
            { new: true, runValidators: true}
        );
        if(!post){
            return res.status(404).json({
                error: "No matching post found!",
                post
            });
        };
        res.status(200).json({
            message: "The post has been successfully updated"
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
*/
//update post
const updatePost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true });

		if (!post) {
			return res.status(404).json({
				error: "No matching post found",
			});
		}

		res.status(200).json({
			message: "The post has been successfully updated.",
			post,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};


//delete controller
const deletePost = async(req, res) => {
    const {id } = req.params;
    try {
        const post = await Post.findByIdAndDelete({_id: id });
        if(!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        }
        res.status(200).json({
            message:"The post has been successfully deleted!"
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }

};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};

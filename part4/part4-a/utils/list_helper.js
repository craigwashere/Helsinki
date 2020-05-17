const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return (sum+item.likes)
    }
    return blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
	const reducer = (maxItem, currentItem) => {
		return (maxItem.likes > currentItem.likes ? maxItem : currentItem);	
	}
	return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
	const result_countBy = _.countBy(blogs, "author");
	const result_entries = _.entries(result_countBy);
	const result_maxBy = _.maxBy(result_entries, _.last)
	return result_maxBy;
}

const mostLikes = (blogs) => {
	const result_groupBy = _.groupBy(blogs, "author");
	const return_set = {}

	_.forEach(result_groupBy, function(value, key) {
		const likes = _.reduce(value, (sum, item) => (sum+item.likes), 0)
		_.set(return_set, key, likes)
	});
	const result_entries = _.entries(return_set);
	return _.maxBy(result_entries, _.last)
}

module.exports = {  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes  }

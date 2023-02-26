const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((prevValue, data) => {
        return prevValue + data.likes;
    }, 0)
}

/**
 * @typedef {title: string, author: string, likes: number, url: string} Blog
 * @param {Array<Blog>} blogs 
 */
const favoriteBlog = (blogs) => {
    let max = 0;
    let res;
    blogs.forEach(blog => {
        if (blog.likes > max) {
            max = blog.likes
            res = blog
        }
    })
    return { title: res.title, author: res.author, likes: res.likes }
}

const mostBlogs = (blogs) => {
    const blogCounts = _.countBy(blogs, 'author');
    // console.log(blogCounts);
    const topAuthor = _.maxBy(_.keys(blogCounts), (author) => blogCounts[author]);
    // console.log(topAuthor);
    return { author: topAuthor, blogs: blogCounts[topAuthor] };
}

const mostLikes = (blogs) => {
    const blogsGroupByAuthors = _.groupBy(blogs, 'author');
    const blogsWithLikes = _.map(_.keys(blogsGroupByAuthors), (author) => {
        return {
            author: author, likes: blogsGroupByAuthors[author].reduce((prev, current) => {
                return prev + current.likes
            }, 0)
        }
    })
    return _.maxBy(blogsWithLikes, (b) => b.likes)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
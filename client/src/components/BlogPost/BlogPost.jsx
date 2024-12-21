import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./BlogPost.css";
const BlogPost = ({ posts }) => {
  const { id } = useParams();

  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return (
      <div className="error-message">
        Bài viết không tồn tại. <Link to="/">Quay về trang chính</Link>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p className="post-date">{post.date}</p>
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default BlogPost;

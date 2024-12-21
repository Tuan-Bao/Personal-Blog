import { Link } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = ({ logOut, posts }) => {
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Blog Cá Nhân</h1>
        <button onClick={() => logOut()} className="logout-button">
          Đăng xuất
        </button>
      </header>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post.id} className="post-preview">
            <Link to={`/article/${post.id}`} className="post-title">
              {post.title}
            </Link>
            <p className="post-date">{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;

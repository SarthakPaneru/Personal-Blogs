import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const dir = path.join(process.cwd(), "_content");

export const getBlogPostsByPage = (page = 1, pageSize = 10) => {
  const allFiles = fs.readdirSync(dir);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const filesForPage = allFiles.slice(start, end);

  const blogs = filesForPage.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const readTime = readingTime(content);
    return { data, content, readTime };
  });

  return blogs;
};

export const getAllBlogPosts = () => {
  const allFiles = fs.readdirSync(dir);
  const allBlogs = allFiles.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const readTime = readingTime(content);
    return { data, content, readTime };
  });

  return allBlogs;
};

export const getAllTopics = () => {
  const allFiles = fs.readdirSync(dir);
  const allTopics = allFiles.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data.Topic;
  });

  const filteredTopics = new Set(allTopics);
  return [...filteredTopics];
};

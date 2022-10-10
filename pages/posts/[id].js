import postMap from 'postMap.json';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import ReactMarkdown from 'react-markdown';

const postsDirPath = path.join(process.cwd(), '_posts');

export async function getStaticPaths(context) {
    return {
        paths: Object.keys(postMap).map(id => ({
            params: { id }
        })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { id } = context.params;
    const { name, title, date } = postMap[id];
    const mdData = fs.readFileSync(`${postsDirPath}/${name}`);
    const { content: mdText } = matter(mdData);
    return {
        props: {
            id,
            title,
            date,
            mdText,
        }
    }
}

const Post = (props) => {
    const { mdText, date, title } = props;
    return (
        <div>
            <div>
                title: {title}
            </div>
            <div>
                date: {date}
            </div>
            <ReactMarkdown children={mdText} />
        </div>
    )
}

export default Post;
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {Post, PostData} from "@/pages/posts/[id]";
import { remark } from "remark";
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
export function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);

	const allPostsData: Post[] = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			date: matterResult.data.date,
			title: matterResult.data.title,
		};
	});

	return allPostsData.sort((a, b) => {
		if (a.date < b.date) return 1;
		else return -1;
	})
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, '')
			},
		}
	})
}

export async function getPostsData(id: string): Promise<PostData> {
	const fullPath = path.join(postsDirectory, `${id}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const matterResultParser = matter(fileContents);
	const contentHtml = await remark()
    .use(html)
    .process(matterResultParser.content)
    .then(content => content.toString());

	return {
		id,
		date: matterResultParser.data.date,
		title: matterResultParser.data.title,
    contentHtml
	}
}
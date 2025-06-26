import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import markdownit from 'markdown-it';
import View from '@/components/View';
import { Skeleton } from '@/components/ui/skeleton';

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	// TODO: Uncomment when the client is set up

	// const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

	// console.log('Fetched post:', post);

	const post = {
		_createdAt: '2025-06-25T10:49:58Z',
		_id: 'a3ce392b-637a-49c2-a584-e2d87961c1a5',
		author: {
			_id: 'c104d027-23af-4e67-9cad-9db7d9dfee3a',
			bio: 'Next.js Enthusiast',
			image:
				'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo-doubao-overflow.png',
			name: 'WMC',
			username: 'amingdrift',
		},
		category: 'Travel',
		description:
			'An online platform offering project-based learning for web developers.aimed at leveling up junior to mid-level developers by focusing on real-world applications',
		image:
			'https://jsmastery.com/_next/image?url=https%3A%2F%2Fjavascript-mastery.s3.amazonaws.com%2Fassets%2Fcontent%2Fcourses%2F1736834852750%2Ficon%2FThe%2520Ultimate%2520Next.js%252015%2520Course.png&w=640&q=75',
		pitch:
			'# This is great\n> hahaha\n\n- You are god!!!\n- We are akm\n\n```\njavascript\n```',
		slug: {
			_type: 'slug',
			current: 'jsm-academy-masterclass-1',
		},
		title: 'JSM Academy Masterclass',
		views: 1,
	};

	if (!post) return notFound();

	const parsedContent = md.render(post.pitch || '');

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formatDate(post?._createdAt)}</p>
				<h1 className="heading">{post.title}</h1>
				<p className="sub-heading !max-w-5xl">{post.description}</p>
			</section>

			<section className="section_container">
				<img
					src={post.image}
					alt="thumbnail"
					className="w-full h-auto rounded-xl"
				/>

				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${post.author?._id}`}
							className="flex gap-2 items-center mb-3"
						>
							<Image
								src={post.author.image}
								alt="avatar"
								width={64}
								height={64}
								className="rounded-full drop-shadow-lg"
							/>
							<div>
								<p className="text-20-medium">{post.author.name}</p>
								<p className="text-16-medium !text-black-300">
									@{post.author.username}
								</p>
							</div>
						</Link>

						<p className="category-tag">{post.category}</p>
					</div>

					<h3 className="text-30-bold">Pitch Details</h3>
					{parsedContent ? (
						<article
							className="prose max-w-4xl font-work-sans break-all"
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className="no-result">No details provided</p>
					)}
				</div>

				<hr className="divider" />

				{/* TODO: EDITOR SELECTED STARTUPS */}

				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
};

export default Page;

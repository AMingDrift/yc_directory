import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
	// createdAt: new Date(),
	// views: 55,
	// author: { _id: 1, name: 'Adrian' },
	// _id: 1,
	// description: 'This is a description.',
	// image:
	// 	'https://images.unsplash.com/photo-1634912314704-c646c586b131?9=808w=29408auto=format&fit=cropsixlib=rb4.0,38ixid=M3wxMiA3fDB8MHxwaG90bv1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	// category: 'Robots',
	// title: 'We Robots',
	const {
		createdAt,
		views,
		author: { _id: authorId, name },
		_id,
		description,
		image,
		category,
		title,
	} = post;
	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup_card_date">{formatDate(createdAt)}</p>
				<div className="flex gap-1.5">
					<EyeIcon className="size-6 text-primary" />
					<span className="text-16-medium">{views}</span>
				</div>
			</div>

			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${authorId}`}>
						<p className="text-16-medium line-clamp-1">{name}</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className="text-26-semibold line-clamp-1">{title}</h3>
					</Link>
				</div>
				<Link href={`/user/${authorId}`}>
					<Image
						src="https://placehold.co/48x48"
						alt={title}
						width={48}
						height={48}
						className="rounded-full"
					/>
				</Link>
			</div>

			<Link href={`/startup/${_id}`}>
				<p className="startup-card_desc">{description}</p>
				<img src={image} alt="placeholder" className="startup-card_img" />
			</Link>

			<div className="flex-between gap-3 mt-5">
				<Link href={`/?query=${category.toLowerCase()}`}>
					<p className="text-16-medium">{category}</p>
				</Link>
				<Button className="startup-card_btn" asChild>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export default StartupCard;

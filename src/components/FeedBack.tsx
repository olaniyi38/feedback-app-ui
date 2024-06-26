import { FaChevronUp, FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../store/user/userSelector";
import { TFeedBack , likeFeedback } from "../store/feedbacks/feedbacksSlice";
import { selectFeedbacks } from "../store/feedbacks/feedbackSelector";
import { useState } from "react";
import { AppDispatch } from "../store/store";
import { User } from "../store/user/userSlice";

const FeedBack = ({ data }: { data: TFeedBack }) => {
	const { title, description, upvotes, category, comments, id } = data;
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector(selectUser);
	const feedbacks = useSelector(selectFeedbacks);
	const [isDisabled, setIsDisabled] = useState(false);

	const likes = user ? user.likes : {};

	const isLiked = id in likes;

	async function likeAFeedback(id: string) {
		setIsDisabled(true);
		const feedbackId = id;
		const feedbackIndex = feedbacks.findIndex((f) => f.id === feedbackId);
		let newLikes: User["likes"] = { ...likes };
		let newFeedback: TFeedBack = {
			...feedbacks[feedbackIndex],
		};
		if (!isLiked) {
			newLikes[feedbackId] = {};
			newFeedback.upvotes++;
			await dispatch(likeFeedback({ newFeedback, newLikes, id }))
				.unwrap()
				.then(() => setIsDisabled(false));
			return;
		}
		newFeedback.upvotes--;
		delete newLikes[feedbackId];
		await dispatch(likeFeedback({ newFeedback, newLikes, id }))
			.unwrap()
			.then(() => setIsDisabled(false));

		setIsDisabled(false);
	}

	return (
		<div className=" bg-white relative flex flex-col gap-4 md:gap-x-8 md:flex-row rounded-lg p-6">
			<div className="space-y-4 md:order-2">
				<Link
					to={`/feedback/${id}`}
					className=" text-blue-950 hover:underline transition  font-bold ">
					{title}
				</Link>
				<p className=" text-slate-700 text-[0.9rem]  pr-4">{description}</p>
				<div className=" bg-blue-50 text-blue-600 font-semibold text-sm w-[fit-content] p-2 rounded-md capitalize">
					{category}
				</div>
			</div>
			<div className="flex justify-between md:order-1 font-semibold  ">
				<button
					disabled={isDisabled}
					onClick={() => likeAFeedback(id)}
					className={`flex self-start disabled:bg-slate-300 group disabled:text-slate-500 text-sm md:flex-col min-w-[2.5rem]  items-center gap-2 p-2 rounded-md ${
						isLiked
							? "bg-blue-600 text-white hover:bg-blue-700"
							: "bg-blue-50 text-blue-950 hover:bg-blue-200"
					}  transition-colors `}>
					<FaChevronUp
						className={`${
							isLiked ? "fill-white" : "fill-blue-600"
						} group-disabled:fill-slate-500`}
					/>
					{upvotes}
				</button>
				<span className="flex items-center md:absolute right-6 text-sm bottom-0 top-0 my-auto   gap-1">
					<FaComment className="w-5 h-5 fill-slate-300" />
					{comments ? comments.length : 0}
				</span>
			</div>
		</div>
	);
};

export default FeedBack;

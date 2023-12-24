import { useState } from "react";
import { useSelector } from "react-redux";
import FeedBacks from "../components/FeedBacks";
import Nav from "../components/Nav";
import { selectFeedbacks } from "../store/feedbacks/feedbackSelector";
import React from "react";
import { CATEGORIES } from "../components/AddFeedbackForm";

export default function Root() {
	const [filterBy, setFilterBy] = useState("all");
	const feedBacks = useSelector(selectFeedbacks);
	const filteredFeedbacks = feedBacks.filter((f) => {
		if (filterBy.toLowerCase() === "all") {
			return f;
		}
		return f.category.toLowerCase() === filterBy.toLowerCase();
	});

	function updateFilter(filter: string) {
		setFilterBy(filter);
	}

	return (
		<>
			<div className="max-w-[72rem]  lg:flex lg:pt-28 lg:gap-12 mx-auto md:px-8">
				<Nav updateFilter={updateFilter} currentFilter={filterBy} />
				<div className="flex-1">
					<FeedBacks data={filteredFeedbacks} />
				</div>
			</div>
		</>
	);
}

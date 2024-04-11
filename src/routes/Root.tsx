import { useState } from "react";
import { useSelector } from "react-redux";
import FeedBacks from "../components/FeedBacks";
import Nav from "../components/Nav";
import { selectFeedbacks } from "../store/feedbacks/feedbackSelector";

 

export default function Root() {
	const [filterBy, setFilterBy] = useState("all");
	const feedBacks = useSelector(selectFeedbacks);
	const [isMobileNavActive, setMobileNavActive] = useState(false);
	const filteredFeedbacks = feedBacks.filter((f) => {
		if (filterBy.toLowerCase() === "all") {
			return f;
		}
		return f.category.toLowerCase() === filterBy.toLowerCase();
	});

	function updateFilter(filter: string) {
		setFilterBy(filter);
	}

	function toggleMobileNav() {
		setMobileNavActive(!isMobileNavActive);
	}

	return (
		<>
			<div className="relative max-w-[72rem]  lg:flex lg:pt-28 lg:gap-12 mx-auto md:px-8">
				<div
					onClick={() => setMobileNavActive(false)}
					className={`dark-bg-mob-nav ${
						isMobileNavActive ? "active" : ""
					} fixed bg-black  z-[12] inset-0 md:hidden`}></div>

				<Nav
					updateFilter={updateFilter}
					currentFilter={filterBy}
					mobileNavToggleFunc={toggleMobileNav}
					mobileNavActive={isMobileNavActive}
				/>
				<div className="flex-1">
					<FeedBacks data={filteredFeedbacks} />
				</div>
			</div>
		</>
	);
}

import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	selectFeedbacks,
	selectStatus,
} from "../store/feedbacks/feedbackSelector";
import Button from "./Button";
import { logOutUser } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AppDispatch } from "../store/store";
import { CATEGORIES } from "./AddFeedbackForm";
import { ChangeEvent } from "react";
import { ROADMAPS } from "../routes/RoadMap";

type NavProps = {
	updateFilter: (c: CATEGORIES) => void;
	currentFilter: string;
	mobileNavToggleFunc: () => void;
	mobileNavActive: boolean;
};
const Nav = ({
	updateFilter,
	currentFilter,
	mobileNavToggleFunc,
	mobileNavActive,
}: NavProps) => {
	const feedbacks = useSelector(selectFeedbacks);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	async function logOut() {
		await dispatch(logOutUser())
			.unwrap()
			.then(() => {
				navigate("/auth/sign-in");
			});
	}

	const mobileNavClasses = `mobile-nav ${
		mobileNavActive ? "active" : ""
	} fixed right-0 h-full bg-blue-50 p-6 shadow-md md:shadow-none max-w-[80%] sm:max-w-[70%] md:max-w-none md:p-0 md:bg-none top-22 md:static`;

	return (
		<nav className="relative z-[20] lg:sticky top-0  h-full lg:w-60 md:flex md:gap-6 lg:flex-col justify-between lg:justify-normal lg:py-0 md:py-10 md:p-0  text-white">
			<div className="flex justify-between  md:rounded-lg px-6 py-4 lg:h-36 bg-gradient-to-br from-blue-500  via-purple-500 to-orange-500">
				<hgroup className="text-md  flex-1 capitalize mt-auto">
					<h1 className=" font-bold">frontend mentor</h1>
					<h3 className="text-sm">Feedback board</h3>
				</hgroup>
				<button
					onClick={mobileNavToggleFunc}
					className="md:hidden flex-none">
					<FaBars className="w-6 h-6" />
				</button>
			</div>
			<div
				className={`${mobileNavClasses} flex flex-col md:flex-row  lg:flex-col  gap-4 flex-1`}>
				<div className=" p-6 bg-white rounded-lg flex flex-wrap gap-y-3 gap-x-2 md:flex-1  lg:flex-none text-blue-950">
					{Object.values(CATEGORIES).map((c) => {
						const isActive = currentFilter.toLowerCase() === c.toLowerCase();
						return (
							<button
								key={c}
								onClick={() => {
									updateFilter(c);
									mobileNavToggleFunc();
								}}
								className={`${
									isActive && "bg-blue-600 text-white hover:bg-blue-700"
								} bg-blue-50 hover:bg-blue-200 transition-colors font-semibold px-4 py-1 text-sm rounded`}>
								{c}
							</button>
						);
					})}
				</div>
				<div className=" p-6  space-y-4 lg:space-y-6 bg-white rounded-lg md:block md:flex-1  lg:flex-none">
					<div className="flex justify-between">
						<h1 className="font-bold text-blue-950">Roadmap</h1>
						<Link
							to="/roadmap"
							className="font-medium text-blue-600 hover:underline transition-all ">
							view
						</Link>
					</div>
					<div className="text-slate-700 space-y-2 flex-none  capitalize">
						{Object.values(ROADMAPS).map((r, i) => {
							const count = feedbacks.filter((fb) => fb.status === r).length;
							return (
								<div
									key={r}
									className="flex items-center justify-between">
									<span
										className={`w-2 h-2 mr-4 flex-none bg-${r} rounded-full`}></span>
									<span className="flex-1 text-sm">{r}</span>
									<span className=" flex-none font-semibold">{count}</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* <div className="flex-none">
					<Button
						onClick={logOut}
						variant="red">
						Logout
					</Button>
				</div> */}
			</div>
		</nav>
	);
};

export default Nav;

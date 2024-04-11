import React from "react";
import { FaComment } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const FeedbacksSkeleton = () => {
	return (
		<div className="flex flex-col gap-4 p-4 pt-8 pb-16">
			<SkeletonTheme
				baseColor="#a0a0a0"
				highlightColor="#dddddd">
				{Array(4)
					.fill(1)
					.map((item, i) => {
						return (
							<div
								key={i}
								className=" bg-white relative flex flex-col gap-2 md:gap-x-8 md:flex-row rounded-lg p-6">
								<div className="space-y-1 md:order-2">
									<p className="md:w-[25rem]">
										<Skeleton />
									</p>
									<p>
										<Skeleton width={"50%"} />
									</p>
									<p>
										<Skeleton width={"20%"} />
									</p>
								</div>
								<div className="flex justify-between md:order-1 font-semibold  ">
									<button
										disabled
										className={`flex self-start`}>
										<Skeleton className="w-16 h-8 md:w-10 md:h-14" />
									</button>
								</div>
							</div>
						);
					})}
			</SkeletonTheme>
		</div>
	);
};

export default FeedbacksSkeleton;

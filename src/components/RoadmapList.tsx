import React from "react";
import RoadmapItem from "./RoadmapItem";
import { FeedBack } from "../store/feedbacks/feedbacksSlice";
import { ROADMAPS } from "../routes/RoadMap";

const subtitles = {
	planned: "Ideas prioritized for research",
	"in-progress": "Currently being developed",
	live: "Released features",
};

type RoadmapListProps = {
	roadmap: ROADMAPS;
	currentRoadmap: ROADMAPS;
	values: FeedBack[];

}

const RoadmapList = ({ roadmap, currentRoadmap, values }: RoadmapListProps) => {
	return (
		<>
			<div className={`${currentRoadmap !== roadmap && "hidden"} flex-1 md:block`}>
				<hgroup className="my-5 space-y-2">
					<h1 className="text-lg font-bold capitalize md:text-base">
						{roadmap}({values.length})
					</h1>
					<h5 className="text-xs md:text-sm text-slate-600">{subtitles[roadmap]}</h5>
				</hgroup>
				<div className="space-y-4 md:space-y-6 py-2">
					{values.map((v) => (
						<RoadmapItem data={v} />
					))}
				</div>
			</div>
		</>
	);
};

export default RoadmapList;

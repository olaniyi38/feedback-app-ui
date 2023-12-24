import React from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();

	function goBack() {
		navigate(-1);
	}
	return (
		<button
			onClick={goBack}
			className="flex gap-x-3 items-center font-semibold text-sm"
		>
			{children}
		</button>
	);
};

export default GoBackButton;

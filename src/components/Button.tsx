import React from "react";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { MouseEvent } from "react";
import { ButtonHTMLAttributes } from "react";
import { RootState } from "../store/store";
//bg-purple-800
//bg-blue-600
//bg-red-600

export enum BTN_VARS {
	purple = "bg-purple-700",
	blue = "bg-blue-600",
	red = "bg-red-600",
}

type ButtonProps = {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: keyof typeof BTN_VARS;
	full?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
	children,
	onClick,
	variant = "purple",
	full,
	...otherProps
}: ButtonProps) => {
	const status = useSelector((state: RootState) => state.currentUser.status);

	return (
		<button
			onClick={onClick}
			disabled={status === "pending"}
			className={`flex items-center ${
				full && "w-full"
			}  disabled:bg-gray-400 text-white font-bold capitalize gap-1 ${
				BTN_VARS[variant]
			} hover:bg-${variant}-700 active:scale-[.95] transition-all rounded-md py-2 px-4 max-[400px]:text-[0.8rem]  `}
			{...otherProps}>
			{children}
		</button>
	);
};

export default Button;

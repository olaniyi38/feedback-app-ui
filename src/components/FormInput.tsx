/* eslint-disable react/display-name */
import { useSelector } from "react-redux";
import { selectStatus } from "../store/feedbacks/feedbackSelector";
import { ReactNode } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
 
import { InputHTMLAttributes } from "react";
import { TextareaHTMLAttributes } from "react";
 

const FormInput = ({ children }: { children: ReactNode }) => {
	return <div className="flex flex-col gap-y-4">{children}</div>;
};

FormInput.Label = ({
	label,
	subLabel,
}: {
	label: string;
	subLabel?: string;
}) => {
	return (
		<label className="space-y-1">
			<p className="text-blue-950 text-sm font-bold capitalize">{label}</p>
			{subLabel && (
				<p className="text-xs text-slate-600 first-letter:capitalize">
					{subLabel}
				</p>
			)}
		</label>
	);
};

FormInput.Text = ({
	name,
	errors,
	register,
	...inputProps
}: {
	name: string;
	errors: FieldErrors;
	register?: UseFormRegister<FieldValues>;
} & InputHTMLAttributes<HTMLInputElement>) => {
	const pending = useSelector(selectStatus) === "pending";
	const errorStyle = errors[name.toLowerCase()]
		? "outline-red-500"
		: "focus:outline-blue-500";
	return (
		<>
			<input
				className={`bg-slate-200 disabled:bg-slate-200 disabled:text-slate-400 p-2 ${errorStyle} text-sm rounded-sm outline-none  outline-1 transition-all`}
				{...(register && register(name.toLowerCase(), { required: true }))}
				{...inputProps}
				disabled={pending}
			/>
		</>
	);
};

FormInput.Select = ({
	options,
	name,
	errors,
	register,
	...inputProps
}: {
	options: string[];
	name: string;
	errors?: FieldErrors;
	register?: UseFormRegister<FieldValues>;
} & InputHTMLAttributes<HTMLSelectElement>) => {
	const pending = useSelector(selectStatus) === "pending";
	return (
		<select
			className={` bg-slate-200 disabled:bg-slate-200 disabled:text-slate-400 p-2 text-sm rounded-sm outline-none focus:outline-blue-600 outline-1 transition-all`}
			{...(register && register(name.toLowerCase(), { required: true }))}
			{...inputProps}
			disabled={pending}>
			{Object.values(options).map((o, i) => (
				<option
					key={o + i}
					value={o}>
					{o}
				</option>
			))}
		</select>
	);
};

FormInput.TextArea = ({
	register,
	name,
}: {
	register?: UseFormRegister<FieldValues>;
	name: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
	const pending = useSelector(selectStatus) === "pending";
	return (
		<textarea
			id="detail"
			cols={30}
			rows={5}
			className={` bg-slate-200 disabled:bg-slate-200 disabled:text-slate-400 p-2 text-sm rounded-sm outline-none focus:outline-blue-600 outline-1 transition-all`}
			{...(register && register(name.toLowerCase()))}
			disabled={pending}></textarea>
	);
};

export default FormInput;

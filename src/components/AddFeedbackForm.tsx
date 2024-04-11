import { FieldValues, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ObjectId } from "bson";
import { useDispatch, useSelector } from "react-redux";
import { TFeedBack, createFeedback } from "../store/feedbacks/feedbacksSlice";
import { toast } from "react-toastify";
import { selectUser } from "../store/user/userSelector";
import { AppDispatch } from "../store/store";
import { selectStatus } from "../store/feedbacks/feedbackSelector";

export enum CATEGORIES {
	all = "all",
	ui = "ui",
	ux = "ux",
	enhancement = "enhancement",
	bug = "bug",
	feature = "feature",
}

const AddFeedbackForm = () => {
	const user = useSelector(selectUser);
	const { register, formState, handleSubmit } = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const pending = useSelector(selectStatus) === "pending";
	const errors = formState.errors;

	async function onSubmit(data: FieldValues) {
		if (!user) return;
		const feedback = {
			...data,
			id: new ObjectId().toString(),
			upvotes: 0,
			status: "suggestion",
			comments: [],
			by: user.username,
		} as unknown as TFeedBack;
		toast
			.promise(dispatch(createFeedback(feedback)).unwrap(), {
				success: "Feedback added",
				pending: "adding feedback",
			})
			.then(() => {
				navigate("/");
			});
	}

	return (
		<div className="space-y-8">
			<form className="space-y-5 ">
				<FormInput>
					<FormInput.Label
						label="Feedback Title"
						subLabel="Add a short and, desriptive headiline"
					/>
					<FormInput.Text
						register={register}
						name="title"
						errors={errors}
					/>
				</FormInput>

				<FormInput>
					<FormInput.Label
						label="category"
						subLabel="choose a category for your feedback"
					/>
					<FormInput.Select
						name="category"
						register={register}
						options={Object.values(CATEGORIES)}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label
						label="feedback detail"
						subLabel="include any specific comments on what should be improved, added, etc."
					/>
					<FormInput.TextArea
						name="description"
						register={register}
					/>
				</FormInput>
			</form>
			<div className="flex items-center justify-between sm:justify-end gap-x-4 px-4">
				<Button
					disabled={pending}
					onClick={() => navigate(-1)}
					variant="red">
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={pending}>
					Post feedback
				</Button>
			</div>
		</div>
	);
};

export default AddFeedbackForm;

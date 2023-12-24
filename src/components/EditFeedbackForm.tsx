/* eslint-disable react/prop-types */
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	FeedBack,
	deleteFeedback,
	editFeedback,
} from "../store/feedbacks/feedbacksSlice";
import { toast } from "react-toastify";
import { selectFeedbacks } from "../store/feedbacks/feedbackSelector";
import { useState } from "react";
import { selectUser } from "../store/user/userSelector";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { AppDispatch } from "../store/store";
import { CATEGORIES } from "./AddFeedbackForm";


const EditFeedbackForm = ({ id }: { id: string }) => {
	const feedbacks = useSelector(selectFeedbacks);
	const user = useSelector(selectUser)
	const [deleteActive, setDeleteActive] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();


	const feedback = feedbacks.find((fb) => fb.id === id);

	useEffect(() => {
		if (feedback && user && (feedback.by !== user.username)) {
			navigate(-1)
		}
	}, [feedback?.by, navigate, user?.username])

	async function onSubmit(data: FieldValues) {
		const newFeedback: FeedBack = {
			...feedback,
			...data,
		} as FeedBack

		await toast
			.promise(dispatch(editFeedback(newFeedback)).unwrap(), {
				success: "Feedback updated",
				error: "something went wrong",
				pending: "updating feedback",
			})
			.then(() => {
				navigate(-1);
			});
	}


	async function removeFeedback() {
		await toast
			.promise(dispatch(deleteFeedback(id)).unwrap(), {
				success: "feedback deleted",
				error: "error deleting feedback",
				pending: "deleting feedback",
			})
			.then(() => {
				navigate("/");
			});
	}


	if (!feedback) {
		return <Navigate to={"/"} />
	}

	const { title, category, status, description } = feedback;

	const { register, formState, handleSubmit } = useForm<FieldValues>({
		defaultValues: { title, category, status, description },
	});

	const errors = formState.errors;


	return (
		<div className="space-y-8">
			<form className="space-y-5 ">
				<FormInput>
					<FormInput.Label
						label="Feedback Title"
						subLabel="Add a short and, desriptive headiline"
					/>
					<FormInput.Text register={register} name="title" errors={errors} />
				</FormInput>

				<FormInput>
					<FormInput.Label
						label="category"
						subLabel="choose a category for your feedback"
					/>
					<FormInput.Select
						name="category"
						register={register}
						options={Object.values(CATEGORIES).map((c) => c)}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label
						label="update status"
						subLabel="Change feature status"
					/>
					<FormInput.Select
						register={register}
						name="status"
						errors={errors}
						options={["in-progress", "live", "planned", "suggestion"]}
					/>
				</FormInput>
				<FormInput>
					<FormInput.Label
						label="feedback detail"
						subLabel="include any specific comments on what should be improved, added, etc."
					/>
					<FormInput.TextArea name="description" register={register} />
				</FormInput>
			</form>
			<div className="flex items-center justify-between px-4">
				{deleteActive ? (
					<>
						<p className="font-medium text-red-400">Confirm delete:</p>
						<div className="flex items-center gap-x-4 ">
							<Button variant="blue" onClick={() => setDeleteActive(false)}>
								Cancel
							</Button>
							<Button variant="red" onClick={removeFeedback}>
								Delete
							</Button>
						</div>
					</>
				) : (
					<>
						<Button variant="red" onClick={() => setDeleteActive(true)}>
							{" "}
							Delete
						</Button>
						<div className="flex items-center gap-x-4 ">
							<Button onClick={() => navigate(-1)}>Cancel</Button>
							<Button variant="blue" onClick={handleSubmit(onSubmit)}>
								Save changes
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default EditFeedbackForm;

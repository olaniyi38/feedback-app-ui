import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { fetchFeedbacks } from "../features/feedbacks/feedbacksSlice";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AuthForm = ({ type }) => {
	const { handleSubmit, register, formState, reset } = useForm();
	const errors = formState.errors;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		reset({
			username: '',
			password: '',
			confirm_password: '',
			name: ''
		})
	}, [type])

	async function signUp(data) {
		if (data.password !== data.confirm_password) {
			toast.error("Passwords don't match");
			return;
		}
		try {
			await dispatch(signUpUser(data)).unwrap()
			navigate("/");

			try {
				await dispatch(fetchFeedbacks()).unwrap();
			} catch (error) {
				toast.error("error fetching feedbacks")
			}
		} catch (error) {
			toast.error("user already exists")
			console.log(error)
		}

	}

	async function signIn(data) {
		try {
			await dispatch(signInUser(data)).unwrap()
			try {
					navigate("/");
				await dispatch(fetchFeedbacks()).unwrap();
			} catch (error) {
				toast.error("error fetching feedbacks")
			}
		} catch (error) {
			toast.error("username or password is incorrect")
			console.log("err")
			console.log(error)
		}
	}

	async function submitHandler(data) {
		{
			type === "sign-up" ? signUp(data) : signIn(data);
		}
	}

	return (
		<div key={type}>
			<h1 className="text-slate-700 text-xl first-letter:capitalize mb-8 font-black">
				{type}
			</h1>
			<form x onSubmit={handleSubmit(submitHandler)} className="space-y-4">
				{type === "sign-up" && (
					<FormInput>
						<FormInput.Label label="Name" />
						<FormInput.Text name="name" register={register} errors={errors} />
					</FormInput>
				)}
				<FormInput>
					<FormInput.Label label="username" />
					<FormInput.Text name="username" register={register} errors={errors} />
				</FormInput>
				<FormInput>
					<FormInput.Label label="Password" />
					<FormInput.Text
						type="password"
						name="password"
						register={register}
						errors={errors}
					/>
				</FormInput>
				{type === "sign-up" && (
					<FormInput>
						<FormInput.Label label="Confirm Password" />
						<FormInput.Text
							type="password"
							name="confirm_password"
							register={register}
							errors={errors}
						/>
					</FormInput>
				)}

				<Button variant="blue" full>
					<span className="flex-1 text-base">{type}</span>
				</Button>
				{type === "sign-in" ? (
					<p className=" mt-4">
						not a user?{" "}
						<Link className=" text-blue-600  ml-1" to="/auth/sign-up">
							sign-up
						</Link>
					</p>
				) : (
					<p className=" mt-4">
						already a user?{" "}
						<Link className=" text-blue-600 ml-1" to="/auth/sign-in">
							sign-in
						</Link>
					</p>
				)}
			</form>
		</div>
	);
};

export default AuthForm;

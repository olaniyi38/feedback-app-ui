import { RouterProvider } from "react-router-dom";
import FeedBackPage from "./routes/FeedBackPage";
import RoadMap from "./routes/RoadMap";
import CreateFeedback from "./routes/CreateFeedback";
import { fetchFeedbacks } from "./store/feedbacks/feedbacksSlice";
import { useDispatch } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditFeedback from "./routes/EditFeedback";
import Auth from "./routes/Auth";
import AuthForm from "./components/AuthForm";
import Protected from "./routes/Protected";
import { fetchUser } from "./store/user/userSlice";
import React from "react";
import { AppDispatch } from "./store/store";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Protected>
				<Root />
			</Protected>
		),
	},
	{
		path: "/auth/",
		element: <Auth />,
		children: [
			{
				path: "sign-up",
				element: <AuthForm type="sign-up" />,
			},
			{ path: "sign-in", element: <AuthForm type="sign-in" /> },
		],
	},
	{
		path: "/feedback/:id",
		element: (
			<Protected>
				<FeedBackPage />
			</Protected>
		),
	},
	{
		path: "/roadmap",
		element: (
			<Protected>
				<RoadMap />
			</Protected>
		),
	},
	{
		path: "/create-feedback",
		element: (
			<Protected>
				<CreateFeedback />
			</Protected>
		),
	},
	{
		path: "/edit-feedback/:id",
		element: (
			<Protected>
				<EditFeedback />
			</Protected>
		),
	},
]);

const App = () => {
	const dispatch = useDispatch<AppDispatch>();


	useEffect(() => {
		async function init() {
			await dispatch(fetchUser()).unwrap()
				.then(async () => {
					await dispatch(fetchFeedbacks()).unwrap()
				}).catch((error: Error) => {
					console.log(error)
				})
		}
		init();
	}, []);

	return (
		<main className="bg-blue-50 min-h-[100vh]">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				theme="dark"
			/>
			<RouterProvider router={router} />
		</main>
	);
};

export default App;

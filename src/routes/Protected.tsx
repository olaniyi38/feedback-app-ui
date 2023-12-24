import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelector";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const Protected = ({ children }: { children: ReactNode }) => {
	const user = useSelector(selectUser);
	if (user === null) {
		return <Navigate to="/auth/sign-in" />;
	}
	return <>{children}</>;
};

export default Protected;

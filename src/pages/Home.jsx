import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

const Home = () => {
	return (
		<>
			<MainLayout>
				<div className="container mt-3 text-center">
					<div className="bg-light p-5 mt-4 rounded-3">
						<h1>Welcome to my simple POSTPAGE business !</h1>
						<p>Feel free to contact Wendel's Shop </p>
						<p>
							If you have any concern please call 443-4545-222 anytime anywhere
						</p>

						<Link to="/PostPage" className="btn btn-primary">
							{" "}
							click here to buy product !
						</Link>
					</div>
				</div>
			</MainLayout>
		</>
	);
};

export default Home;

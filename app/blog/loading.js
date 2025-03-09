import React from "react";

const loading = () => {
	return (
		<div className="text-center text-gray-300">
			<div className="spinner-border animate-spin" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default loading;

import { Suspense } from "react";
import ContactPage from "./ContactPage";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ContactPage />
		</Suspense>
	);
}

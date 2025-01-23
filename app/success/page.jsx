import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
			<div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-sm bg-opacity-80 border border-gray-700 text-center">
				<h1 className="text-4xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0283C0] to-[#03a9f4]">
					Congratulations!
				</h1>
				<p className="text-white mb-8">
					Thank you for signing up. We will contact you shortly to
					discuss your fitness journey.
				</p>
				<Link href="/">
					<Button className="bg-gradient-to-r from-[#0283C0] to-[#03a9f4] text-white hover:from-[#026a9c] hover:to-[#0283C0] transition-all duration-300">
						Return to Home
					</Button>
				</Link>
			</div>
		</div>
	);
}

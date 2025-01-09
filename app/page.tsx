import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	Dumbbell,
	Bike,
	LucideProps,
} from "lucide-react";
import {
	ForwardRefExoticComponent,
	JSXElementConstructor,
	Key,
	ReactElement,
	ReactNode,
	ReactPortal,
	RefAttributes,
} from "react";

type InstructorCardProps = {
	name: string;
	location: string;
	image: string;
};

type PricingCardProps = {
	title: string;
	price: string;
	description: string;
	features: string[];
	icon: ReactNode;
};

export default function Home() {
	return (
		<div className="bg-black text-white">
			{/* Hero Section */}
			<section className="relative min-h-screen pt-24">
				<Image
					src="/deadlift.jpg"
					alt="Deadlift Exercise"
					fill
					className="object-cover brightness-50"
					priority
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-24">
					<p className="text-sm tracking-wider mb-4">
						THE MIND IS PRIMARY
					</p>
					<h1 className="text-6xl font-bold mb-4">MO MUSCLES</h1>
					<p className="text-xl mb-8">
						WELCOME TO THE OFFICIAL SITE OF MO MUSCLES
					</p>
					<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white px-8">
						TRAIN WITH US
					</Button>
				</div>
			</section>

			{/* Train With Gym Mo Section */}
			<section className="py-24 text-center bg-white text-black">
				<div className="container mx-auto px-4">
					<p className="text-sm tracking-wider mb-8 text-gray-600">
						FIND THE PROBLEM, FIX THE PROBLEM
					</p>
					<h2 className="text-4xl font-bold mb-8">TRAIN WITH MO</h2>
					<p className="max-w-3xl mx-auto text-gray-700 mb-12">
						At MoMuscle, we believe in a personalized approach to
						fitness. Our trainers guide you through each step,
						ensuring you achieve your physical goals effectively.
					</p>
					<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white">
						TRAIN WITH US
					</Button>
				</div>
			</section>

			{/* Seminar Section */}
			<section className="py-24 bg-black text-white">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 container mx-auto px-4">
					<div className="relative aspect-square">
						<Image
							src="/A94BAB7E-EBBF-4614-867C-2AF564B4C6D2.JPG"
							alt="Mo Muscle Team"
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex flex-col justify-center">
						<p className="text-sm tracking-wider mb-4">
							LEARN WITH US
						</p>
						<h2 className="text-4xl font-bold mb-6">
							MO MUSCLE TRAINING SERIES
						</h2>
						<p className="text-gray-400 mb-8">
							Our trainers are dedicated professional who
							specialize in transforming your fitness journey.
							With personalized training plans and unwavering
							support, they help you achieve your goals.
						</p>
						<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white self-start">
							LEARN MORE
						</Button>
					</div>
				</div>
			</section>

			{/* Our Company Section */}
			<section className="py-24 text-center bg-white text-black">
				<div className="container mx-auto px-4">
					<p className="text-sm tracking-wider mb-8 text-gray-600">
						THE FIRST RULE OF ANY PHYSICAL TRAINING
					</p>
					<h2 className="text-4xl font-bold mb-8">THE FORM</h2>
					<p className="max-w-3xl mx-auto text-gray-700 mb-12">
						Mo Muscle is a collective of insanely dedicated and hard
						working people interested in self improvement and elite
						physical and mental performance. We don't like talking
						about ourselves, but we'll do our best.
					</p>
					<Button className="bg-[#0283C0] hover:bg-[#026a9c] text-white">
						LEARN MORE
					</Button>
				</div>
			</section>

			{/* Certified Instructors Section */}
			<section className="py-24 text-center bg-black">
				<div className="container mx-auto px-4">
					<p className="text-sm tracking-wider mb-4">FIND A COACH</p>
					<h2 className="text-4xl font-bold mb-8">
						CERTIFIED INSTRUCTORS
					</h2>
					<p className="max-w-3xl mx-auto text-gray-400 mb-12">
						Our Certified instructors have passed through our
						rigorous process of physical and mental testing to
						represent Gym Jones wherever they coach. They embrace
						traditional ideas, and continue to create and implement
						new ones. They are experienced, creative, inquisitive
						and experts in their fields. Meet a certified instructor
						in your area.
					</p>

					<div className="relative">
						<div className="flex overflow-x-auto gap-6 pb-6 justify-center">
							{/* Instructor Cards */}
							<InstructorCard
								name="MO NAYAL"
								location="COLUMBUS OHIO"
								image="/placeholder.svg?height=400&width=400"
							/>
							<InstructorCard
								name="THE OTHER LADY"
								location="COLUMBUS OHIO"
								image="/placeholder.svg?height=400&width=400"
							/>
						</div>

						<button className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
							<ChevronLeft className="w-6 h-6" />
						</button>
						<button className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
							<ChevronRight className="w-6 h-6" />
						</button>
					</div>

					<Button className="mt-12 bg-[#0283C0] hover:bg-[#026a9c] text-white">
						SEE ALL INSTRUCTORS
					</Button>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-24 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<p className="text-[#DB4D4D] text-sm tracking-wider mb-4">
							PRICING PLAN
						</p>
						<h2 className="text-4xl font-bold text-black">
							Our Pricing Plan
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						<PricingCard
							title="Basic Membership"
							price="19"
							description="This category typically offers access to the gym's facilities and equipment."
							features={[
								"12 trainings",
								"Free shower & lockers",
								"Personal yoga mat",
								"Free parking",
							]}
							icon={<Dumbbell className="w-6 h-6" />}
						/>
						<PricingCard
							title="Standard Membership"
							price="39"
							description="This category typically offers access to the gym's facilities and equipment."
							features={[
								"12 trainings",
								"Free shower & lockers",
								"Personal yoga mat",
								"Free parking",
							]}
							icon={<Bike className="w-6 h-6" />}
						/>
						<PricingCard
							title="Ultimate Membership"
							price="69"
							description="This category typically offers access to the gym's facilities and equipment."
							features={[
								"12 trainings",
								"Free shower & lockers",
								"Personal yoga mat",
								"Free parking",
							]}
							icon={<Dumbbell className="w-6 h-6" />}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

function InstructorCard({ name, location, image }: InstructorCardProps) {
	return (
		<div className="min-w-[300px] group cursor-pointer">
			<div className="relative aspect-square mb-4">
				<Image
					src={image}
					alt={name}
					fill
					className="object-cover transition-opacity group-hover:opacity-75"
				/>
			</div>
			<h3 className="font-bold text-lg">{name}</h3>
			<p className="text-gray-400">{location}</p>
		</div>
	);
}

function PricingCard({
	title,
	price,
	description,
	features,
	icon,
}: PricingCardProps) {
	return (
		<div
			className={`border border-gray-200 rounded-lg p-6 shadow-md bg-[#0283C0] text-white`}
		>
			<div className="flex items-center mb-4">
				{icon}
				<h3 className="font-bold text-lg ml-4">{title}</h3>
			</div>
			<p className="text-3xl font-bold mb-4">${price}/month</p>
			<p className="text-white mb-4">{description}</p>
			<ul className="list-disc list-inside">
				{features.map(
					(
						feature:
							| string
							| number
							| bigint
							| boolean
							| ReactElement<
									unknown,
									string | JSXElementConstructor<any>
							  >
							| Iterable<ReactNode>
							| ReactPortal
							| Promise<
									| string
									| number
									| bigint
									| boolean
									| ReactPortal
									| ReactElement<
											unknown,
											string | JSXElementConstructor<any>
									  >
									| Iterable<ReactNode>
									| null
									| undefined
							  >
							| null
							| undefined,
						index: Key | null | undefined
					) => (
						<li key={index}>{feature}</li>
					)
				)}
			</ul>
			<Button className="mt-4 bg-white text-[#0283C0]">SIGN UP</Button>
		</div>
	);
}

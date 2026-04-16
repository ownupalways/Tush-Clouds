import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface TabButtonProps {
	active: boolean;
	onClick: () => void;
	icon: IconDefinition;
	label: string;
	count: number;
}

export const TabButton = ({
	active,
	onClick,
	icon,
	label,
	count,
}: TabButtonProps) => {
	const activeClass = active
		? "bg-white dark:bg-gray-700 text-brand-green-200 shadow-sm ring-1 ring-black/5"
		: "text-text-secondary hover:text-text-primary hover:bg-gray-800";

	return (
		<button
			onClick={onClick}
			className={`w-full md:w-auto flex items-center justify-center cursor-pointer gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${activeClass}`}>
			<FontAwesomeIcon
				icon={icon}
				className={
					active
						? "text-brand-lemon"
						: "opacity-50"
				}
			/>
			<span>{label}</span>
			<span className="text-xs opacity-60">
				({count})
			</span>
		</button>
	);
};

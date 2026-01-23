"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const frontendSkills = [
    { name: "HTML", level: "Experienced" },
    { name: "CSS", level: "Intermediate" },
    { name: "JavaScript", level: "Intermediate" },
    { name: "React", level: "Associate" },
    { name: "Next.js", level: "Intermediate" },
    { name: "Tailwind CSS", level: "Experienced" },
];

const backendSkills = [
    { name: "Node.js", level: "Intermediate" },
    { name: "MySQL", level: "Associate" },
    { name: "MongoDB", level: "Associate" },
    { name: "Express.js", level: "Intermediate" },
];

const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
        case "experienced":
            return "text-brand-green";
        case "intermediate":
            return "text-blue-600";
        case "associate":
            return "text-yellow-600";
        default:
            return "text-gray-600";
    }
};

export default function Experience() {
    return (
        <section id="experience" className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="text-center mb-12 md:mb-16">
                    <h5 className="text-base md:text-lg text-gray-600 mb-2 font-medium">
                        What Skills I Have
                    </h5>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green">
                        My Experience
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Frontend Development */}
                    <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-brand-green/20 transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-center text-brand-green mb-6 md:mb-8">
                            Frontend Development
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {frontendSkills.map((skill, index) => (
                                <div
                                    key={skill.name}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        className="text-brand-green text-xl mt-1 group-hover:scale-110 transition-transform duration-200"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                                            {skill.name}
                                        </h4>
                                        <small
                                            className={`text-sm font-medium ${getLevelColor(
                                                skill.level
                                            )}`}>
                                            {skill.level}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Backend Development */}
                    <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-brand-green/20 transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-center text-brand-green mb-6 md:mb-8">
                            Backend Development
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {backendSkills.map((skill, index) => (
                                <div
                                    key={skill.name}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        className="text-brand-green text-xl mt-1 group-hover:scale-110 transition-transform duration-200"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                                            {skill.name}
                                        </h4>
                                        <small
                                            className={`text-sm font-medium ${getLevelColor(
                                                skill.level
                                            )}`}>
                                            {skill.level}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-brand-green"></span>
                        <span className="text-gray-600">Experienced</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                        <span className="text-gray-600">Intermediate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                        <span className="text-gray-600">Associate</span>
                    </div>
                </div>
            </div>
        </section>
    );
}




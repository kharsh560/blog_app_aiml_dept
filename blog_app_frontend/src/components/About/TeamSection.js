import React from "react";
import { Code, Palette } from "lucide-react";
import satyaProfilePic from "../../assets/SatyaPrakash_ProfilePic.jpeg";
import khProfilePic from "../../assets/KH_dp.PNG"

const teamData = [
  {
    name: "Satya Prakash",
    role: "Frontend Developer",
    description:
      "Creative lead behind the blog's visual design and user experience",
    image: satyaProfilePic,
    icon: Palette,
  },
  {
    name: "Kumar Harsh",
    role: "Backend Developer",
    description:
      "Strategist & Analyst behind blog's architecture and functionality",
    image: khProfilePic,
    icon: Code,
  },
];

const TeamSection = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet The Developers
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamData.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <div className="flex items-center text-blue-600 mb-2">
                    <member.icon size={16} className="mr-2" />
                    <span>{member.role}</span>
                  </div>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

import React from "react";
import { Target, Lightbulb } from "lucide-react";

const MissionVision = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-blue-50 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Target className="text-blue-600 mr-3" size={32} />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <ul className="text-gray-700 leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>M1.</strong> To promote diversification by adopting
                advancement in science, technology, management, and allied
                disciplines through continuous learning.
              </li>
              <li>
                <strong>M2.</strong> To foster <strong>moral values</strong> in
                students and equip them for developing sustainable solutions to
                serve both national and global needs in society and industry.
              </li>
              <li>
                <strong>M3.</strong> To{" "}
                <strong>digitize educational resources and processes</strong>{" "}
                for enhanced teaching and effective learning.
              </li>
              <li>
                <strong>M4.</strong> To cultivate an{" "}
                <strong>environment</strong> supporting
                <strong>
                  {" "}
                  incubation, product development, technology transfer, capacity
                  building, and entrepreneurship
                </strong>
                .
              </li>
              <li>
                <strong>M5.</strong> To encourage{" "}
                <strong>faculty-student networking</strong> with alumni,
                industry, institutions, and other <strong>stakeholders</strong>{" "}
                for collective engagement.
              </li>
            </ul>
          </div>

          {/* Vision Section */}
          <div className="bg-blue-50 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Lightbulb className="text-blue-600 mr-3" size={32} />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To attain global excellence through education, innovation, research, and work ethics with the commitment to serve humanity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;

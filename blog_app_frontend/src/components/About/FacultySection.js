import React from "react";

const facultyData = [
  {
    name: "Dr. Neeraj Garg",
    title: "Head of Department (HOD)",
    image: "https://media.licdn.com/dms/image/v2/D5603AQECnZHMHgX-rQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729488955073?e=2147483647&v=beta&t=vfd7mJxnlABnD6Wk_nQiV_Z-xUUWxkyM1uPYSpwAsGU", // Replace with HOD's image URL
  },
  {
    name: "Dr. Tripti Lamba",
    title: "Associate Professor -AI & ML Department  ",
    image: "https://cse.mait.ac.in/images/Tripti_Lamba.jpg", 
  },
  // {
  //   name: "Dr. Gunjan Chugh",
  //   title: "Assistant Professor- AI &ML Department  ",
  //   image: "https://cse.mait.ac.in/images/Gunjan_Chugh.jpg", 
  // },
  {
    name: "Dr. Neelam Sharma",
    title: "Assistant Professor- AI &ML Department ",
    image: "https://cse.mait.ac.in/images/Neelam-Sharma.jpg", 
  },
];

const FacultySection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Core Faculties (AI&ML Dept.)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyData.map((faculty, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{faculty.name}</h3>
              <p className="text-blue-600 mb-2 text-center">{faculty.title}</p>
              {/* <p className="text-gray-600 text-center">{faculty.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultySection;

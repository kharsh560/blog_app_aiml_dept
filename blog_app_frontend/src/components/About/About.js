import MissionVision from "./MissionVision"
import CollegeInfo from "./CollegeInfo"
import FacultySection from "./FacultySection"
import TeamSection from "./TeamSection"
import AboutHeader from "./AboutHeader"
import Footer from "./Footer"
const About = ()=>{
  return (
    <div className=" overflow-x-hidden">
      <AboutHeader/>
      <MissionVision />
      <CollegeInfo />
      <FacultySection />
      <TeamSection />
    </div>
  )
}

export default About;
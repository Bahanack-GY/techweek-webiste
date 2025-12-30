import Hero from '../components/Hero';
import Sponsors from '../components/Sponsors';
import About from '../components/About';
import Activities from '../components/Activities';
import ParticipatingSchools from '../components/ParticipatingSchools';
import NationalInstitutions from '../components/NationalInstitutions';
import Speakers from '../components/Speakers';
import Schedule from '../components/Schedule';
import CallForParticipation from '../components/CallForParticipation';

function Home() {
    return (
        <>
            <Hero />
            <Sponsors />
            <About />
            <Activities />
            <ParticipatingSchools />
            <NationalInstitutions />
            <Speakers />
            <Schedule />
            <CallForParticipation />
        </>
    );
}
export default Home;
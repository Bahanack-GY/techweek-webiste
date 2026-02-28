import Header from '../components/Header';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import Countdown from '../components/Countdown';
import Vision from '../components/Vision';
import Schools from '../components/Schools';
import Activities from '../components/Activities';
import CompanyTicker from '../components/CompanyTicker';
import Schedule from '../components/Schedule';
import Footer from '../components/Footer';

function Home() {
    return (
        <main className="min-h-screen bg-slate-50 selection:bg-[--color-primary] selection:text-white">
            <Header />
            <Hero />
            <Ticker />
            <Countdown />
            <Vision />
            <Schools />
            <Activities />
            <CompanyTicker />
            <Schedule />
            <Footer />
        </main>
    );
}
export default Home;
import { Banner } from "../components/Banner";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact"

const HomePage = () => {
    return (
        <div className="App">
          <Banner />
          <Projects />
          <Contact />
        </div>
      );
};

export default HomePage;

import ListServices from "../components/ListServices";
import serviceBanner from "../assets/img/service-listing-banner.png"

const ServiceBanner = () => {
    return (
        <header>
            <div className="service-header-text">
                <div className="service-header-image">
                    <img src={serviceBanner} alt="Freedom Blog" />
                </div>
                <div class="service-text-on-image">
                    <h3> Explore Our Comprehensive Service Solutions </h3>
                    <p> Discover a wide range of expertly crafted services, from cutting-edge IT solutions to innovative architecture designs. Whether you're seeking tailored technology services or unique architectural planning, our team is here to bring your vision to life. Explore our offerings below. </p>
                </div>
            </div>
        </header>
    )
}

const ServiceListing = () => {
    return (
        <div className="App">
            <ServiceBanner />
            <ListServices />
        </div>
    );
};

export default ServiceListing;

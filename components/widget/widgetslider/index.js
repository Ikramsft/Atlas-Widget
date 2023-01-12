/* eslint-disable react/no-array-index-key */
// import data from 'data/iconCards';
import GlideComponent from 'components/carousel/GlideComponent';
import { Card, CardBody } from 'reactstrap';
import WidgetReviewCard from '../../widgetreviewcard';

const data = [
  {
    id: 1,
    avatar: 'https://via.placeholder.com/150',
    name: 'Simone Ispahani',
    date: '6 October, 2022',
    rating: 5,
    review: "I am so glad i called bay Electric regarding an inspection of my condo.",
    platform: "/static/assets/images/google_small.svg",
    postedOn: "googlemaps"
  },

  {
    id: 2,
    avatar: 'https://via.placeholder.com/150',
    name: 'Jenna H.',
    date: '6 October, 2022',
    rating: 5,
    review: "The Sociosquares team has been important in helping start my business.",
    platform: "/static/assets/images/google_small.svg",
    postedOn: "googlemaps"
  },
  {
    id: 3,
    avatar: 'https://via.placeholder.com/150',
    name: 'Nieves Z.',
    date: '6 October, 2022',
    rating: 5,
    review: "Thank you so much for your quick response.",
    platform: "/static/assets/images/google_small.svg",
    postedOn: "googlemaps"
  },
  {
    id: 4,
    avatar: 'https://via.placeholder.com/150',
    name: 'Paul L.',
    date: '6 October, 2022',
    rating: 5,
    review: "I had an issue with my electrical sockets in one of my rooms.",
    platform: "/static/assets/images/google_small.svg",
    postedOn: "googlemaps"
  },
];

const WidgetSlider = ({ className = 'widget-slider' }) => {
  return (
    <Card >
      <CardBody className="">

        <div className={className}>
          <GlideComponent
            settings={{
              gap: 5,
              perView: 1,
              type: 'carousel',
              breakpoints: {
                320: { perView: 1 },
                576: { perView: 2 },
                1600: { perView: 3 },
                1800: { perView: 4 },
              },
              hideNav: true,
            }}
          >
            {data.map((item, index) => {
              return (
                <div key={`icon_card_${item.id}`}>
                  <WidgetReviewCard {...item} className="mb-4" />
                </div>
              );
            })}
          </GlideComponent>
        </div>
      </CardBody>
    </Card>
  );
};
export default WidgetSlider;

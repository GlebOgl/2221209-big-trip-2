import { createElement } from '../render.js';
import {changeDateFormat, getDuration} from '../util.js';
import {DateFormat} from '../const.js';

const createEventsTemplate = (point, destinations, offersByType) => {
  const pointDestanation = destinations.find((dest) => dest.id === point.destination);
  const pointTypeOffers = offersByType.find((off) => off.type === point.type).offers;
  const pointOffers = pointTypeOffers.filter((offer) => point.offers.includes(offer.id));
  if (!pointDestanation){
    return ('<li class="trip-events__item"></li>');
  }
  return (
    `
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${changeDateFormat(point.dateFrom, DateFormat.SERVICE_DAY)}">${changeDateFormat(point.dateFrom, DateFormat.DAY)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${pointDestanation.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${changeDateFormat(point.dateFrom, DateFormat.SERVICE)}">${changeDateFormat(point.dateFrom, DateFormat.VIEW)}</time>
        &mdash;
        <time class="event__end-time" datetime="${changeDateFormat(point.dateTo, DateFormat.SERVICE)}">${changeDateFormat(point.dateTo, DateFormat.VIEW)}</time>
      </p>
      <p class="event__duration">${getDuration(point.dateFrom, point.dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${pointOffers.map((offer) =>
      `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
    ).join('')}

    </ul>
    <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};

class NewEventView {
  #element = null;
  #point = null;
  #destinations = [];
  #offers = [];

  constructor(point, destinations, offersByType) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offersByType;
  }

  get template() {
    return createEventsTemplate(this.#point, this.#destinations, this.#offers);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export { NewEventView };


export class Event {
  eventId: number;
  eventName: string;
  posterImage: string;
  bannerImage: string;
  organizerName: string;
  tech: string;
  dateTime: string;
  noOfRegistration: number;
  aboutContest: string;
  rulesToFollow: string;
  rewards: string;
  aboutQrganizer: string;
  rating: number;
  contactDetails: string;
  founder: string;
  companySize: string;
  industryType: string;

  constructor(
    eventId: number,
    eventName: string,
    posterImage: string,
    bannerImage: string,
    organizerName: string,
    tech: string,
    dateTime: string,
    noOfRegistration: number,
    aboutContest: string,
    rulesToFollow: string,
    rewards: string,
    aboutQrganizer: string,
    rating: number,
    contactDetails: string,
    founder: string,
    companySize: string,
    industryType: string
  ) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.posterImage = posterImage;
    this.bannerImage = bannerImage;
    this.organizerName = organizerName;
    this.tech = tech;
    this.dateTime = dateTime;
    this.noOfRegistration = noOfRegistration;
    this.aboutContest = aboutContest;
    this.rulesToFollow = rulesToFollow;
    this.rewards = rewards;
    this.aboutQrganizer = aboutQrganizer;
    this.rating = rating;
    this.contactDetails = contactDetails;
    this.founder = founder;
    this.companySize = companySize;
    this.industryType = industryType;
  }
}

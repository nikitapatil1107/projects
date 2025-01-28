import { JobDetailInfoModel } from '../job-detail-info-model';

export class Company {
  constructor(
    compId?: number,
    compName?: string,
    compDesc?: string,
    tag1?: string,
    tag2?: string,
    tag3?: string,
    tag4?: string,
    compVideoUrl?: string,
    compTagLine?: string,
    compWebsiteUrl?: string,
    foundedAt?: string,
    compType?: string,
    compHeadquaters?: string,
    compRating?: number,
    noOfFollower?: string,
    compBannerImg?: string,
    compPosterImg?: string,
    compEmail?: string,
    compPassword?: string,
    compContactName?: string,
    compContactNo?: string,
    isCompanyActive?: boolean,
    jobs?: JobDetailInfoModel[]
  ) {
    this.compId = compId ?? 0;
    this.compName = compName ?? '';
    this.compDesc = compDesc ?? '';
    this.tag1 = tag1 ?? '';
    this.tag2 = tag2 ?? '';
    this.tag3 = tag3 ?? '';
    this.tag4 = tag4 ?? '';
    this.compVideoUrl = compVideoUrl ?? '';
    this.compTagLine = compTagLine ?? '';
    this.compWebsiteUrl = compWebsiteUrl ?? '';
    this.foundedAt = foundedAt ?? '';
    this.compType = compType ?? '';
    this.compHeadquaters = compHeadquaters ?? '';
    this.compRating = compRating ?? 0;
    this.noOfFollower = noOfFollower ?? '';
    this.compBannerImg = compBannerImg ?? '';
    this.compPosterImg = compPosterImg ?? '';
    this.compEmail = compEmail ?? '';
    this.compPassword = compPassword ?? '';
    this.compContactName = compContactName ?? '';
    this.compContactNo = compContactNo ?? '';
    isCompanyActive = isCompanyActive ?? false;
    this.jobs = jobs ?? [];
  }

  compId: number;
  compName: string;
  compDesc: string;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  compVideoUrl: string;
  compTagLine: string;
  compWebsiteUrl: string;
  foundedAt: string;
  compType: string;
  compHeadquaters: string;
  compRating: number;
  noOfFollower: string;
  compBannerImg: string;
  compPosterImg: string;
  compEmail?: string;
  compPassword?: string;
  compContactName?: string;
  compContactNo?: string;
  isCompanyActive?: boolean;
  jobs: JobDetailInfoModel[];
}

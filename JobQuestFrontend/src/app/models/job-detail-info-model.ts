import { Company } from "./companyModel/company";

export class JobDetailInfoModel {
    public jobId: number;
    public jobName: string;
    public expReq: string;
    public location: string;
    public postedAgo: string;
    public noOfApplicant: number;
    public jobDesc: string;
    public role: string;
    public industryType: string;
    public department: string;
    public empType: string;
    public roleCategory: string;
    public education: string;
    public keySkills: string;
    public salRangeMin: number;
    public salRangeMax: number;
    public workMode: string;
    public compType: string;
    public compId: Company;
    public jobActive: boolean;

    constructor(
        jobId?: number,
        jobName?: string ,
        expReq?: string ,
        location?: string ,
        postedAgo?: string ,
        noOfApplicant?: number,
        jobDesc?: string ,
        role?: string ,
        industryType?: string ,
        department?: string ,
        empType?: string ,
        roleCategory?: string ,
        education?: string ,
        keySkills?: string ,
        salRangeMin?: number,
        salRangeMax?: number,
        workMode?: string ,
        compType?: string ,
        compId?: Company, // Assuming default constructor is available
        isJobActive?: boolean
    ) {
        this.jobId = jobId ?? 0;
        this.jobName = jobName ?? '';
        this.expReq = expReq ?? '';
        this.location = location ?? '';
        this.postedAgo = postedAgo ?? '';
        this.noOfApplicant = noOfApplicant ?? 0;
        this.jobDesc = jobDesc ?? '';
        this.role = role ?? '';
        this.industryType = industryType ?? '';
        this.department = department ?? '';
        this.empType = empType ?? '';
        this.roleCategory = roleCategory ?? '';
        this.education = education ?? '';
        this.keySkills = keySkills ?? '';
        this.salRangeMin = salRangeMin ?? 0;
        this.salRangeMax = salRangeMax ?? 0;
        this.workMode = workMode ?? '';
        this.compType = compType ?? '';
        this.compId = compId ?? new Company();
        this.jobActive = isJobActive ?? true;
    }
}
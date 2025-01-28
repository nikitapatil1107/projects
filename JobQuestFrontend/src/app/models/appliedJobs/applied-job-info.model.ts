export class AppliedJobInfoModel {
  appliedJobId?: number;
  id: number = 0;
  jobId: number = 0;
  compId: number = 0;
  jobName: string = "";
	isJobRejected: boolean = false;

  constructor(
    appliedJobId: number = 0,
    id: number = 0,
    jobId: number = 0,
    compId: number = 0,
    jobName: string = "",
    isJobReject: boolean = false
  ) {
    this.appliedJobId = appliedJobId;
    this.id = id;
    this.jobId = jobId;
    this.compId = compId;
    this.jobName = jobName;
    this.isJobRejected = isJobReject;
  }
}

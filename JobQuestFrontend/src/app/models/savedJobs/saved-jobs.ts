export class SavedJobs {
    savedJobId?: number;
    userId: number = 0;
    jobId: number = 0;
  
    constructor(
      savedJobId: number = 0,
      userId: number = 0,
      jobId: number = 0,
    ) {
      this.savedJobId = savedJobId;
      this.userId = userId;
      this.jobId = jobId;
    }
  }
  
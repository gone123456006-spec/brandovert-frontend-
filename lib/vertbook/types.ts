export const enquiryStatuses = ["new", "contacted", "closed"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type EnquiryList = {
  items: Enquiry[];
  total: number;
  page: number;
  limit: number;
  counts: Record<"all" | EnquiryStatus, number>;
};

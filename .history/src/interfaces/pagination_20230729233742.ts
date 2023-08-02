import { SortOrder } from "mongoose";

export type IpaginationOptionsTypes = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: SortOrder
};

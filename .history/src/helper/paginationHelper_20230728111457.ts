import { SortOrder } from "mongoose";

type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string, 
    sortOrder: SortOrder;
}


// declaring return type
type IOptionsResult= {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: SortOrder;
}


const calculatePagination = (options: IOptions) : IOptionsResult => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    return {
        page, 
        limit, 
        skip,
    }
}

export const pagintationHelpers = {
    calculatePagination,
}
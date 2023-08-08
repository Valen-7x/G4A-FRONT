import { createAction } from "@reduxjs/toolkit";

export const setFilters = createAction("mangas/setFilters", (filters) => {
    return{
        payload: filters,
    }
}
);


export const setCategories = createAction("mangas/setCategories", (categories) => {
    return{
        payload: categories,

}
});


export const setMangas = createAction("mangas/setMangas", (mangas) => {
    return{
        payload: mangas,
    }
}
);

export const setPagination = createAction("mangas/setPagination", (pagination) => {
    return{
        payload: pagination,
    }
}
);
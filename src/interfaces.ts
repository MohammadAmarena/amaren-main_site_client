export interface IOriginalEditFields {
	name: string,
	source: string,
}

export const blankNewRoute: IOriginalEditFields = {
	name: '',
	source: '',
}

export interface Routes {
    _id: string,
    portfolo: string,
    github: string,
    linkedin: string,
    xing: string,
    netlify: string,
    isBeingEdited: boolean,
    originalEditFields: IOriginalEditFields,
    name: string,
    source: string,
}
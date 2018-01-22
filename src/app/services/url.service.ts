import { Injectable } from "@angular/core";

@Injectable()
export class UrlService {

    private map = new Map<string, string>([
        [ "GetExperiences", "experience/getexperiences" ],
        [ "GetExperience", "experience/getexperience" ],
        [ "GetProjects", "project/getprojects" ],
        [ "GetProject", "project/getproject" ],
        [ "GetTechnologyTypes", "technologytype/gettechnologytypes" ],
        [ "GetTechnologies", "technology/gettechnologies" ],
        [ "CreateTechnology", "technology/createtechnology" ]
    ]);

    constructor() { 
    }

    getUrl(urlKey: string): string {
        return this.map.get(urlKey);
    }
}
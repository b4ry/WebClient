import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ExperienceService {

    constructor(private http: HttpClient) { 

    }

    getExperiences() {
        return this.http.get(environment.apiBaseUrl + 'experience/getexperiences');
    }
}
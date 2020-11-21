import { Inject, Injectable } from '@angular/core';

import { GITHUB_API_URL } from '../github.helpers';
import { GitHubSCM } from './github-scm';
import { GitLabSCM } from './gitlab-scm';
import { GitSCM } from './scm';

// Supported Git SCM providers
export type GitSCMType = 'github' | 'gitlab';

// Abstracts differences in Git-based SCM services such as GitHub and GitLab
@Injectable()
export class GitSCMService {

  constructor(
    @Inject(GITHUB_API_URL) private gitHubURL: string
  ) {
  }

  public getSCM(type: GitSCMType, endpointGuid: string): GitSCM {
    switch (type) {
      case 'github':
        return new GitHubSCM(this.gitHubURL, endpointGuid);
      case 'gitlab':
        return new GitLabSCM(endpointGuid);
    }
    return this.getSCM(type).parseErrorString(res, message);
  }

  private parseHttpPipeError(res: any): { message?: string; } {
    if (!res.status) {
      return res;
    }
    try {
      return res.json ? res.json() : res;
    } catch (e) {
      console.warn('Failed to parse response body', e);
    }
    return {};
  }


}

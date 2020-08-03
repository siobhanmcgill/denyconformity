import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from './types';

@Injectable({
  providedIn: 'root'
})
export class PostListStateService {

  private currentListPage = 0;
  private selectedPostId?: number;

  /** Events */
  private postSelectionSubject = new BehaviorSubject<Post | null>(null);

  constructor() {}
}

import EventEmitter = require('wolfy87-eventemitter');
import { Client, IClient, IUser, ISession, IUserPermission, IProject, IItemPriority, IItemState, IItemType, IItem } from '../sdk';
import { entityComparer } from './entity-comparer';
import { IApplication } from './iapplication';
import { IIssuesModule, IssuesModule } from './issues';

export interface IApplicationConfig {
  address: string;
}

export class Application extends EventEmitter implements IApplication {
  private client: IClient;
  private session: ISession;
  private isInitializedState: boolean;
  private isLoadedState: boolean;

  issues: IIssuesModule;

  constructor({ address }: IApplicationConfig) {
    super();

    let client = new Client({ address: address });

    this.client = client;
    this.issues = new IssuesModule(client);
  }

  isInitialized() {
    return this.isInitializedState;
  }

  initialize() {
    let session = this.loadSession();

    if (session) {
      this.session = session;
      this.client.session = session;

      this.load();
    }

    this.isInitializedState = true;
    this.emit('initialize');
  }

  isLoggedIn() {
    return this.session !== null;
  }

  async logIn(username: string, password: string): Promise<ISession> {
    let session = await this.client.sessions.create(username, password);

    if (session) {
      this.saveSession(session);

      this.session = session;
      this.client.session = session;
      this.emit('login', session);

      this.load();
    }

    return session;
  }

  getSession() {
    return this.session;
  }

  isLoaded() {
    return this.isLoadedState;
  }

  async load() {
    await Promise.all([
      this.issues.load(),
    ]);

    this.isLoadedState = true;

    this.emit('load');
  }

  private loadSession(): ISession {
    let item = localStorage.getItem('session');

    if (!item)
      return undefined;

    return JSON.parse(item);
  }

  private saveSession(session: ISession) {
    localStorage.setItem('session', JSON.stringify(session));
  }
}

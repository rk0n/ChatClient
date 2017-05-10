import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {

  private url = 'ws://echo.websocket.org';
  // private url = 'ws://localhost:8080/echo/';
  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = event => {
      this.listener.emit({'type': 'open', 'data': event});
    };
    this.socket.onclose = event => {
      this.listener.emit({'type': 'close', 'data': event});
    };
    this.socket.onmessage = event => {
      this.listener.emit({'type': 'message', 'data': event.data});
      // this.listener.emit({'type': 'message', 'data': JSON.parse(event.data)});
    };
  }

  public sendMessage(data: string) {
    this.socket.send(data);
  }

  public close() {
    this.socket.close();
  }

  public getEventListener() {
    return this.listener;
  }

}
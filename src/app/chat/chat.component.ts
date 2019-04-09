import { Component, OnInit, Renderer2, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat.message.model';
import { LoginResponse } from '../login.response.interface';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  constructor(private renderer: Renderer2, private chatService: ChatService, 
              private loginService: LoginService){}

  @ViewChild('chatPage') chatPage: ElementRef;
  @ViewChild('messageForm') messageForm: ElementRef;
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('messageArea') messageArea: ElementRef;
  @ViewChild('connectingElement') connectingElement: ElementRef;

  @ViewChild('messagesFromDbArea') messagesFromDbArea: ElementRef;

  stompClient = null;
  username = null;

  colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  userData: LoginResponse = this.loginService.getLoggedUserData();
  token = this.userData.token;
  sender = this.userData.username;
  avatar = this.userData.photo;


  onError(error: Error) {

    const text = this.renderer.createText('Nie udało się połączyć z serwerem. Odśwież stronę i spróbuj ponownie!');
    this.renderer.appendChild(this.connectingElement.nativeElement, text);
    this.renderer.setStyle(this.connectingElement.nativeElement, 'color', 'red');
    
  }


  sendMessage(event: Event) {

      var messageContent = this.messageInput.nativeElement.value.trim();
      if(messageContent && this.stompClient) {
          var chatMessage = {
              sender: this.sender,
              content: this.messageInput.nativeElement.value,
              date: new Date(),
              type: 'CHAT'
          };

          this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
          this.messageInput.nativeElement.value = '';
      }
      event.preventDefault();
  }

  connect() {

    const _this = this;
    var socket = new SockJS('https://applicationfitness.herokuapp.com/ws');
    this.getMessages();
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = null;
    this.stompClient.connect({}, function(frame){
    
      _this.stompClient.subscribe('/topic/public', function (payload) {

        var message = JSON.parse(payload.body);
        var messageElement = _this.renderer.createElement('li');
        var textElement = _this.renderer.createElement('p');

        if(message.type === 'JOIN') {

            _this.renderer.addClass(messageElement, 'event-message');
            message.content = message.sender + ' dołączył!';
            var messageText = _this.renderer.createText(message.content);

        } else if (message.type === 'LEAVE') {

            _this.renderer.addClass(messageElement, 'event-message');
            message.content = message.sender + ' opuścił!';
            var messageText = _this.renderer.createText(message.content);

        } else {

            _this.renderer.addClass(messageElement, 'chat-message');
            var avatarElement = _this.renderer.createElement('img');
            _this.renderer.setAttribute(avatarElement, 'src', _this.avatar);
            _this.renderer.appendChild(messageElement, avatarElement);
            var usernameElement = _this.renderer.createElement('span');
            var usernameText = _this.renderer.createText(message.sender);
            _this.renderer.appendChild(usernameElement, usernameText);
            _this.renderer.appendChild(messageElement, usernameElement);
            var messageText = _this.renderer.createText(message.content);
        }

        var messageDateElement = _this.renderer.createElement('div');
        var messageDateText = _this.renderer.createText(_this.getCurrentTime());
        _this.renderer.addClass(messageDateElement, 'messageDate');
        _this.renderer.appendChild(messageDateElement, messageDateText);
        _this.renderer.appendChild(textElement, messageText);
        _this.renderer.appendChild(messageElement, messageDateElement);
        _this.renderer.appendChild(messageElement, textElement);
        _this.renderer.appendChild(_this.messageArea.nativeElement, messageElement);
        _this.messageArea.nativeElement.scrollTop = _this.messageArea.nativeElement.scrollHeight;

      });

      _this.stompClient.send("/app/chat.addUser", {} , JSON.stringify({sender: _this.sender, type: 'JOIN'}));
      _this.renderer.addClass(_this.connectingElement.nativeElement, 'hidden');

    }, this.onError);
   
  }

  ngOnInit(){
    this.connect();
  }

  ngOnDestroy() {
    this.stompClient.disconnect();
  }



  getMessages(){
    this.chatService.getChatMessageFromDb().subscribe(
      (messages: ChatMessage[]) => {
        messages.forEach((elem) => {

          var messageElement = this.renderer.createElement('li');
          this.renderer.addClass(messageElement, 'chat-message');
          var avatarElement = this.renderer.createElement('img');
          this.renderer.setAttribute(avatarElement, 'src', elem.photo);
          this.renderer.appendChild(messageElement, avatarElement);         
          var usernameElement = this.renderer.createElement('span');
          var usernameText = this.renderer.createText(elem.sender);
          this.renderer.appendChild(usernameElement, usernameText);
          this.renderer.appendChild(messageElement, usernameElement);
          var messageDateElement = this.renderer.createElement('div');
          var messageDateText = this.renderer.createText(this.getMessagesTimeAndDate(elem.date));
          this.renderer.addClass(messageDateElement, 'messageDate');
          this.renderer.appendChild(messageDateElement, messageDateText);
          var textElement = this.renderer.createElement('p');
          var messageText = this.renderer.createText(elem.content);
          this.renderer.appendChild(textElement, messageText);
          this.renderer.appendChild(messageElement, messageDateElement);
          this.renderer.appendChild(messageElement, textElement);
          this.renderer.appendChild(this.messageArea.nativeElement, messageElement);

        })
      },
      (error: Error) => {
        console.log(error);
      }
    );

  }

  getCurrentTime(){
    let time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
    return time;
  }

  getMessagesTimeAndDate(date: Date){
    let dateFromDb = new Date(date);
    let dateOfMessage = dateFromDb.toLocaleDateString();
    let currentDate = new Date().toLocaleDateString();
    let messagesDateAndTime = '';
    if(dateOfMessage != currentDate){
      messagesDateAndTime = dateOfMessage + " " + dateFromDb.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
    } else {
      messagesDateAndTime = dateFromDb.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
    }
    return messagesDateAndTime;
  }



}